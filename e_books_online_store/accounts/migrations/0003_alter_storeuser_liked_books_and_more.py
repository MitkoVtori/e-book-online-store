# Generated by Django 4.2.7 on 2024-01-10 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_book_sales_remove_book_genres_delete_genre_and_more'),
        ('accounts', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeuser',
            name='liked_books',
            field=models.ManyToManyField(related_name='liked_by_user', to='books.book'),
        ),
        migrations.AlterField(
            model_name='storeuser',
            name='owned_books',
            field=models.ManyToManyField(related_name='owned_by_user', to='books.book'),
        ),
    ]
