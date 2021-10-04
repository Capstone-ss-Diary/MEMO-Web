from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Diary
from .forms import DiaryForm

from django.utils import timezone


def calender(request):
    return render(request, 'diary/calender.html')


def search(request):
    return HttpResponse("Search index.")


def new(request):
    if request.method == 'POST':
        form = DiaryForm(request.POST)
        if form.is_valid():
            diary = form.save(commit=False)
            diary.user = request.user
            diary.created_date = timezone.now()
            diary.save()
            return redirect('detail', diary_id=diary.id)
    else:
        form = DiaryForm()

    return render(request, 'diary/new_diary.html', {'form': form})


def detail(request, diary_id):
    diary = Diary.objects.get(id=diary_id)
    context = {
        'diary': diary,
    }
    
    return render(request, 'diary/diary_detail.html', context)


def edit(request, diary_id):
    diary = get_object_or_404(Diary, pk=diary_id)
    if request.method == 'POST':
        form = DiaryForm(request.POST, request.FILES, instance=diary)
        if form.is_valid():
            diary = form.save(commit=False)
            diary.user = request.user
            diary.published_date = timezone.now()
            diary.save()
            return redirect('detail', diary.id)
    else:
        form = DiaryForm(instance=diary)

    return render(request, 'diary/diary_edit.html', {'form': form})


def diary_list(request):
    diary_list = Diary.objects.order_by('-created_date')
    context = {
        'diary_list': diary_list,
    }

    return render(request, 'diary/diary_list.html', context)
