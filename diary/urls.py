from django.urls import path

from . import views

app_name = "diary"
# path("") : 임시 write, calendar로 바꿀 것
urlpatterns = [
    path("", views.write, name="write"),
    path("search/", views.search, name="search"),
    path("new/", views.new, name="new"),
    path("detail/<int:diary_id>/", views.detail, name="detail"),
    path("detail/<int:diary_id>/edit/", views.edit, name="edit"),
    path("list/", views.diary_list, name="diary_list"),
    path("write/", views.write, name="write"),
    path("calendar/", views.calender, name="calendar"),
    path("tab/", views.tab, name="tab"),
]
