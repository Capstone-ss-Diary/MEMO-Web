# MEMO-web
빙글빙글 돌아가는 나의 하루 <‘매’일 쓰는 ‘모’든 나의 이야기: 매모 MEMO>
![image](https://user-images.githubusercontent.com/55437339/146634903-fd6a0df2-dea8-4bfe-be00-e0d972585bbd.png)


## 개요
'MEMO'는 온·오프라인 일기의 장점을 결합시킨 형태의 개인 기록용 다이어리 웹 서비스입니다. 일기의 작성과 편집은 물론, 자동 해시태그 생성, 사용자 손글씨 적용 등의 기능을 제공하며 일기에 관련한 다양한 스티커들을 추천해주며 오프라인 못지 않은 다이어리 꾸미기 기능을 제공합니다.

## 서비스 설치 및 실행
- python 3.7과 python 3.8 version이 모두 설치되어 있어야 합니다.
- MEMO-web과 handwriting-server는 각 다른 서버에서 실행시켜야 합니다.
- MEMO-web 프로젝트를 local에서 clone 합니다.
  1. git clone https://github.com/Capstone-ss-Diary/MEMO-Web.git  
  2. cd MEMO-Web
- 가상환경을 설치하고 활성화합니다.
  1. pip install virtualenv
  2. virtualenv venv –python=python3.8 (python 3.8 버전이 설치 필요)
  3. venv\Scripts\activate
- 모듈을 설치합니다.
  1. pip install -r requirements.txt (requirements.txt는 프로젝트 내에 존재)
- 모델을 migrations하고 서버를 실행합니다.
  1. python manage.py makemigrations
  2. python manage.py migrate
  3. python manage.py runserver
