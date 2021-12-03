from django.conf import settings
from django.db import models
from django.utils import timezone
from accounts.models import User


class Diary(models.Model):
    id = models.BigAutoField(primary_key=True, null=False)  # 식별자: 다이어리 id
    user_id = models.IntegerField(null=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    backColor = models.CharField(max_length=100, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    class Meta:
        db_table = "Diary"


# 일기 작성
class DiaryText(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)  # 외래키: 다이어리 id
    content = models.TextField()  # 일기작성 UserInput
    coordinateX = models.FloatField(null=True)  # 텍스트 x 좌표
    coordinateY = models.FloatField(null=True)  # 텍스트 y 좌표
    font = models.CharField(max_length=100, null=True)
    font_size = models.FloatField(null=True)
    font_color = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = "Diary_Text"


# 사진 업로드
class DiaryImage(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    width = models.FloatField(null=True)
    height = models.FloatField(null=True)
    imageX = models.FloatField(null=True)
    imageY = models.FloatField(null=True)
    degree = models.FloatField(null=True)

    class Meta:
        db_table = "Diary_Image"

# 배경 제거 이미지
class DiaryRemove(models.Model):
  diary = models.ForeignKey(Diary, on_delete=models.CASCADE, null=True)
  path = models.CharField(max_length=100, null=True)
  width = models.FloatField(null=True)
  height = models.FloatField(null=True)
  imageX = models.FloatField(null=True)
  imageY = models.FloatField(null=True)
  degree = models.FloatField(null=True)


# 해시태그
class DiaryHashtag(models.Model):
  diary = models.ForeignKey(Diary, on_delete=models.CASCADE, null=True)
  hashtag = models.CharField(max_length=100, null=True)

  class Meta:
      db_table = "Diary_Hashtag"


# 스티커
class DiarySticker(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, null=True)
    url = models.CharField(max_length=300, null=True)
    width = models.FloatField(null=True)
    height = models.FloatField(null=True)
    imageX = models.FloatField(null=True)
    imageY = models.FloatField(null=True)


class HandWriting(models.Model):
  id = models.BigAutoField(primary_key=True, null=False)
  user_id = models.IntegerField(null=True)
  image = models.ImageField(upload_to="hand_writing/", blank=True, null=True)

  class Meta:
      db_table = "HandWriting"
