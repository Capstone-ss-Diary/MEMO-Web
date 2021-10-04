from django.urls import path

from . import views

urlpatterns = [
    path('', views.calender, name='calender'),
    path('search/', views.search, name='search'),
    path('new/', views.new, name='new'),
    path('detail/<int:diary_id>/', views.detail, name='detail'),
    path('detail/<int:diary_id>/edit/', views.edit, name='edit'),
    path('list/', views.diary_list, name='diary_list'),
]