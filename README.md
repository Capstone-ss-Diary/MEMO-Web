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
  2. virtualenv venv –python=python3.8 (python 3.8 버전 설치 필요)
  3. venv\Scripts\activate
- 모듈을 설치합니다.
  1. pip install -r requirements.txt (requirements.txt는 프로젝트 내에 존재)
- 모델을 migrations하고 서버를 실행합니다.
  1. python manage.py makemigrations
  2. python manage.py migrate
  3. python manage.py runserver
- handwriting-sever 프로젝트를 local에서 clone 합니다. (https://github.com/Capstone-ss-Diary/handwriting-server.git)
  1. git clone https://github.com/Capstone-ss-Diary/handwriting-server.git
  2. cd handwriting-server
- 가상환경을 설치하고 활성화합니다.
  1. virtualenv venv –python=python3.7 (python 3.7 버전 설치 필요)
  2. venv\Scripts\activate
- 모듈을 설치합니다.
  1. pip install -r requirements.txt
- 손글씨 모델을 적용합니다.
  1. https://drive.google.com/file/d/1MzJ4TEXIhlecu1GikULkefH79CTRFx45/view 에서 파일 다운로드
  2. 압축파일 안에 있는 unet.model-1300 파일 세 개 모두 handwriting-server\runmodel\source\experiment\checkpoint\experiment_0_batch_16 폴더 안에 넣어주기
- 모델을 migrations하고 서버를 실행합니다.
  1. python manage.py makemigrations
  2. python manage.py migrate
  3. python manage.py runserver 8001 (https://localhost:8000 으로 접속)


## 서비스 메뉴얼
![image](https://user-images.githubusercontent.com/55437339/146636192-9b44e4ee-45c0-438a-bace-dc5590949755.png)  
(시작 페이지)  
  
![image](https://user-images.githubusercontent.com/55437339/146636233-331fd941-494a-46a8-a201-4fb057edec14.png)  
(로그인 페이지)  
  
![image](https://user-images.githubusercontent.com/55437339/146636275-329490a3-c92a-43b4-82ec-17d941c73966.png)  
(회원가입 페이지) 중복 아이디, 메일 사용 불가
  
![image](https://user-images.githubusercontent.com/55437339/146636294-fb66ef18-d66b-4ddd-9ea8-365d821d62ca.png)  
(캘린더 페이지) 정상 로그인 되었을 때, 또는 왼쪽 사이드바의 홈 아이콘을 클릭했을 때의 페이지. 날짜를 클릭했을 때 해당하는 일기가 존재하면 일기 확인 화면으로, 없으면 일기 생성 화면으로 이동  
  
![image](https://user-images.githubusercontent.com/55437339/146636409-ab56b40c-19ee-4d4f-b295-67d13cad7ca4.png)  
(일기생성 페이지: 일기작성) 오른쪽 텍스트 박스에 텍스트를 입력하면 오른쪽 다이어리 공간에 입력값 출력. 텍스트 박스를 추가하거나 삭제할 수 있고, 6개 제한. 드롭 박스에서 텍스트 박스를 선택하면 해당 텍스트 박스의 폰트 설정 가능. 입력값이 출력된 후 다이어리 공간을 클릭하면 해당 위치로 텍스트 위치 이동.  
  
![image](https://user-images.githubusercontent.com/55437339/146636497-1bb7e27d-25c8-4da3-a683-aa3c428718af.png)  
(일기생성 페이지: 배경선택) 색상 팔레트에서 색상을 클릭하면 해당 색상이 오른쪽 다이어리 공간에 적용.  
  
![image](https://user-images.githubusercontent.com/55437339/146636558-e02b8563-d6d5-44ba-bdc2-99016b5d6e52.png)  
(일기생성 페이지: 사진업로드) 불러오기 버튼으로 사진을 불러온 후, 업로드 버튼을 클릭하면 다이어리 공간에 사진 출력. 드롭 박스에서 업로드 된 사진 중 선택하여 해당 사진의 크기, 기울기 조정 가능. x 버튼을 누르면 해당 사진 삭제.  
  
![image](https://user-images.githubusercontent.com/55437339/146636620-31097d83-895a-4eb3-8bd8-7faaa9316ce0.png)  
(일기생성 페이지: 사진업로드(배경제거)) 사진을 불러온 후, 배경제거 버튼을 클릭하여 해당 사진의 배경을 제거. 후에 업로드 버튼을 클릭하면 다이어리 공간에 배경이 제거된 사진 출력.  
  
![image](https://user-images.githubusercontent.com/55437339/146636676-baac5cbb-204a-4c07-aa83-ac4fdbd72646.png)  
(일기생성 페이지: 해시태그 생성) 해시태그 직접 만들기 버튼을 클릭하면 수동으로 해시태그 작성 가능. 해시태그 자동 생성하기 버튼을 클릭하면 텍스트에 작성한 입력 값을 분석하여 자동으로 해시태그 생성. 해시태그 12개 제한. 해시태그를 자동으로 생성하기 위해서 텍스트 값을 구체적 입력 필요.  
  
![image](https://user-images.githubusercontent.com/55437339/146636703-6cb18053-6f7d-46a7-89e0-b276469f0e91.png)  
(일기생성 페이지: 스티커) 드롭 박스에 생성된 해시태그의 목록이 반영. 해시태그를 선택하면 해당된 해시태그의 스티커가 추천. 스티커를 클릭하면 다이어리 공간에 출력.
  
![image](https://user-images.githubusercontent.com/55437339/146639239-916eaa31-7845-44b8-9d1e-d7a2ddcf4b5f.png)  
(손글씨 등록 페이지) 왼쪽 사이드바의 펜 아이콘을 클릭했을 때의 페이지. 상단 버튼을 클릭해서 손글씨 작성 파일 다운로드. 손글씨로 작성해넣은 파일을 jpg 형식으로 파일 업로드하면 사용자 손글씨 등록 가능.  
  
![image](https://user-images.githubusercontent.com/55437339/146639340-480d63ec-c239-449e-acfd-82218682f5ec.png)  
(일기 검색 페이지) 왼쪽 사이드바의 돋보기 아이폰을 클릭했을 때의 페이지. 검색어가 포함된 일기 글들을 불러옴.  
  
![image](https://user-images.githubusercontent.com/55437339/146639427-661fca4e-406c-4ccf-917f-18f799780cb7.png)  
(일기 확인 페이지) 캘린더 또는 일기 검색 또는 일기 생성 직후의 페이지. 작성한 일기 결과 확인 가능.  
  
![image](https://user-images.githubusercontent.com/55437339/146639452-e0054efe-e0d4-4009-b671-2c026f27a4bd.png)  
(일기 수정 페이지) 일기 확인 화면에서 수정 버튼을 누를 때의 페이지. 작성한 일기 수정 가능.


