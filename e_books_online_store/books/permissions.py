from rest_framework.permissions import BasePermission


class SalesPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.can_sell or request.user.is_staff:
            return request.user.is_authenticated and request.user.has_perm('Sales Permission')
        raise PermissionError('You do not have permission to create Book')
