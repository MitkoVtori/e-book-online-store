from django.shortcuts import render


def homepage(request):
    return render(request, template_name='index.html')


def about_us(request):
    return render(request, template_name='about.html')


def contact_us(request):
    return render(request, template_name='contact.html')
