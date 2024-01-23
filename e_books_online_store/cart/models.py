from django.db import models
from e_books_online_store.books.models import Book

# Create your models here.
'''
Ideq:

da se dobavqt knigi , nqma znachenie broi i da se smqta obshtata suma bazirano na cenata
ako plashtaneto se osushtestvi da se trie avtomatichno
da moje da se promenqt knigite demek da se dobavqt ili premahvat




'''

UserModel = get_user_model()

class UserCart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    books = 
    
    total_price = self.calculate_total_price()


    def calculate_total_price(self):
        total_price = 0 
        for book in self.books:
            total_price += book.price 

        return total_price



class CartBooks(models.Model):
    book = 
    cart = 

