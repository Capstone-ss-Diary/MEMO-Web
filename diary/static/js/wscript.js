var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

// 텍스트 내용
var UserInput = document.getElementById("UserInput");

// canvas 글 위치 초기값
var x = ctx.canvas.offsetLeft;
var y = ctx.canvas.offsetTop + 10;

// html에 coordinate value 전달 (DB 저장용)
document.getElementById("coordinateX").value = parseInt(x);
document.getElementById("coordinateY").value = parseInt(y);

// canvas에 text 값 출력
function writingText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

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

// canvas 클릭 위치 받아오기
canvas.onclick = function (event) {
  x = event.clientX - ctx.canvas.offsetLeft - 10;
  y = event.clientY - ctx.canvas.offsetTop - 45;

  // html에 value 전달
  document.getElementById("coordinateX").value = parseInt(x);
  document.getElementById("coordinateY").value = parseInt(y);

  // 위치 새로 지정하면 새로 출력
  writingText();
}

// 텍스트 내용 변하면 출력
UserInput.oninput = function () {
  writingText();
}

// rgb 입력칸 나타내기
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