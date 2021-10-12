
var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");
var UserInput = document.getElementById("UserInput");

let x = ctx.canvas.offsetLeft;
let y = ctx.canvas.offsetTop + 10;

canvas.onclick = function (event) {
  x = event.clientX - ctx.canvas.offsetLeft - 10;
  y = event.clientY - ctx.canvas.offsetTop - 45;
}

UserInput.oninput = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.font = "18px Arial";

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