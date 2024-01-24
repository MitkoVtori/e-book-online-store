from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from .utils import check_if_book_is_not_inside_the_cart ,check_if_user_already_doesnt_own_the_book 
from .serializer import  CartSerializer, CartBooksSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.contrib.auth import get_user_model
from .models import UserCart, CartBooks
from rest_framework.response import Response
from rest_framework.views import APIView
from e_books_online_store.books.models import Book
from e_books_online_store.accounts.models import StoreUser
from rest_framework import  status
from e_books_online_store.books.serializer import BookSerializer 
UserModel = get_user_model()

class ListCartView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

    def get(self, request):
        user =self.request.user
        user_cart, created = UserCart.objects.get_or_create(user=user)
        user_cart.calculate_total_price

        book_serializer = BookSerializer(user_cart.cart_books.all(), many=True)
        serialized_books = book_serializer.data


        data = {
            "books":serialized_books ,
            "total_price": user_cart.total_price 
        }

        return Response(data, status=status.HTTP_200_OK )

        
    

class AddBookToCartView(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

    def post(self, request, pk):
        user = self.request.user
        cart, created = UserCart.objects.get_or_create(user=user)
        book = Book.objects.get(id=self.kwargs['pk'])


        if not check_if_user_already_doesnt_own_the_book(user, book):
            return Response('User already owns that book')
            
        if not check_if_book_is_not_inside_the_cart(user, book, cart):
            return Response('User already has the book inside his cart')
        
        cart.add_book_to_cart(book)

        return Response(status=status.HTTP_200_OK)

class RemoveBookFromCartView(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

    def post(self, request, pk):
        user = self.request.user
        cart, created = UserCart.objects.get_or_create(user=user)
        book = Book.objects.get(id=self.kwargs['pk'])

        cart.delete_book_from_cart(book)
        return Response(status=status.HTTP_200_OK)

class RemoveAllBooksFromCartView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

 
    def post(self, request):
        user = self.request.user
        cart, created = UserCart.objects.get_or_create(user=user)

        cart.delete_all_books_from_cart()
        return Response(status=status.HTTP_200_OK)

   








