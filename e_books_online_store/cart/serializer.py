from rest_framework import serializers
from .models import UserCart,CartBooks

    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCart
        fields = '__all__'


class CartBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartBooks
        fields = '__all__'

