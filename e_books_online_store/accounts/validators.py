from django.core.exceptions import ValidationError


def only_letters(value):
    for symbol in value:
        if not symbol.isalpha():
            raise ValidationError('Use only alphabetical letters!')


def only_nums(value):
    for symbol in value:
        if not symbol.isdigit():
            raise ValidationError('Use only numbers!')


def image_size(image):
    if image.file.size > 5*1024*1024:
        raise ValidationError("Image size cannot be more than 5MB!")