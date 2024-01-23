from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import StoreSellerUser, StoreUser
from .serializer import CreateStoreSellerSerializer
class AccountsTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }

    def test_user_registration(self):
        response = self.client.post('/api-accounts/register/', data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue('token' in response.data)
        
        user = StoreUser.objects.get(email=self.user_data['email'])
        print(user)
'''

    def test_create_store_seller(self):
        # Register a user
        user_response = self.client.post('/api-accounts/register/', data=self.user_data)
        self.assertEqual(user_response.status_code, status.HTTP_201_CREATED)

        # Get the token from the user registration response
        token = user_response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')

        user = get_user_model().objects.get(email=self.user_data['email'])

        user_id = user.id

        # Create a store seller
        store_seller_data = {
            'user': user_id, 
            'preffered_language': 'English',
            'intendet_listings': 5,
            'address_1': '123 Main Street',
            'city': 'City',
            'country': 'Khmer',
            'postal_code': '0000',
            'country_code': '359',
            'phone_number': '+123456789',
            'description': 'A brief description',
            'listing_currencies': 'USD',
        }

        response = self.client.post('/api-accounts/register-seller/', data=store_seller_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if the StoreSellerUser was created
        store_seller = StoreSellerUser.objects.first()
        self.assertIsNotNone(store_seller)
        self.assertEqual(store_seller.user.email, self.user_data['email'])


# Create your tests here.
'''
