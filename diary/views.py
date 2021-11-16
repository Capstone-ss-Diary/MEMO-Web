from django.db.models.fields import json
from django.http.response import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Diary, DiaryImage, DiaryText
from .forms import DiaryForm
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

import json


@csrf_exempt
def test(request):
    jsonObject = json.loads(request.body)
    print(jsonObject)
    return JsonResponse(jsonObject)


@csrf_exempt
def decorate(request):
    if request.method == "GET":  # select 값
        return render(request, "diary/decorate.html")

    elif request.method == "POST":  # text 값
        # form_data = json.loads(request.body)

        # print(form_data)

        diary = Diary()
        diary.user_id = request.session.get("user")
        # diary.title = "title"  # title input 추후 추가
        diary.created_date = timezone.datetime.now()
        # diary.canvas = form_data["canvas_file"]
        print(timezone.datetime.now())
        diary.save()  # Diary DB 저장

        if request.POST["UserInput"]:
            text = DiaryText()
            text.diary = diary  # 외래키 (생성한 Diary 기본키 참조)
            text.content = request.POST["UserInput"]
            text.coordinateX = request.POST["coordinateX"]
            text.coordinateY = request.POST["coordinateY"]
            text.font = request.POST["font"]
            text.font_size = request.POST["fontSize"]
            text.font_color = request.POST["fontColor"]
            text.save()  # DiaryText DB 저장

        img_cnt = request.POST["img_count"]
        if img_cnt:
            for i in range(int(img_cnt)):
                name = "img" + str(i + 1)
                if request.FILES[name] is not None:
                    diaryImage = DiaryImage(
                        diary=diary,
                        image=request.FILES[name],
                        width=request.POST.getlist("attr" + str(i + 1) + "[]")[0],
                        height=request.POST.getlist("attr" + str(i + 1) + "[]")[1],
                        imageX=request.POST.getlist("attr" + str(i + 1) + "[]")[2],
                        imageY=request.POST.getlist("attr" + str(i + 1) + "[]")[3],
                    )
                    diaryImage.save()

        return redirect(
            "diary:detail", user_id=request.session.get("user"), diary_id=diary.id
        )

    return render(request, "diary/decorate.html")


def calender(request, user_id):

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


def detail(request, user_id, diary_id):
    diary = Diary.objects.get(id=diary_id)
    text = DiaryText.objects.get(diary=diary)
    images = DiaryImage.objects.filter(diary=diary)
    # images = DiaryImage.objects.get(diary=diary)
    context = {
        "diary": diary,
        "text": text,
    }

    for i in range(len(images)):
        context["image" + str(i)] = images[i]

    print(context)

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
    return render(request, "diary/sidebar.html")
