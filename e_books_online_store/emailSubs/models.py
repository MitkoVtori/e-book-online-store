from django.db import models


class EmailSubscription(models.Model):
    user_email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email   


