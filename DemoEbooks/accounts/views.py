from django.contrib.auth import login
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic as views

from DemoEbooks.accounts.forms import RegisterUserForm


class RegisterUserView(views.CreateView):
    template_name = 'register-page.html'
    form_class = RegisterUserForm
    success_url = reverse_lazy('homepage')

    def form_valid(self, form):
        result = super().form_valid(form)
        login(self.request, self.object)

        return result