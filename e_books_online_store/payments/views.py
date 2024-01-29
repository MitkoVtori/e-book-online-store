from rest_framework.decorators import api_view
from .tasks import send_user_bought_book_email,send_order_confirmed_email
from e_books_online_store.accounts.models import StoreSellerUser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import stripe
from rest_framework.generics import  get_object_or_404
from e_books_online_store.cart.models import UserCart
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse  
import json
from django.contrib.auth import get_user_model
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from e_books_online_store.books.views import SalesPermission

UserModel = get_user_model()

stripe.api_key = settings.STRIPE_SECRET_KEY.strip()
endpoint_secret = settings.HOOKS_SECRET


class OnBoardSeller(APIView):
    permission_classes = [IsAuthenticated, SalesPermission]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

    def post(self, request, *args, **kwargs):
        store_seller = StoreSellerUser.objects.filter(user=self.request.user).first()

        try:
            account = stripe.Account.create(
                type='express',
                country='BG',
                email=store_seller.user.email,
                capabilities={
                    'card_payments': {'requested': True},
                    'transfers':{'requested': True},
                },

            )
            
            account_link = stripe.AccountLink.create(
                account = account.id,
                refresh_url ='http://localhost:8000/api-payments/onboard-refresh/',
                return_url ='http://localhost:8000/api-payments/onboard-success/',
                type='account_onboarding'
            )

            response_data = {
                'account_id': account.id,
                'onboarding_url': account_link.url
            }

            store_seller.stripe_id = account.id
            store_seller.save()

        except stripe.error.StripeError as e:
            return Response({"error": str(e)} )

        print(account_link.url)
        return Response(response_data)





class UserCheckout(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]

    def post(self, request, *args, **kwargs):
        user = self.request.user  
        cart = UserCart.objects.filter(user=user).first()

        if not cart:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_price_in_cents = int(cart.total_price * 100)

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data':{
                    'currency':'bgn', 
                    'unit_amount': cart_price_in_cents,
                    'product_data': {
                        'name': 'Books for purchase',  
                    },
                    },
                'quantity':1,
            }],
            mode='payment',
            success_url='http://localhost:8000/api-payments/sucessfull-payment/',
            cancel_url='http://localhost:8000/api-payments/cancel-payment',
            metadata={'user_info': user },
            client_reference_id=user.id,
        )
        print(session.url)

        return Response({'session_url': session.url,'session_id': session.id,'clientSecret': session.client_secret})


@api_view(['POST'])
def webhook_function(request):
  payload = request.body
  event = None

  try:
    event = stripe.Event.construct_from(
      json.loads(payload), stripe.api_key
    )

  except ValueError as e:
    return HttpResponse(status=400)
    

  if event.data.object.get('client_reference_id') is not None :
        client = event.data.object.get('client_reference_id')
        print(client)
        cart = UserCart.objects.filter(user=client).first()
        user = UserModel.objects.filter(id=client).first()




        for book in cart.cart_books.all():
            user.owned_books.add(book)
            user.save()
            book.book_sold()
            total_book_price = book.price * 1000
            seller_stripe_id = book.seller.stripe_id 
            print(seller_stripe_id)

            seller_payout = int(float(total_book_price) - (float(total_book_price) * 0.1))

            payout = stripe.Transfer.create(
                amount=seller_payout,
                currency='bgn',
                destination= seller_stripe_id, 
            )

            send_order_confirmed_email(user.email)
            send_user_bought_book_email(book.seller.user.email)

            cart.delete_all_books_from_cart()


  return HttpResponse(status=200)


@api_view(['GET'])
def onboarding_success(request):
    return Response({'message': 'Your onboarding has been sucessful!'})


@api_view(['GET'])
def onboarding_refresh(request):
    return Response({'message': 'Your onboarding has not been sucessfull yet!'})



@api_view(['GET'])
def sucessfull_payment(request):
    return Response({'message': 'Your order has been sucessfull!'})


@api_view(['GET'])
def cancel_payment(request):
    return Response({'message': 'Your order has been canceled!'})


