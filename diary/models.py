from django.conf import settings
from django.db import models
from django.utils import timezone


class Diary(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    # hashtag

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class Content(models.Model):
    txt = models.TextField()  # 일기 본문
    coordinateX = models.IntegerField(null=True)  # 마우스 x 위치
    coordinateY = models.IntegerField(null=True)  # 마우스 y 위치
    font = models.CharField(max_length=100, null=True)  # 폰트
    fontSize = models.IntegerField(null=True)  # 폰트 크기 (DB 들어가는 거 확인 전)
    # 폰트, 크기, 색(linked-list????)

    class Meta:
        db_table = "content"
