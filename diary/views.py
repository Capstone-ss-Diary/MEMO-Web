from django.shortcuts import render
from django.http import HttpResponse


def calender(request):
    return render(request, 'diary/calender.html')


def search(request):
    return HttpResponse("Search index.")


def add(request):
    return render(request, 'diary/add_diary.html')


def detail(request, diary_id):
    return HttpResponse("Detail %s." % diary_id)


def edit(request, diary_id):
    return HttpResponse("Edit %s." % diary_id)
