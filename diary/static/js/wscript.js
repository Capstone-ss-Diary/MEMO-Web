var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

// (x, y) 초기 좌표 | 이미지 업로드 수
var x = ctx.canvas.offsetLeft;
var y = ctx.canvas.offsetTop + 10;
var imgNum = 0;
var img_cnt = 0; // 업로드한 이미지 개수

document.getElementById("coordinateX").value = parseInt(x); // 텍스트 x 좌표 input 저장
document.getElementById("coordinateY").value = parseInt(y); // 텍스트 y 좌표 input 저장

function writingText() { // canvas 텍스트 출력

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

function drawingImg() { // cavnas 이미지 출력

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

function totalCanvas() { // 캔버스 정보
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

    var photo = document.querySelector(".image"); // 미리보기 이미지
    photo.src = URL.createObjectURL(file); // 파일 객체에서 이미지 데이터 가져오기
    photo.style.visibility = "visible"; // div에 이미지 미리 보여주기

    img_cnt += 1; // 이미지 수
    document.getElementById("img_count").value = img_cnt;

    document.getElementById("imgSubmit").disabled = false; // 업로드 버튼 활성화
  }
  else alert("잘못된 확장자입니다.\n이미지 파일을 넣어주세요 (jpeg/jpg/png)");
}

document.getElementById("imgSubmit").onclick = function () { // canvas에 이미지 올리기
  var pre_img = document.querySelector(".image"); // 미리보기 이미지 불러오기
  imgNum = parseInt(imgNum) + 1; // 업로드한 이미지 개수
  document.getElementById("imgNum").value = parseInt(imgNum); // 업로드 이미지 수 업뎃

  // img 태그 생성
  var img = document.createElement("img");
  img.id = "img" + String(imgNum);
  img.src = pre_img.src;
  img.width = pre_img.clientWidth;
  img.height = pre_img.clientWidth;
  img.style.display = "none";
  document.getElementById("canvasImg").appendChild(img);

  // img weight 태그 생성
  var imgW = document.createElement("input");
  imgW.name = "attr" + String(imgNum) + "[]";
  imgW.value = pre_img.clientWidth;
  img.style.display = "none";
  document.getElementById("canvasImgW").appendChild(imgW);

  // img height 태그 생성
  var imgH = document.createElement("input");
  imgH.name = "attr" + String(imgNum) + "[]";
  imgH.value = pre_img.clientHeight;
  img.style.display = "none";
  document.getElementById("canvasImgH").appendChild(imgH);

  // option 태그 생성
  var opt = document.createElement("option");
  opt.id = "img" + String(imgNum) + "O";
  opt.selected = true;
  opt.innerText = document.getElementById("fileName").textContent;
  document.getElementById("selectImg").appendChild(opt);

  // img x 좌표 태그 생성
  var imgX = document.createElement("input");
  imgX.name = "attr" + String(imgNum) + "[]";
  imgX.value = x;
  imgX.style.display = "none"
  document.getElementById("canvasImgX").appendChild(imgX);

  // img y 좌표 태그 생성
  var imgY = document.createElement("input");
  imgY.name = "attr" + String(imgNum) + "[]";
  imgY.value = y;
  imgY.style.display = "none";
  document.getElementById("canvasImgY").appendChild(imgY);

  // 다음 label 
  document.getElementById("label" + String(imgNum)).style.display = "none";
  document.getElementById("label" + String(imgNum + 1)).style.display = "block";


  // form 동적 태그 생성
  // var fileForm = document.getElementById("forms");
  // fileForm.innerHTML += '<label id="label' + String(imgNum + 1) + '" for="chooseFile' + String(imgNum + 1) + '">불러오기</label><input type ="file" id="chooseFile'
  //   + String(imgNum + 1) + '" name="img' + String(img_cnt + 1) + '" accept="image/*" onchange="loadFile(this)"/>';

  totalCanvas()

  // 미리보기 이미지 파트 리셋
  document.getElementById("fileName").textContent = null;
  pre_img.src = ""; // 이미지 src 데이터 해제
  pre_img.style.visibility = "hidden"; // 미리보기 이미지 숨기기

  document.getElementById("imgSubmit").disabled = true; // 업로드 버튼 비활성화
}

document.getElementById("plus").onclick = function () { // 이미지 크기 확대

  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
  var width = img.width;
  var height = img.height;

  var resizeWidth = width * 1.1;
  var resizeHeight = height * 1.1;

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

  document.getElementById("canvasImgW").childNodes.item(slt).value = resizeWidth;
  document.getElementById("canvasImgH").childNodes.item(slt).value = resizeHeight;

  totalCanvas();
}

document.getElementById("minus").onclick = function () { // 이미지 크기 축소

  var slt = document.getElementById("selectImg").selectedIndex;
  var img = document.getElementById("canvasImg").childNodes.item(slt);
  var width = img.width;
  var height = img.height;

  var resizeWidth = width * 0.9;
  var resizeHeight = height * 0.9;

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

  document.getElementById("canvasImgW").childNodes.item(slt).value = parseInt(resizeWidth);
  document.getElementById("canvasImgH").childNodes.item(slt).value = parseInt(resizeHeight);

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

document.getElementById("delImg").onclick = function () { // 이미지 삭제



  // 이미지 변경으로 기능 변경! - 선택안함 or 사진 다른 거 가져오기 ok?

  var slt = document.getElementById("selectImg").selectedIndex;

  var opt = document.getElementById("selectImg").childNodes.item(slt);
  opt.parentNode.removeChild(opt); // 옵션 삭제

  var img = document.getElementById("canvasImg").childNodes.item(slt);
  img.parentNode.removeChild(img); // 이미지 삭제

  var imgX = document.getElementById("canvasImgX").childNodes.item(slt);
  imgX.parentNode.removeChild(imgX); // 이미지 x 좌표 삭제

  var imgY = document.getElementById("canvasImgY").childNodes.item(slt);
  imgY.parentNode.removeChild(imgY); // 이미지 y 좌표 삭제

  var imgW = document.getElementById("canvasImgW").childNodes.item(slt);
  imgW.parentNode.removeChild(imgW);

  var imgH = document.getElementById("canvasImgH").childNodes.item(slt);
  imgH.parentNode.removeChild(imgH);

  // input type=file img(slt+1) 태그 삭제

  totalCanvas();

  document.getElementById("checkImg").childNodes.item(slt).value = parseInt(0);
}



// hashtag - 해시태그 입력칸 나타내기
function hashtagingClick() {
  var div = document.getElementById("hashtagingDiv");

  if (div.style.display == 'none') { div.style.display = 'block'; }
  else { div.style.display = 'none'; }
}

// hashtag - 해시태그를 입력하세요 확인 버튼 클릭
function hashtagingOk() {
  var input = document.getElementById("hashtagInput").value;
  if (input) {
    var tag = document.getElementById("hashtagForm")
    tag.innerHTML += `<p>#${input}</p>`;
    // innerHTML 하고 input 값 비우기
    // input에서 엔터하면 submit으로 넘어가는 거 막기
  }
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

function testCanvas() {

  var imgBase64 = canvas.toDataURL(`image/png`);

  // console.log(imgBase64);
  var decodImg = atob(imgBase64.split(',')[1]);

  let array = [];
  for (let i = 0; i < decodImg.length; i++) {
    array.push(decodImg.charCodeAt(i));
  }

  var canvasFile = new Blob([new Uint8Array(array)], { type: 'image/png' });
  var canvasFileName = 'canvas_img_' + new Date().getMilliseconds() + '.png';

  console.log(canvasFile);

  const url = window.URL.createObjectURL(canvasFile);
  document.getElementById("test").src = url;

  // window.URL.revokeObjectURL(url); // 할당 해제

  let formData = new FormData();
  formData['canvas_file'] = canvasFile;
  formData['canvas_name'] = canvasFileName;

  console.log(formData);

  $.ajax({
    type: 'post',
    url: '{% url "diary:decorate" %}',
    cache: false,
    data: { canvas_file: canvasFile },
    processData: false,
    contentType: false,
    success: function (data) {
      alert('Upload Success');
    },
    error: function () {
      alert("fail");
    }
  });

  alert("ajax 후");
}


/////////////////////////////////////////////////////////
function saveCanvasImg() {

  var imgBase64 = canvas.toDataURL(`image/png`);
  // console.log(imgBase64);
  var decodImg = atob(imgBase64.split(',')[1]);

  let array = [];
  for (let i = 0; i < decodImg.length; i++) {
    array.push(decodImg.charCodeAt(i));
  }

  var canvasFile = new Blob([new Uint8Array(array)], { type: 'image/png' });
  var canvasFileName = 'canvas_img_' + new Date().getMilliseconds() + '.png';
  let formData = new FormData();
  formData.append('canvas_file', canvasFile);
  formData.append('canvas_name', canvasFileName);

  console.log(formData);

  alert(formData);

  $.ajax({
    type: 'post',
    url: '{% url "diary:decorate" %}',
    cache: false,
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      alert('Upload Success');
    },
    error: function () {
      alert("fail");
    }
  });

  alert("ajax 후");
}
//////////////////////////////////////////////////////////