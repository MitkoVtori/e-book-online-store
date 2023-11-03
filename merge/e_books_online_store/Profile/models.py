from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core.validators import MinLengthValidator
from phonenumber_field.modelfields import PhoneNumberField

from e_books_online_store.Profile.validators import only_letters


class AppUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, error_messages={"unique": "User with this email address already exists!"})

    USERNAME_FIELD = "email"

    is_active = models.BooleanField(default=True)
    can_buy = models.BooleanField(default=True)
    can_sell = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    first_name = models.CharField(
        max_length=15,
        validators=(
            only_letters,
            MinLengthValidator(2),
        ),
        null=True,
        blank=True,
    )
    last_name = models.CharField(
        max_length=15,
        validators=(
            only_letters,
            MinLengthValidator(2),
        ),
        null=True,
        blank=True,
    )
    delivery_address = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    phone_number = PhoneNumberField(max_length=50, blank=True, null=True)

    # TODO: owned_books = relation
    # TODO: liked_books = relation
    # TODO: orders = relation

    image = models.ImageField(upload_to="images", validators=[image_size], blank=True, null=True)

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
