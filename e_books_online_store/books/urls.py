from django.urls import path, include
from e_books_online_store.books import views

urlpatterns = [
    path('author/<int:pk>/', views.AuthorDetailsView.as_view(), name='author'),
    path('create-author/', views.CreateAuthorView.as_view(), name='create-author'),
    path('delete-author/<int:pk>/', views.DeleteAuthorView.as_view(), name='delete-author'),
    path('edit-author/<int:pk>/', views.EditAuthorView.as_view(), name='delete-author'),

]
