from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import EmailSubscription
from .serializer import SubscriptionSerializer
from django.core.mail import send_mail
from django.conf import settings

@api_view(['POST'])
def subscribe(request):
    serializer = SubscriptionSerializer(data=request.data)
    if serializer.is_valid():
        subscribed_email = serializer.validated_data['user_email']
        serializer.save()
        

        send_mail(
            'Subscription Confirmation',
            'Thank you for subscribing!',
            settings.EMAIL_HOST_USER,  # Sender's email
            [subscribed_email],        # List of recipients
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


       
