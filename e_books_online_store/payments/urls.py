from django.urls import path
from .views import webhook_function, sucessfull_payment, cancel_payment, UserCheckout, OnBoardSeller, onboarding_success, onboarding_refresh

urlpatterns = [
    path('webhook',webhook_function, name='webhook' ),
    path('sucessfull-payment/',sucessfull_payment, name='sucessfull_payment'),
    path('cancel-payment/',cancel_payment, name='cancel_payment'),
    path('create-checkout-session/', UserCheckout.as_view(), name='checkout_session'),
    path('onboard-seller/',OnBoardSeller.as_view(), name='onboard_seller' ),
    path('onboard-success/', onboarding_success, name='onboarding_sucessful'),
    path('onboard-refresh/', onboarding_refresh, name='onboarding_refresh'),
    ]
