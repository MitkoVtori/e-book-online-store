from django.core.exceptions import ValidationError


def only_letters(value):
    for symbol in value:
        if not symbol.isalpha():
            raise ValidationError('Use only alphabetical letters!')


def book_image_size(image):
    if image.file.size > 10*1024*1024:
        raise ValidationError("Image size cannot be more than 10MB!")