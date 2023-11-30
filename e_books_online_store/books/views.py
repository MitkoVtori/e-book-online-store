from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Author
from .permissions import SalesPermission
from .serializer import *
from ..accounts.models import StoreUser

UserModel = get_user_model()


class AuthorDetailsView(RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class CreateAuthorView(CreateAPIView):
    queryset = Author.objects.all()
    serializer_class = CreateAuthorSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if not user.can_sell and not user.is_staff and not user.is_superuser:
            raise PermissionError('You do not have permission to create Author')
        serializer.save()

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
        except PermissionError as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        return response


class EditAuthorView(UpdateAPIView):
    queryset = Author.objects.all()
    serializer_class = UpdateAuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data_copy = self.request.data.copy()
        for field, info in data_copy.items():
            if not info and getattr(instance, field):
                data_copy[field] = getattr(instance, field)
        serializer = self.get_serializer(instance, data=data_copy, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class DeleteAuthorView(DestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = DeleteAuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def perform_destroy(self, serializer):
        user = self.request.user
        if not user.can_sell and not user.is_staff and not user.is_superuser:
            raise PermissionError('You do not have permission to delete Author')
        serializer.delete()

    def delete(self, request, *args, **kwargs):
        try:
            response = super().delete(request, *args, **kwargs)
        except PermissionError as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        return response


class AllBooksView(APIView):
    def get(self, request, genre_name=None):
        if genre_name:
            books = Book.objects.filter(genre__name=genre_name)
        else:
            books = Book.objects.all()

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateBookView(CreateAPIView):
    serializer_class = CreateBookSerializer
    permission_classes = [IsAuthenticated, SalesPermission]


class BookDetailsView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'


class UpdateBookView(UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = UpdateBookSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]
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
    def delete(self, request, review_id):
        review = get_object_or_404(Review, id=review_id)

        if request.user == review.user or request.user.is_staff:
            review.delete()
            return Response({'detail': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You are not authorized to delete this review'},
                            status=status.HTTP_403_FORBIDDEN)


class ViewCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, sort_type=None):
        cart_items = Cart.objects.filter(user=request.user)
        total_items = len(cart_items)

        if sort_type == 'quantity':
            cart_items = cart_items.order_by(sort_type)
        elif sort_type == 'name' or sort_type == 'price':
            cart_items = cart_items.order_by(f'product__{sort_type}')

        serializer = CartSerializer(cart_items, many=True)

        data = {
            'cart_items': serializer.data,
            'total_items': total_items
        }
        return Response(data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        book = get_object_or_404(Book, pk=product_id)
        cart_item, created = Cart.objects.get_or_create(user=request.user, book=book)

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return Response({"message": "Product added to cart successfully"})


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        cart_item = get_object_or_404(Cart, pk=product_id, user=request.user)
        cart_item.delete()

        return Response({"message": "Product removed from cart successfully"})
