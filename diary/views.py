from django.shortcuts import render
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
            # return redirect('detail', diary_id=diary.id)
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
    return HttpResponse("Edit %s." % diary_id)


def diary_list(request):
    return HttpResponse("List %s.")
