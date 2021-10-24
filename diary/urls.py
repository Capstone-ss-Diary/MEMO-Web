from django.urls import path

from . import views

app_name = "diary"

urlpatterns = [
    path("", views.decorate, name="decorate"),
    path("decorate/", views.decorate, name="decorate"),
    path("search/", views.search, name="search"),
    path("new/", views.new, name="new"),
    path("detail/<int:diary_id>/", views.detail, name="detail"),
    path("detail/<int:diary_id>/edit/", views.edit, name="edit"),
    path("list/", views.diary_list, name="diary_list"),
    path("calendar/", views.calender, name="calendar"),
    path("photo/", views.photo, name="photo"),
]
