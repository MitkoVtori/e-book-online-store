from django.urls import path, include
from .views import ListCartView, AddBookToCartView, RemoveBookFromCartView, RemoveAllBooksFromCartView

urlpatterns = [
    path('list-cart-items/', ListCartView.as_view(), name='list-cart-items'),

    path('add-book-to-cart/<int:pk>', AddBookToCartView.as_view(), name='add-book-to-cart'),
    path('delete-book-from-cart/<int:pk>', RemoveBookFromCartView.as_view(), name='delete-book-to-cart'),
    path('remove-all-items-from-cart/', RemoveAllBooksFromCartView.as_view(), name='delete-book-to-cart'),

]

