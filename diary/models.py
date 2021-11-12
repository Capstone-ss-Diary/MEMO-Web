from django.conf import settings
from django.db import models
from django.utils import timezone
from accounts.models import User
from django.contrib.postgres.fields import ArrayField


class Diary(models.Model):
    id = models.BigAutoField(primary_key=True)  # 식별자: 다이어리 id
    user_id = models.IntegerField(null=True)
    # user_id = models.ForeignKey(
    #     User, related_name="user", on_delete=models.CASCADE, db_column="username"
    # )  # 외래키: username (사용자ID)
    # title = models.CharField(max_length=200)  # 제목
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    # hashtag

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    # def __str__(self):
    #     return self.title


# 일기 작성
class DiaryText(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)  # 외래키: 다이어리 id
    content = models.TextField()  # 일기작성 UserInput
    coordinateX = models.IntegerField(null=True)  # 텍스트 x 좌표
    coordinateY = models.IntegerField(null=True)  # 텍스트 y 좌표
    font = models.CharField(max_length=100, null=True)
    font_size = models.IntegerField(null=True)
    font_color = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = "Diary_Text"


# 사진 업로드
class DiaryImage(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    width = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    imageX = models.IntegerField(null=True)
    imageY = models.IntegerField(null=True)
