from django.contrib import admin
from .models import Diary, DiaryText, DiaryImage

admin.site.register(Diary)
admin.site.register(DiaryText)
admin.site.register(DiaryImage)

# 검색 기능
# class DiaryAdmin(admin.ModelAdmin):
#     search_fields = ["title"]


# admin.site.register(Diary, DiaryAdmin)
