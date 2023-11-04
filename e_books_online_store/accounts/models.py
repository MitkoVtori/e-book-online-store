from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core.validators import MinLengthValidator

from e_books_online_store.accounts.validators import only_letters, only_nums, image_size


class StoreUser(AbstractBaseUser, PermissionsMixin):
    FIRST_NAME_MIN_LEN = 2
    FIRST_NAME_MAX_LEN = 30

    LAST_NAME_MIN_LEN = 2
    LAST_NAME_MAX_LEN = 30

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

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LEN,
        validators=(
            only_letters,
            MinLengthValidator(FIRST_NAME_MIN_LEN),
        ),
        null=True,
        blank=True,
    )
    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LEN,
        validators=(
            only_letters,
            MinLengthValidator(LAST_NAME_MIN_LEN),
        ),
        null=True,
        blank=True,
    )
    delivery_address = models.CharField(
        max_length=ADDRESS_MAX_LEN,
        null=True,
        blank=True
    )

    phone_number = models.CharField( # Check phonenumberfield
        max_length=PHONE_NUM_MAX_LEN,
        validators=[
            only_nums, # Check if "+" sign must be allowed
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
