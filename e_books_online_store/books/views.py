from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.response import Response
from .models import Author
from .serializer import *

UserModel = get_user_model()


class AuthorDetailsView(RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'


class CreateAuthorView(CreateAPIView):
    queryset = Author.objects.all()
    serializer_class = CreateAuthorSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if not user.can_sell and not user.is_staff and not user.is_superuser:
            raise PermissionError('You do not have permission to create Author')
        serializer.save()

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
        except PermissionError as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        return response


class EditAuthorView(UpdateAPIView):
    queryset = Author.objects.all()
    serializer_class = UpdateAuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data_copy = self.request.data.copy()
        for field, info in data_copy.items():
            if not info and getattr(instance, field):
                data_copy[field] = getattr(instance, field)
        serializer = self.get_serializer(instance, data=data_copy, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class DeleteAuthorView(DestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = DeleteAuthorSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def perform_destroy(self, serializer):
        user = self.request.user
        if not user.can_sell and not user.is_staff and not user.is_superuser:
            raise PermissionError('You do not have permission to delete Author')
        serializer.delete()

    def delete(self, request, *args, **kwargs):
        try:
            response = super().delete(request, *args, **kwargs)
        except PermissionError as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        return response

