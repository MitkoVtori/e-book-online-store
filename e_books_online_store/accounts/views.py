from django.contrib.auth import login, get_user_model, logout
from django.core.validators import EmailValidator
from .models import StoreSellerUser
from rest_framework.generics import RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .tasks import send_confirmation_email

UserModel = get_user_model()

class CreateStoreSellerView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def post(self, request):
        clean_data = request.data
        serializer = CreateStoreSellerSerializer(data=clean_data)
        user = self.request.user
        if serializer.is_valid(raise_exception=True):
            store_seller_data = serializer.validated_data 
            store_seller = StoreSellerUser.objects.create(user=user, **store_seller_data)

            store_user = UserModel.objects.get(email=user)
            store_user.can_sell = True
            store_user.save()

            return Response("Store Seller created successfully.", status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

class RegisterUserView(APIView):
    def post(self, request):
        clean_data = request.data
        serializer = UserRegistrationSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            token = Token.objects.create(user=user)
            if user:
                send_confirmation_email(clean_data['email'])
                return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    def post(self, request):
        data = request.data
        assert EmailValidator(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key ,'user': serializer.data }, status=status.HTTP_200_OK)


class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserDetailsView(RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    lookup_field = 'pk'


class EditUserView(UpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def get_object(self):
        return self.request.user


class DeleteUserView(DestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    lookup_field = 'pk'


class ChangePasswordView(UpdateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
