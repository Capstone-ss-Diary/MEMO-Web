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