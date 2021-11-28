from django.shortcuts import render


def handfont_create(request):
    return render(request, "font/handfont_create.html")
