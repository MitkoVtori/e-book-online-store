from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class CreateAuthorSerializer(AuthorSerializer):
    pass


class DeleteAuthorSerializer(AuthorSerializer):
    pass


class UpdateAuthorSerializer(AuthorSerializer):
    pass


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


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


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class AddToCartSerializer(CartSerializer):
    pass
