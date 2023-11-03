from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator, MaxValueValidator
from django.db import models
from django.db.models import Avg


UserModel = get_user_model()


def only_letters(value):
    for symbol in value:
        if not symbol.isalpha():
            raise ValidationError('Use only alphabetical letters!')


class Author(models.Model):
    NAME_MIN_LEN = 2
    NAME_MAX_LEN = 20

    name = models.CharField(
        max_length=NAME_MAX_LEN,
        validators=(
            only_letters,
            MinLengthValidator(NAME_MIN_LEN)
        ),
        null=False,
        blank=False
    )
    biography = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class Genre(models.Model):
    NAME_MAX_LEN = 20
    name = models.CharField(
        max_length=NAME_MAX_LEN
    )
    null = False,
    blank = False

    def __str__(self):
        return self.name


class Book(models.Model):
    BOOK_TITLE_MIN_LEN = 2
    BOOK_TITLE_MAX_LEN = 50

    DESCRIPTION_MIN_LEN = 20
    DESCRIPTION_MAX_LEN = 500

    title = models.CharField(
        max_length=BOOK_TITLE_MAX_LEN,
        validators=(
            MinLengthValidator(BOOK_TITLE_MIN_LEN),
        ),
        null=False,
        blank=False,
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE
    )
    description = models.TextField(
        max_length=DESCRIPTION_MAX_LEN,
        validators=(
            MinLengthValidator(DESCRIPTION_MIN_LEN),
        ),
        null=False,
        blank=False,
    )
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=False,
        blank=False
    )
    publication_date = models.DateField(
        auto_now_add=True,
    )
    cover_image = models.ImageField(
        upload_to='books/',
        null=False,
        blank=False
    )
    genres = models.ManyToManyField(
        Genre,
        blank=False,
    )

    def average_rating(self) -> float:
        return Rating.objects.filter(product=self).aggregate(Avg("score"))["score__avg"] or 0

    def validate_genre(self):
        if self.genres.count() < 1:
            raise ValidationError("A book must have at least one genre.")

    def save(self, *args, **kwargs):
        self.validate_genre()
        super(Book, self).save(*args, **kwargs)


class Rating(models.Model):
    MAX_SCORE = 5

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )
    score = models.IntegerField(
        default=0,
        validators=(
            MaxValueValidator(MAX_SCORE),
        )
    )
