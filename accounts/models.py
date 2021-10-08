from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=64, verbose_name="아이디")
    password = models.CharField(max_length=64, verbose_name="비밀번호")
    name = models.CharField(max_length=32, verbose_name="이름")
    email = models.EmailField(max_length=128, verbose_name="이메일")
    registered_dttm = models.DateTimeField(auto_now_add=True, verbose_name="등록시간")

    def __str__(self):
        return self.username
        # 문자열 반환

    class Meta:  # 메타 클래스를 이용하여 테이블명 지정
        db_table = "users"
