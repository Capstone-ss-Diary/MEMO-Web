from django.urls import path

from . import views

urlpatterns = [
    path('', views.calender, name='calender'),
    path('search/', views.search, name='search'),
    path('create/', views.create, name='create'),
    path('detail/<int:diary_id>/', views.detail, name='detail'),
    path('detail/<int:diary_id>/edit/', views.edit, name='edit'),
]