from django import forms

from .models import Diary


class DiaryForm(forms.ModelForm):
    class Meta:
        model = Diary
        fields = "__all__"

class PostSearchForm(forms.Form):
    search_word = forms.CharField(label='Search Word')