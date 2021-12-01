from django.urls import path

from . import views

app_name = "diary"

urlpatterns = [
    path("", views.calender, name="calender"),
    path("calender/<int:user_id>/", views.calender, name="calender"),
    path("decorate/<int:user_id>/", views.decorate, name="decorate"),
    path("detail/<int:user_id>/<int:diary_id>/", views.detail, name="detail"),
    path("handwriting/", views.handwriting, name="handwriting"),
    # ---------
    path("search/", views.search, name="search"),
    path("detail/<int:diary_id>/edit/", views.edit, name="edit"),
    path("list/", views.diary_list, name="diary_list"),
    # path("remove/", views.bgr_rm, name="remove"),
    path("hashtag/", views.hashtag, name="hashtag"),

]
