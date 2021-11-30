from django.contrib import admin
from django.db import models
from .models import Diary, DiaryText, DiaryImage, HandWriting

class DiaryText(admin.TabularInline):
    model = DiaryText


class DiaryImageInline(admin.TabularInline):
    model = DiaryImage


class DiaryAdmin(admin.ModelAdmin):
    inlines = [
        DiaryText,
        DiaryImageInline,
    ]


admin.site.register(Diary, DiaryAdmin)
admin.site.register(HandWriting)


# admin.site.register(Diary)
# admin.site.register(DiaryText)
# admin.site.register(DiaryImage)

# 검색 기능
# class DiaryAdmin(admin.ModelAdmin):
#     search_fields = ["title"]


# admin.site.register(Diary, DiaryAdmin)
