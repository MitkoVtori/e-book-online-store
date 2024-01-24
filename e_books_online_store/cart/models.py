from django.db import models
from e_books_online_store.books.models import Book
from django.contrib.auth import get_user_model
# Create your models here.

UserModel = get_user_model()

class UserCart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    cart_books = models.ManyToManyField(Book, through='CartBooks')
    
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

        
    def calculate_total_price(self):
        self.total_price = sum(book.price for book in self.cart_books.all())
        self.save(update_fields=['total_price'])

    def add_book_to_cart(self, book):
        cart_books = CartBooks.objects.create(book=book, cart=self)
        self.calculate_total_price()
        return cart_books

    def delete_book_from_cart(self, book):
        cart_book = CartBooks.objects.filter(book=book, cart=self).first()
        if cart_book:
            cart_book.delete()
            self.calculate_total_price()
            return True

    def delete_all_books_from_cart(self):
        CartBooks.objects.filter(cart=self).delete()
        self.calculate_total_price()
        return True



class CartBooks(models.Model):
    book =models.ForeignKey(Book, on_delete=models.CASCADE)
    cart = models.ForeignKey(UserCart, on_delete=models.CASCADE)

