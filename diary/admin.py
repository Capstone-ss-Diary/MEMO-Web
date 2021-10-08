from django.contrib import admin
from .models import Diary

admin.site.register(Diary)


# 검색 기능
# class DiaryAdmin(admin.ModelAdmin):
#     search_fields = ["title"]


# admin.site.register(Diary, DiaryAdmin)
