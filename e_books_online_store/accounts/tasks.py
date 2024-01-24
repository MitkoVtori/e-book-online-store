# Create your tasks here

from celery import shared_task
from django.core.mail import send_mail
from e_books_online_store.settings import EMAIL_HOST_USER

@shared_task
def send_confirmation_email(email):
    send_mail(    
        'Registration Confirmation',
        'Thank you for registering!',
        EMAIL_HOST_USER,  # Sender's email
        [email],        # List of recipients
        fail_silently=False,
    )

  