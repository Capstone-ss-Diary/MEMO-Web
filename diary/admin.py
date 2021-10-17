from django.contrib import admin
from .models import Diary, Content

admin.site.register(Diary)
admin.site.register(Content)

# 검색 기능
# class DiaryAdmin(admin.ModelAdmin):
#     search_fields = ["title"]


# admin.site.register(Diary, DiaryAdmin)
