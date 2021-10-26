var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var x = ctx.canvas.offsetLeft; // 텍스트 x 좌표 초기
var y = ctx.canvas.offsetTop + 10; // 텍스트 y 좌표 초기
var imgNum = 0; // 업로드한 이미지 누적 개수 (삭제 포함)

document.getElementById("coordinateX").value = parseInt(x); // 텍스트 x 좌표 input 저장
document.getElementById("coordinateY").value = parseInt(y); // 텍스트 y 좌표 input 저장

// canvas 텍스트 출력
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
  var currentY = document.getElementById("coordinateY").value;

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
  ctx.fillText(line, document.getElementById("coordinateX").value, currentY);
}

// cavnas 이미지 출력
function drawingImg() {

  var canvasImg = document.getElementById("canvasImg");
  var canvasImgX = document.getElementById("canvasImgX");
  var canvasImgY = document.getElementById("canvasImgY");

  // 업로드 한 이미지기 1개 이상이면 출력
  if (canvasImg.childElementCount > 0) {
    var images = canvasImg.childNodes; // 업로드한 이미지 모두 불러오기
    var imagesX = canvasImgX.childNodes; // 이미지 x좌표 모두 불러오기
    var imagesY = canvasImgY.childNodes; // 이미지 y좌표 모두 불러오기

    for (var i = 0; i < images.length; i++) {
      var img = images.item(i);
      ctx.drawImage(img, imagesX.item(i).value, imagesY.item(i).value, img.width, img.height);
    }

  }

}

function totalCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  writingText(); // 일기작성 상태 불러오기
  drawingImg(); // 사진업로드 상태 불러오기
}


// ========== write ========== //
document.getElementById("UserInput").oninput = function () { // input 작성하면 canvas에 텍스트 출력
  totalCanvas();
}

function settingRGB(opt) { // RGB입력 : rgb input 나타나게
  if (opt.selectedIndex == 5) {
    document.getElementById("rgb1").style.visibility = "visible";
    document.getElementById("rgb2").style.visibility = "visible";
    document.getElementById("rgb3").style.visibility = "visible";
    document.getElementById("R").style.visibility = "visible";
    document.getElementById("G").style.visibility = "visible";
    document.getElementById("B").style.visibility = "visible";
  }
}


// ========== photo ========== //
function validateName(fname) { // 파일이름으로 확장자 체크하는 함수
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

function loadFile(input) { // 이미지 불러오면 미리보기 이미지 업로드
  var file = input.files[0]; // 파일 가져오기

  if (validateName(file.name)) { // 허용된 확장자명이면
    document.getElementById("fileName").textContent = file.name; // 파일명 넣기

    var photo = document.querySelector(".image");
    photo.src = URL.createObjectURL(file); // 파일 객체에서 이미지 데이터 가져오기
    photo.style.visibility = "visible"; // div에 이미지 미리 보여주기


    document.getElementById("imgSubmit").disabled = false; // 업로드 버튼 활성화

  }
  else alert("잘못된 확장자입니다.\n이미지 파일을 넣어주세요 (jpeg/jpg/png)");
}

document.getElementById("imgSubmit").onclick = function () { // canvas에 이미지 올리기
  var pre_img = document.querySelector(".image"); // 미리보기 이미지 불러오기
  imgNum = imgNum + 1; // 업로드한 이미지 개수

  var img = document.createElement("img"); // img 태그 생성
  img.setAttribute("id", "img" + String(imgNum)); // id 속성 추가
  img.setAttribute("src", pre_img.src); // src 속성 추가 (미리보기 이미지 src)
  img.setAttribute("width", pre_img.clientWidth); // width 속성 추가 (미리보기 이미지 width)
  img.setAttribute("height", pre_img.clientHeight); // height 속성 추가 (미리보기 이미지 height)
  img.style.display = "none"; // 태그 숨기기
  document.getElementById("canvasImg").appendChild(img); // 생성한 img 태그 추가

  var imgX = document.createElement("input"); // img x 좌표 태그 생성
  imgX.setAttribute("id", "img" + String(imgNum) + "X"); // id 속성 추가
  imgX.setAttribute("value", x); // 이미지 x 좌표 초기값 추가
  imgX.style.display = "none"; // 태그 숨기기
  document.getElementById("canvasImgX").appendChild(imgX); // 생성한 img x 좌표 태그 추가

  var imgY = document.createElement("input"); // img y 좌표 태그 생성
  imgY.setAttribute("id", "img" + String(imgNum) + "Y"); // id 속성 추가
  imgY.setAttribute("value", y); // 이미지 y 좌표 초기값 추가
  imgY.style.display = "none"; // 태그 숨기기
  document.getElementById("canvasImgY").appendChild(imgY); // 생성한 img y 좌표 태그 추가

  var imgR = document.createElement("input"); // img 기울기 태그 생성
  imgR.setAttribute("id", "img" + String(imgNum) + "R"); // id 속성 추가
  imgR.setAttribute("value", 0); // 이미지 기울기 초기값 0
  document.getElementById("canvasImgR").appendChild(imgR); // 생성한 기울기 태그 추가

  var opt = document.createElement("option"); // option 태그 생성
  opt.setAttribute("id", "img" + String(imgNum) + "O"); // id 속성 추가
  opt.setAttribute("selected", true); // selected 속성 추가
  opt.innerText = document.getElementById("fileName").textContent; // 파일 이름 추가
  document.getElementById("selectImg").appendChild(opt); // 생성한 옵션 태그 추가

  totalCanvas()

  photo.onload = function () {
    URL.revokeObjectURL(pre_img.src); // URL 객체 해제
  }
  document.getElementById("fileName").textContent = null; //기존 파일 이름 지우기
  pre_img.src = ""; // 이미지 src 데이터 해제
  pre_img.style.visibility = "hidden"; // 미리보기 이미지 숨기기

  document.getElementById("imgSubmit").disabled = true; // 업로드 버튼 비활성화

}

document.getElementById("plus").onclick = function () { // 이미지 크기 확대

  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
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

document.getElementById("minus").onclick = function () { // 이미지 크기 축소

  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
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

document.getElementById("textExtract").onclick = function () { // "텍스트 추출" 누르면 티켓폼 선택 나타내기
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

document.getElementById("delImg").onclick = function () {

  var slt = document.getElementById("selectImg").selectedIndex;

  var opt = document.getElementById("selectImg").childNodes.item(slt);
  opt.parentNode.removeChild(opt); // 옵션 삭제

  var img = document.getElementById("canvasImg").childNodes.item(slt);
  img.parentNode.removeChild(img); // 이미지 삭제

  totalCanvas(); // canvas 다시 그리기 (밑으로 보내면 동작 안되서 여기 끼워넣은 거 바꾸지마!~!)

  var imgX = document.getElementById("canvasImgX").childNodes.item(slt);
  imgX.parentNode.removeChild(imgX); // 이미지 x 좌표 삭제

  var imgY = document.getElementById("canvasY").childNodes.item(slt);
  imgY.parentNode.removeChild(imgY); // 이미지 y 좌표 삭제
}


// 회전 다시 봐야댐
document.getElementById("leftRotate").onclick = function () {
  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
  var imgR = document.getElementById("canvasImgR").childNodes.item(slt);

  imgR = imgR + 5;
  img.style.transform = "rotate(" + String(imgR) + "deg)"; // 기울기 적용

  imgR.value = imgR;

  totalCanvas();
}
document.getElementById("rightRotate").onclick = function () {
  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
  var imgR = document.getElementById("canvasImgR").childNodes.item(slt);

  // img.style

  var scope = parseInt(imgR.value) + 5;
  // img.style.transform = "rotate(90deg)";

  imgR.value = String(scope);

  totalCanvas();
  alert(scope);
}

// canvas 클릭 이벤트
canvas.onclick = function (event) {
  // 일기 작성
  if (document.getElementById("selectEdit").value == "write") {
    x = event.clientX - ctx.canvas.offsetLeft - 10; // 텍스트 x 좌표 변경
    y = event.clientY - ctx.canvas.offsetTop - 45; // 텍스트 y 좌표 변경

    document.getElementById("coordinateX").value = x; // 텍스트 x 좌표 전달
    document.getElementById("coordinateY").value = y; // 텍스트 y 좌표 전달

  }

  // 사진 업로드
  else if (document.getElementById("selectEdit").value == "photo") {

    var slt = document.getElementById("selectImg").selectedIndex;

    var pimg = document.getElementById("canvasImg").childNodes.item(slt);
    var px = document.getElementById("canvasImgX").childNodes.item(slt);
    var py = document.getElementById("canvasImgY").childNodes.item(slt);

    var photo_x = event.clientX - ctx.canvas.offsetLeft - (pimg.width / 2); // 이미지 x 좌표 변경
    var photo_y = event.clientY - ctx.canvas.offsetTop - (pimg.height / 2); // 이미지 y 좌표 변경

    px.value = photo_x;
    py.value = photo_y;

  }

  totalCanvas(); // 다시 canvas 그리기
}



