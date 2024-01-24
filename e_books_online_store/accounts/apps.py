from django.apps import AppConfig
from django.contrib.auth import get_user_model



def change_related_names():
    User = get_user_model()
    # Change related_name for auth.User's groups field
    User.groups.field.remote_field.related_name = 'custom_user_groups'


class ProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'e_books_online_store.accounts'

    def ready(self):
        change_related_names()
