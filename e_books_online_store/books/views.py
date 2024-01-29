from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from e_books_online_store.settings import  MEDIA_ROOT
from django.core.files import File
#from .models import Author
from .permissions import SalesPermission
from .serializer import *
from ..accounts.models import StoreUser
from rest_framework.permissions import BasePermission

UserModel = get_user_model()

class SalesPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user and user.can_sell

class AllBooksView(APIView):
    def get(self, request, genre_name=None):
        if genre_name == "Newest":
            books = Book.objects.order_by('-publication_date')[:10]
        elif genre_name == "Best sellers":
            books = Book.objects.order_by('-sales')[:10]
        elif genre_name == "All":
            books = Book.objects.all()
        else:
            books = Book.objects.filter(genres=genre_name)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Need to make a check if the user actually owns the book
class DownloadBook(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]
    def get(self, request, pk):
        user = UserModel.objects.filter(email=self.user).first()

        

        
        book = Book.objects.get(id=self.kwargs['pk'])

        if book not in user.owned_books:
            return HTTP_403_FORBIDDEN
        

        with open(book.content.path, 'rb') as pdf_file:
            response = HttpResponse(pdf_file.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{book.content}"'
            return response


class CreateBookView(CreateAPIView):
    serializer_class = CreateBookSerializer
    permission_classes = [IsAuthenticated, SalesPermission]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]


class BookDetailsView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'


class UpdateBookView(UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = UpdateBookSerializer
    permission_classes = [IsAuthenticated, SalesPermission]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def update(self, request, *args, **kwargs):
        partial = False
        instance = self.get_object()
        data_copy = self.request.data.copy()
        for field, info in data_copy.items():
            if not info and getattr(instance, field):
                data_copy[field] = getattr(instance, field)
                partial = True
        serializer = self.get_serializer(instance, data=data_copy, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class DeleteBookView(DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = DeleteBookSerializer
    permission_classes = [IsAuthenticated, SalesPermission]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    lookup_field = 'pk'

    def perform_destroy(self, serializer):
        user = self.request.user
        has_book = user.owned_books.filter(id=self.kwargs['pk']).exists()
        if not has_book and not user.is_staff and not user.is_superuser:
            raise PermissionError('You do not have permission to delete this Book')
        serializer.delete()

    def delete(self, request, *args, **kwargs):
        try:
            response = super().delete(request, *args, **kwargs)
        except PermissionError as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        return response


class CreateReviewView(APIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def post(self, request, book_id):
        book = Book.objects.get(id=book_id)
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        data['book'] = book.id
        data['user'] = user.id

        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteReviewView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def delete(self, request, review_id):
        review = get_object_or_404(Review, id=review_id)

        if request.user == review.user or request.user.is_staff:
            review.delete()
            return Response({'detail': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You are not authorized to delete this review'},
                            status=status.HTTP_403_FORBIDDEN)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def post(self, request, product_id):
        book = get_object_or_404(Book, pk=product_id)
        cart_item, created = Cart.objects.get_or_create(user=request.user, book=book)

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return Response({"message": "Product added to cart successfully"})


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def post(self, request, product_id):
        cart_item = get_object_or_404(Cart, pk=product_id, user=request.user)
        cart_item.delete()

        return Response({"message": "Product removed from cart successfully"})

