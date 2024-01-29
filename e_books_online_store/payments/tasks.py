
from celery import shared_task
from django.core.mail import send_mail
from e_books_online_store.settings import EMAIL_HOST_USER

@shared_task
def send_order_confirmed_email(email):
    send_mail(    
        'Your order has been sucessful',
        'Thank you for purchaing, your books are added to your library!',
        EMAIL_HOST_USER,  
        [email],        
        fail_silently=False,
    )

 
@shared_task
def send_user_bought_book_email(email):
    send_mail(    
        'An user has bought your book!',
        'Your funds will be transfered to you shortly!',
        EMAIL_HOST_USER,  
        [email],        
        fail_silently=False,
    )


