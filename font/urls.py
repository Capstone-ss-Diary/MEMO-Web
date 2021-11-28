from django.urls import path

from . import views

urlpatterns = [
    path("", views.handfont_create, name="handfont_create"),
    path("handfont_create/", views.handfont_create, name="handfont_create"),
]
