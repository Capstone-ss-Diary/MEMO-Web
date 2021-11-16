var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var text_x = ctx.canvas.offsetLeft + 10;
var text_y = ctx.canvas.offsetTop + 10;
var imgNum = 0;
var img_cnt = 0; // 업로드한 이미지 개수

document.getElementById("coordinateX").value = ctx.canvas.offsetLeft + 10; // 텍스트 x 좌표 input 저장
document.getElementById("coordinateY").value = ctx.canvas.offsetTop + 10; // 텍스트 y 좌표 input 저장



function totalCanvas() { // 캔버스 정보
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
  var currentY = text_y;

  ctx.textBaseline = "top"

  for (var i = 0; i < text.length; i++) {
    var tempLine = line + text[i];
    var tempWidth = text_x + ctx.measureText(tempLine).width;

    if (tempWidth < canvas.width && text[i] != "\n") {
      line = tempLine;
    }
    else {
      ctx.fillText(line, text_x, currentY);

      if (text[i] != "\n") line = text[i];
      else line = "";

      currentY += fontSize * (1.2);
    }
  }
  ctx.fillText(line, document.getElementById("coordinateX").value, currentY);
}