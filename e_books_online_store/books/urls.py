from django.urls import path, include
from e_books_online_store.books import views

'''
    path('author/<int:pk>/', views.AuthorDetailsView.as_view(), name='author'),
    path('create-author/', views.CreateAuthorView.as_view(), name='create-author'),
    path('delete-author/<int:pk>/', views.DeleteAuthorView.as_view(), name='delete-author'),
    path('edit-author/<int:pk>/', views.EditAuthorView.as_view(), name='edit-author'),
'''
urlpatterns = [
    path('', views.AllBooksView.as_view(), name='all-books'),
    path('catalog/<str:genre_name>/', views.AllBooksView.as_view(), name='all-books-filtered'),
    path('register-book/', views.CreateBookView.as_view(), name='register-book'),
    path('book/<int:pk>/', include([
        path('', views.BookDetailsView.as_view(), name='book-details'),
        path('update/', views.UpdateBookView.as_view(), name='update-book'),
        path('delete-book/', views.DeleteBookView.as_view(), name='delete-book')
    ])),
    path('download_book/<int:pk>/',views.DownloadBook.as_view(),name='download-book'),
    path('review-product/<int:book_id>/', views.CreateReviewView.as_view(), name='review-product'),
    path('delete-review/<int:review_id>/', views.DeleteReviewView.as_view(), name='delete-review'),
    path('cart/', views.ViewCartView.as_view(), name='view-cart'),
    path('add_to_cart/<int:product_id>/', views.AddToCartView.as_view(), name='add-to-cart'),
    path('remove_from_cart/<int:product_id>', views.RemoveFromCartView.as_view(), name="remove-from-cart"),
]
