from django.contrib.auth import login, get_user_model, logout
from django.core.validators import EmailValidator

from rest_framework.generics import RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .models import *
from .serializer import *

UserModel = get_user_model()


class RegisterUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = request.data
        serializer = UserRegistrationSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert EmailValidator(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutUserView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserDetailsView(RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class EditUserView(UpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class DeleteUserView(DestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class ChangePasswordView(UpdateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
