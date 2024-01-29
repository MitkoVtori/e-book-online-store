from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CreateBookSerializer(BookSerializer):
    pass


class UpdateBookSerializer(BookSerializer):
    pass


class DeleteBookSerializer(BookSerializer):
    pass


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

