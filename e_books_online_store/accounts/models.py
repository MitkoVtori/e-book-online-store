from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin, UserManager, AbstractUser
from django.core.validators import MinLengthValidator, MinValueValidator
from e_books_online_store import books
from e_books_online_store.accounts.validators import only_letters, image_size
from django.contrib.auth.models import Group
from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from .choices import get_languages, get_currencies



class GroupMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)



class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must have is_staff=True.'
            )
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must have is_superuser=True.'
            )
        return self._create_user(email, password, **extra_fields)



class StoreUser(AbstractBaseUser, PermissionsMixin):
    FIRST_LAST_NAME_MIN_LEN = 2
    FIRST_LAST_NAME_MAX_LEN = 65

    ADDRESS_MAX_LEN = 100

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
        validators=[
            MinLengthValidator(PHONE_NUM_MIN_LEN)
        ],
        blank=True,
        null=True
    )

    owned_books = models.ManyToManyField('books.Book', related_name='owned_by_user')
    liked_books = models.ManyToManyField('books.Book', related_name='liked_by_user')

    profile_picture = models.ImageField(
        upload_to="images",
        validators=[image_size],
        blank=True,
        null=True
    )

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()
    groups = models.ManyToManyField(Group, through=GroupMembership)


class StoreSellerUser(models.Model):
    LANGUAGES = get_languages()
    CURRENCIES = get_currencies()

    user = models.OneToOneField(StoreUser, on_delete=models.CASCADE)
    stripe_id = models.CharField(max_length=200, null=False, blank=False)

    preffered_language = models.CharField(max_length=30, choices=LANGUAGES, null=False, blank=False)
    intendet_listings = models.PositiveIntegerField(validators=[MinValueValidator(1)], null=False, blank=False)
    address_1 = models.CharField(max_length=90, null=False, blank=False)
    address_2 = models.CharField(max_length=90, null=True, blank=True)
    city = models.CharField(max_length=90, null=False, blank=False)
    country = CountryField()
    postal_code =models.CharField(max_length=20, null=False, blank=False) 
    country_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    description = models.TextField(max_length=400, null=True, blank=True)
    listing_currencies = models.CharField(max_length=50, choices=CURRENCIES, null=False, blank=False) 





