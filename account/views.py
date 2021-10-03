from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return HttpResponse("Account home index.(first page)")


def login(request):
    return render(request, 'account/login.html')
    # return HttpResponse("Login page")


def signup(request):
    return HttpResponse("Signup page")