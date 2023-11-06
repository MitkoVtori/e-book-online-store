from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core.validators import MinLengthValidator

from e_books_online_store.accounts.validators import only_letters, only_nums, image_size


class StoreUser(AbstractBaseUser, PermissionsMixin):
    FIRST_LAST_NAME_MIN_LEN = 2
    FIRST_LAST_NAME_MAX_LEN = 65

    ADDRESS_MAX_LEN = 100

    PHONE_NUM_MAX_LEN = 50
    PHONE_NUM_MIN_LEN = 10

    email = models.EmailField(
        unique=True,
        error_messages={"unique": "User with this email address already exists!"}
    )

    USERNAME_FIELD = "email"

    is_active = models.BooleanField(default=True)
    can_buy = models.BooleanField(default=True)
    can_sell = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    first_last_name = models.CharField(
        max_length=FIRST_LAST_NAME_MAX_LEN,
        validators=(
            only_letters,
            MinLengthValidator(FIRST_LAST_NAME_MIN_LEN),
        ),
        null=True,
        blank=True,
    )

    delivery_address = models.CharField(
        max_length=ADDRESS_MAX_LEN,
        null=True,
        blank=True
    )

    phone_number = models.IntegerField(
        max_length=PHONE_NUM_MAX_LEN,
        validators=[
            MinLengthValidator(PHONE_NUM_MIN_LEN)
        ],
        blank=True,
        null=True
    )

    owned_books = models.ManyToManyField('books.Book')
    liked_books = models.ManyToManyField('books.Book')

    profile_picture = models.ImageField(
        upload_to="images",
        validators=[image_size],
        blank=True,
        null=True
    )

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
