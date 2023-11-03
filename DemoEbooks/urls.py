from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('DemoEbooks.common.urls')),
    path('accounts/', include('DemoEbooks.accounts.urls')),
    path('books/', include('DemoEbooks.books.urls')),
]
