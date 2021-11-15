from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password

import diary
from .models import User
from django.utils import timezone


def home(request):

    if not request.session.get("user", False):
        return render(request, "accounts/home.html")
    else:
        return redirect("diary:calender", user_id=request.session.get("user"))


def login(request):
    if request.method == "GET":
        return render(request, "accounts/login.html")
    elif request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        res_data = {}
        if not username:
            res_data["error"] = "아이디를 입력해주세요"
        elif not password:
            res_data["error"] = "비밀번호를 입력해주세요"
        elif not User.objects.filter(username=username):
            res_data["error"] = "존재하지 않는 아이디입니다."

        else:
            user = User.objects.get(username=username)

            if password == user.password:
                request.session["user"] = user.id
                return redirect("/")
            else:
                res_data["error"] = "비밀번호가 틀렸습니다"

    return render(request, "accounts/login.html", res_data)


def logout(request):
    request.session.clear()
    return redirect("/")


def signup(request):
    if request.method == "GET":
        return render(request, "accounts/signup.html")

    elif request.method == "POST":
        username = request.POST["username"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]
        name = request.POST["name"]
        email = request.POST["email"]

        sign_data = {}
        if not username:
            sign_data["error"] = "아이디를 입력하세요"
        elif not password1:
            sign_data["error"] = "비밀번호를 입력하세요"
        elif not password2:
            sign_data["error"] = "비밀번호 학인 입력하세요"
        elif not name:
            sign_data["error"] = "이름을 입력하세요"
        elif not email:
            sign_data["error"] = "이메일을 입력하세요"

        elif password1 != password2:
            sign_data["error"] = "비밀번호가 다릅니다"

        elif User.objects.filter(username=username):
            sign_data["error"] = "존재하는 아이디입니다"
        elif User.objects.filter(email=email):
            sign_data["error"] = "존재하는 이메일입니다"

        else:
            user = User(
                username=username,
                password=password1,
                name=name,
                email=email,
                registered_dttm=timezone.now(),
            )

            user.save()
            return redirect("/")

        return render(request, "accounts/signup.html", sign_data)
