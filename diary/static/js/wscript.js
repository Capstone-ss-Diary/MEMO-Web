var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var UserInput = document.getElementById("UserInput");

var x = ctx.canvas.offsetLeft;
var y = ctx.canvas.offsetTop + 10;

var selected_Font = document.getElementById("fontSelect");
var font = selected_Font.options[selected_Font.selectedIndex].value;

document.getElementById("coordinateX").value = parseInt(x);
document.getElementById("coordinateY").value = parseInt(y);

canvas.onclick = function (event) {
  x = event.clientX - ctx.canvas.offsetLeft - 10;
  y = event.clientY - ctx.canvas.offsetTop - 45;

  document.getElementById("coordinateX").value = parseInt(x);
  document.getElementById("coordinateY").value = parseInt(y);
}

UserInput.oninput = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  font = selected_Font.options[selected_Font.selectedIndex].value;
  document.getElementById("font").value = font;

  ctx.font = "18px " + font;

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