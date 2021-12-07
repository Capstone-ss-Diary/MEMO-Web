from typing import Text
from django.db.models.fields.json import DataContains
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, request

from diary import hashtag_function
from .models import Diary, DiaryImage, DiaryRemove, DiarySticker, DiaryText, DiaryHashtag, HandWriting
from .forms import DiaryForm, PostSearchForm
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import FormView
from django.db.models import Q
from django.shortcuts import render
import sys

# from django.db.models.fields import json
import json
from django.http.response import JsonResponse

sys.path.insert(
    1, 'diary/')
import hashtag_function

import hashtag_function


def calender(request, user_id):

    date_list = Diary.objects.filter(user_id=user_id)

    date = {
        "date_list": date_list,
    }

    return render(request, "diary/calender.html", date)


def decorate(request, user_id):
    if request.method == "GET":  # select 값
        return render(request, "diary/decorate.html")

    elif request.method == "POST":  # text 값
        diary = Diary()
        diary.user_id = request.session.get("user")
        diary.created_date = timezone.datetime.now()
        diary.published_date = timezone.datetime.now()
        diary.backColor = request.POST.get("back_color")
        diary.save()  # Diary DB 저장

        # print(request.POST.get("file"))
        for j in range(6):
          if request.POST.get("UserInput"+str(j+1)) is not None: # for문 6번 돌릴 것
            input = request.POST.get("UserInput"+str(j+1))
            print(input)
            if input!="":
              text = DiaryText()
              text.diary = diary  # 외래키 (생성한 Diary 기본키 참조)
              text.content = input
              text.coordinateX = request.POST.getlist("input"+str(j+1)+"[]")[0]
              text.coordinateY = request.POST.getlist("input"+str(j+1)+"[]")[1]
              text.font = request.POST.getlist("input"+str(j+1)+"[]")[2]
              text.font_size = request.POST.getlist("input"+str(j+1)+"[]")[3]
              text.font_color = request.POST.getlist("input"+str(j+1)+"[]")[4]
              text.save()  # DiaryText DB 저장

        img_cnt = request.POST.get("img_count")
        if img_cnt:
            for i in range(int(img_cnt)):
                name = "img" + str(i + 1)
                removes = request.POST.get("remove_list")
                remove_list = removes.split('/')
                names = request.POST.get("name_list")
                name_list = names.split('/')
                print(name_list)
                if request.FILES.get(name) is not None:
                    if name not in remove_list:
                      diaryImage = DiaryImage(
                          diary=diary,
                          image=request.FILES[name],
                          width=request.POST.getlist("attr" + str(i + 1) + "[]")[0],
                          height=request.POST.getlist("attr" + str(i + 1) + "[]")[1],
                          imageX=request.POST.getlist("attr" + str(i + 1) + "[]")[2],
                          imageY=request.POST.getlist("attr" + str(i + 1) + "[]")[3],
                          degree=request.POST.getlist("attr" + str(i + 1) + "[]")[4],
                      )
                      diaryImage.save()
                    else:
                      imgIdx = remove_list.index(name)
                      diaryRemove = DiaryRemove(
                        diary = diary,
                        path = 'rmImages/'+name_list[imgIdx],
                        width=request.POST.getlist("attr" + str(i + 1) + "[]")[0],
                        height=request.POST.getlist("attr" + str(i + 1) + "[]")[1],
                        imageX=request.POST.getlist("attr" + str(i + 1) + "[]")[2],
                        imageY=request.POST.getlist("attr" + str(i + 1) + "[]")[3],
                        degree=request.POST.getlist("attr" + str(i + 1) + "[]")[4],
                      )
                      diaryRemove.save()

        hash_cnt = request.POST.get("hashtag_num")
        print(hash_cnt)
        if hash_cnt:
          for k in range(int(hash_cnt)):
            hash_name = "hashtag"+str(k+1)
            if request.POST.get(hash_name) is not None:
                diaryHashtag = DiaryHashtag(
                  diary = diary,
                  hashtag = request.POST.get(hash_name),
                )
                diaryHashtag.save()
        
        sti_cnt = request.POST.get("stiNum")
        if sti_cnt:
            for r in range(int(sti_cnt)):
                name = "sti" + str(r + 1)
                diarySticker = DiarySticker(
                    diary=diary,
                    url=request.POST.get(name),
                    width=request.POST.getlist("aticker" + str(r + 1) + "[]")[0],
                    height=request.POST.getlist("aticker" + str(r + 1) + "[]")[1],
                    imageX=request.POST.getlist("aticker" + str(r + 1) + "[]")[2],
                    imageY=request.POST.getlist("aticker" + str(r + 1) + "[]")[3],
                )
                diarySticker.save()

        return redirect(
            "diary:detail", user_id=request.session.get("user"), diary_id=diary.id
        )

    return render(request, "diary/decorate.html")


def detail(request, user_id, diary_id):
    diary = Diary.objects.get(id=diary_id)
    diary_text = DiaryText.objects.filter(diary=diary)
    diary_images = DiaryImage.objects.filter(diary=diary)
    diary_remove = DiaryRemove.objects.filter(diary=diary)
    diary_hashtag = DiaryHashtag.objects.filter(diary=diary)
    diary_sticker = DiarySticker.objects.filter(diary=diary)

    print(diary_id)

    content = {
        "diary": diary,
        "diaryText": diary_text,
        "diaryImage": diary_images,
        "diaryRemove": diary_remove,
        "diaryHashtag":diary_hashtag,
        "diarySticker":diary_sticker,
    }

    return render(request, "diary/detail.html", content)


def search(request):
    # date_list = Diary.objects.filter(diary=id)
    qs = DiaryText.objects.all()
    q = request.GET.get('q', '')  # GET request의 인자중에 q 값이 있으면 가져오고, 없으면 빈 문자열 넣기
    print('검색어: ', q)
    if q:  # q가 있으면
        queryset = (Q(content__icontains=q))
        print('this is query', queryset)
        qs = DiaryText.objects.filter(queryset).distinct()
        #qs = qs.filter(content__icontains=q)
        print('검색어 있음: ', q, qs)
    else:
        print('검색어 없음: ', q, qs)
    return render(request, 'diary/search.html', {
        'search': qs,
        'q': q,
    })


def edit(request, user_id, diary_id): #, diary_id
    diary = Diary.objects.get(id=diary_id)
    diary_text = DiaryText.objects.filter(diary=diary)
    diary_images = DiaryImage.objects.filter(diary=diary)
    diary_remove = DiaryRemove.objects.filter(diary=diary)
    diary_hashtag = DiaryHashtag.objects.filter(diary=diary)
    diary_sticker = DiarySticker.objects.filter(diary=diary)


    content = {
        "diary": diary,
        "diaryText": diary_text,
        "diaryImage": diary_images,
        "diaryRemove": diary_remove,
        "diaryHashtag":diary_hashtag,
        "diarySticker":diary_sticker,
    }

    return render(request, "diary/diary_edit.html", content)


def diary_list(request):
    diary_list = Diary.objects.order_by("-created_date")
    context = {
        "diary_list": diary_list,
    }

    return render(request, "diary/diary_list.html", context)

def handwriting(request):
    return render(request, "diary/handwriting.html")

############################################################################################################
'''
@csrf_exempt
def handwriting(request):

    if request.method == "POST":
      hand_writing = HandWriting()
      hand_writing.user_id = request.session.get("user")
      hand_writing.image = request.FILES.get("chooseFile")
      hand_writing.save()

      data_file = HandWriting.objects.filter(user_id=request.session.get("user"))
    #   print(data_file[len(data_file)-1].image)

      handwriting_function.create_handwriting_dataset(data_file[len(data_file)-1].image)


    return render(request, "diary/handwriting.html")
'''
############################################################################################################

# 배경제거
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

from rembg.bg import remove
import numpy as np
import io
from PIL import Image

import json

from django.http.response import JsonResponse
import urllib.request

@csrf_exempt
def bgr_rm(request):
    data = json.loads(request.body)

    print(data)
    print(data['image'])
    print(type(data['image']))

    image = data['image']

    # url = data['image']
    # urllib.request.urlretrieve(url, 'diary/static/backimages/test.jpg')
    # urllib.request.urlretrieve(data['image'], 'diary/static/backimages/test.jpg')
    path = 'media/rmImages/'+image

    f = np.fromfile(path)
    print(f)
    result = remove(f)
    print(result)
    img = Image.open(io.BytesIO(result)).convert("RGBA")
    img.save(path)

    print(data)
    print(data['image'])
    data = dict()
    data['path'] = image

    return JsonResponse(data)



@csrf_exempt
def hashtag(request):
    data = json.loads(request.body)
    # text = data['text']


    data_text = data['text']
    text = ''

    for dt in data_text:
        text += dt + ' '

    print(text)
    print([text])


    for id, s in enumerate(hashtag_function.tfidfScorer([text])):
        s = sorted(s, key=lambda x: x[1], reverse=True)
        # print(s)
        # print(type(s))
        # print(s[0][0], s[1][0], s[2][0])
        keyword = []
        for i in range(3):
            keyword.append(s[i][0])
            # print(s[i][0])
        print('-original text-\n', text)
        print('top 3 keyword = ', keyword)
        # print('[%d] %s ...' % (id, s[:10]))

        context = []
        for k in keyword:
            context.append({"keyword":k})
        print(context)

    return JsonResponse(context, safe=False)
