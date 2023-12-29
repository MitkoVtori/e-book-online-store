from rest_framework import serializers
from .models import EmailSubscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscription
        fields = ['user_email']
