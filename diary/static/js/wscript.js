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

// 폰트 초기값
var selected_Font = document.getElementById("fontSelect");
var font = selected_Font.options[selected_Font.selectedIndex].value;


canvas.onclick = function (event) { // canvas 클릭 위치 받아오기
  x = event.clientX - ctx.canvas.offsetLeft - 10;
  y = event.clientY - ctx.canvas.offsetTop - 45;

  // html에 value 전달
  document.getElementById("coordinateX").value = parseInt(x);
  document.getElementById("coordinateY").value = parseInt(y);
}

UserInput.oninput = function () { // 텍스트 내용 받아오기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  font = selected_Font.options[selected_Font.selectedIndex].value; // select font 적용
  document.getElementById("font").value = font; // font value html 전달 (DB 저장용)

  var font_size = document.getElementById("fontSize").value; // 폰트 크기 가져오기
  ctx.font = font_size + "px " + font;

  // canvas에 text 값 출력
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