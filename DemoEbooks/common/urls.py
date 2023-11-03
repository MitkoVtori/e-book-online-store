from django.urls import path, include
from DemoEbooks.common import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('about/', views.about_us, name='about'),
    path('contacts/', views.contact_us, name='contacts'),
]
