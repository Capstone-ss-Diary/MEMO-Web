from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


def home(request):
    return render(request, "account/home.html")


# 로그인
# DB 연결 전이라 authenticate 등 안 돌아가는 것 같으니 DB연결 후 확인할 것
def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:  # user가 존재하면
            login(request, user)
            return redirect("home")
        else:
            return render(
                request, "account/login.html", {"error": "아이디 또는 비밀번호가 올바르지 않습니다."}
            )
    else:
        return render(request, "account/login.html")


# 로그아웃
def logout(request):
    logout(request)
    return redirect("home")


# 회원가입
# 로그인과 같은 이유로 DB 연결 후 확인할 것
def signup(request):
    if request.method == "POST":
        if request.POST["password1"] == request.POST["password2"]:
            user = User.objects.create_user(
                username=request.POST["username"], password=request.POST["password1"]
            )
            login(request, user)
            return redirect("home")
        return render(request, "account/signup.html")
    else:
        return render(request, "account/signup.html")
