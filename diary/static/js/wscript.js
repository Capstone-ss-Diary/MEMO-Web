var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

// ========== write ========== //
var x = ctx.canvas.offsetLeft; // 텍스트 x 좌표 초기
var y = ctx.canvas.offsetTop + 10; // 텍스트 y 좌표 초기
document.getElementById("coordinateX").value = parseInt(x); // 텍스트 x 좌표 input 저장
document.getElementById("coordinateY").value = parseInt(y); // 텍스트 y 좌표 input 저장

function writingText() {

  // 폰트
  var selected_Font = document.getElementById("fontSelect");
  var font = selected_Font.options[selected_Font.selectedIndex].value;
  document.getElementById("font").value = font; // font value html 전달 (DB 저장용)

  // 폰트 크기 가져오기
  var font_size = document.getElementById("fontSize").value;

  // rgb 입력값 세팅
  var r = document.getElementById("R").value;
  var g = document.getElementById("G").value;
  var b = document.getElementById("B").value;
  document.getElementById("setRGB").value = "rgb(" + r + "," + g + "," + b + ")"

  // 폰트 색상 불러오기 및 저장
  var selected_fontColor = document.getElementById("fontColorSelect");
  var font_color = selected_fontColor.options[selected_fontColor.selectedIndex].value;
  document.getElementById("fontColor").value = font_color; // font color html 전달

  // 폰트 세팅
  ctx.font = font_size + "px " + font;
  ctx.fillStyle = font_color;

  var text = UserInput.value
  var line = "";
  var fontSize = parseFloat(ctx.font);
  var currentY = y;

  ctx.textBaseline = "top"

  for (var i = 0; i < text.length; i++) {
    var tempLine = line + text[i];
    var tempWidth = x + ctx.measureText(tempLine).width;

    if (tempWidth < canvas.width && text[i] != "\n") {
      line = tempLine;
    }
    else {
      ctx.fillText(line, x, currentY);

      if (text[i] != "\n") line = text[i];
      else line = "";

      currentY += fontSize * (1.2);
    }
  }
  ctx.fillText(line, x, currentY);
}

// ========== photo ========== //
var photo_x = ctx.canvas.offsetLeft;
var photo_y = ctx.canvas.offsetTop + 10;

// cavnas에 image 값 출력하는 함수
function drawingImg() {

  var img = document.getElementById("imgP1");
  var width = document.getElementById("imgP1").width;
  var height = document.getElementById("imgP1").height;

  ctx.drawImage(img, photo_x, photo_y, width, height);

}

function totalCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  writingText(); // 일기작성 상태 불러오기
  drawingImg(); // 사진업로드 상태 불러오기
}


// input 작성하면 canvas에 텍스트 출력
document.getElementById("UserInput").oninput = function () {
  totalCanvas();
}

// RGB입력 : rgb input 나타나게
function settingRGB(opt) {
  if (opt.selectedIndex == 5) {
    document.getElementById("rgb1").style.visibility = "visible";
    document.getElementById("rgb2").style.visibility = "visible";
    document.getElementById("rgb3").style.visibility = "visible";
    document.getElementById("R").style.visibility = "visible";
    document.getElementById("G").style.visibility = "visible";
    document.getElementById("B").style.visibility = "visible";
  }
}


// ========== background ========== //



// ========== photo ========== //

// 파일이름으로 확장자 체크하는 함수
function validateName(fname) {
  var extensions = ['jpeg', 'jpg', 'png']; // 허용되는 확장자
  var fparts = fname.split('.');
  var fext = '';
  var validated = false; // 유효성

  if (fparts.length > 1) {
    fext = fparts[fparts.length - 1]; // 확장자명
  }

  if (fext != '') {
    extensions.forEach(function (ext) {
      if (ext == fext) { // 허용되는 확장자면 유효성 주기
        validated = true;
      }
    });
  }

  return validated; // 허용되는 확장자이면 true, 아니면 false
}

// 이미지 불러오면 미리보기 이미지 업로드
function loadFile(input) {
  var file = input.files[0]; // 파일 가져오기

  if (validateName(file.name)) { // 허용된 확장자명이면
    document.getElementById("fileName").textContent = file.name; // 파일명 넣기

    var photo = document.querySelector(".image");
    photo.src = URL.createObjectURL(file); // 파일 객체에서 이미지 데이터 가져오기
    photo.style.visibility = "visible"; // div에 이미지 미리 보여주기


    document.getElementById("imgP1").src = URL.createObjectURL(file);


    document.getElementById("imgSubmit").disabled = false; // 업로드 버튼 활성화

    document.querySelector('.dellink').style.display = 'block'; // 이미지 삭제 링크 표시

    photo.onload = function () {
      URL.revokeObjectURL(photo.src); // URL 객체 해제
    }

  }
  else alert("잘못된 확장자입니다.\n이미지 파일을 넣어주세요 (jpeg/jpg/png)");
}

// canvas에 이미지 올리기
function showImage() {

  document.getElementById("imgP1").width = document.getElementById("image").clientWidth;
  document.getElementById("imgP1").height = document.getElementById("image").clientHeight;

  totalCanvas()

  document.getElementById('fileName').textContent = null; //기존 파일 이름 지우기

  deleteImg();

}

function deleteImg() {
  var photo = document.querySelector(".image");
  photo.src = ""; // 이미지 src 데이터 해제
  photo.style.visibility = "hidden"; // div 이미지 숨기기

  document.querySelector(".dellink").style.display = "none";

}

// 이미지 크기 확대
document.getElementById("plus").onclick = function () {
  var img = document.getElementById("imgP1");
  var width = img.width;
  var height = img.height;

  var resizeWidth = width * 1.5;
  var resizeHeight = height * 1.5;

  if (width < 880 && height < 600) {
    resizeWidth = Math.round((width * resizeWidth) / width);
    resizeHeight = Math.round((height * resizeHeight) / height);
  }
  else {
    resizeWidth = width;
    resizeHeight = height;
  }

  img.width = resizeWidth;
  img.height = resizeHeight;

  totalCanvas();
}

// 이미지 크기 축소
document.getElementById("minus").onclick = function () {
  var img = document.getElementById("imgP1");
  var width = img.width;
  var height = img.height;

  var resizeWidth = width * 0.5;
  var resizeHeight = height * 0.5;

  if (width > 0 && height > 0) {
    resizeWidth = Math.round((width * resizeWidth) / width);
    resizeHeight = Math.round((height * resizeHeight) / height);
  }
  else {
    resizeWidth = width;
    resizeHeight = height;
  }

  img.width = resizeWidth;
  img.height = resizeHeight;

  totalCanvas();
}

// "텍스트 추출" 누르면 티켓폼 span, select 나타내기
document.getElementById("textExtract").onclick = function () {
  var ticket1 = document.querySelector(".ticketForm1");
  var ticket2 = document.querySelector(".ticketForm2");

  if (ticket1.style.visibility == "hidden" && ticket2.style.visibility == "hidden") {
    document.querySelector(".ticketForm1").style.visibility = "visible";
    document.querySelector(".ticketForm2").style.visibility = "visible";
  }
  else {
    document.querySelector(".ticketForm1").style.visibility = "hidden";
    document.querySelector(".ticketForm2").style.visibility = "hidden";
  }

  // openCV 연결 기능 추가
}


// canvas 클릭 이벤트
canvas.onclick = function (event) {
  // 일기 작성
  if (document.getElementById("selectEdit").value == "write") {
    x = event.clientX - ctx.canvas.offsetLeft - 10; // 텍스트 x 좌표 변경
    y = event.clientY - ctx.canvas.offsetTop - 45; // 텍스트 y 좌표 변경
    document.getElementById("coordinateX").value = parseInt(x); // 텍스트 x 좌표 전달
    document.getElementById("coordinateY").value = parseInt(y); // 텍스트 y 좌표 전달
  }

  else if (document.getElementById("selectEdit").value == "photo") {
    photo_x = event.clientX - ctx.canvas.offsetLeft - 25; // 사진 y 좌표 변경
    photo_y = event.clientY - ctx.canvas.offsetTop - 100; // 이미지 y 좌표 변경
  }

  totalCanvas(); // 다시 canvas 그리기
}



