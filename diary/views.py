from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Diary, Content
from .forms import DiaryForm

from django.utils import timezone


def decorate(request):
    if request.method == "GET":  # select 값
        return render(request, "diary/decorate.html")

    elif request.method == "POST":  # text 값
        txt = request.POST.get("txt")
        coordinateX = request.POST.get("coordinateX")
        coordinateY = request.POST.get("coordinateY")
        font = request.POST.get("font")
        fontSize = request.POST.get("fontSize")
        fontColor = request.POST.get("fontColor")
        if txt:
            content = Content(
                txt=txt,
                coordinateX=coordinateX,
                coordinateY=coordinateY,
                font=font,
                fontSize=int(fontSize),
                fontColor=str(fontColor),
            )
            content.save()
            return redirect("calendar")  # 나중에 일기 확인 창으로 redirect 넘길 것

    return render(request, "diary/decorate.html")


def calender(request):
    return render(request, "diary/calender.html")


def search(request):
    return HttpResponse("Search index.")


def new(request):
    if request.method == "POST":
        form = DiaryForm(request.POST)
        if form.is_valid():
            diary = form.save(commit=False)
            diary.user = request.user
            diary.created_date = timezone.now()
            diary.save()
            return redirect("detail", diary_id=diary.id)
    else:
        form = DiaryForm()

    return render(request, "diary/new_diary.html", {"form": form})


def detail(request, diary_id):
    diary = Diary.objects.get(id=diary_id)
    context = {
        "diary": diary,
    }

    return render(request, "diary/diary_detail.html", context)


def edit(request, diary_id):
    diary = get_object_or_404(Diary, pk=diary_id)
    if request.method == "POST":
        form = DiaryForm(request.POST, request.FILES, instance=diary)
        if form.is_valid():
            diary = form.save(commit=False)
            diary.user = request.user
            diary.published_date = timezone.now()
            diary.save()
            return redirect("detail", diary.id)
    else:
        form = DiaryForm(instance=diary)

    return render(request, "diary/diary_edit.html", {"form": form})


def diary_list(request):
    diary_list = Diary.objects.order_by("-created_date")
    context = {
        "diary_list": diary_list,
    }

    return render(request, "diary/diary_list.html", context)


def photo(request):
    return render(request, "diary/photo.html")
