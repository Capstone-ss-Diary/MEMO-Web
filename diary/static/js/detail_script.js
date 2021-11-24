var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var text = document.getElementById("content").value;
var font = document.getElementById("font").value;
var font_size = document.getElementById("font_size").value;
var font_color = document.getElementById("font_color").value;
var text_x = document.getElementById("text_x").value;
var text_y = document.getElementById("text_y").value;

text_x = parseInt(text_x);
text_y = parseInt(text_y);

ctx.font = font_size + "px " + font;
ctx.fillStyle = font_color;

var line = "";
var fontSize = parseFloat(ctx.font);
var currentY = text_y;

ctx.textBaseline = "top"

for (var i = 0; i < text.length; i++) {

  var tempLine = line + text[i];
  var tempWidth = text_x + ctx.measureText(tempLine).width;

  if (tempWidth < canvas.width && text[i] != "\n") { line = tempLine; }
  else {
    ctx.fillText(line, text_x, currentY);
    if (text[i] != "\n") line = text[i];
    else line = "";
    currentY += fontSize * (1.2);
  }

}

ctx.fillText(line, text_x, currentY);

var image_num = document.getElementById("images").childElementCount;

if (image_num > 0) {
  var images = document.getElementById("images").children;
  var image_x = document.getElementById("image_x").childNodes;
  var image_y = document.getElementById("image_y").childNodes;
  var degree = document.getElementById("degree").childNodes;

  for (var i = 0; i < image_num; i++) {

    var img = images.item(i);
    var degree = degree.item(i).value;

    var x = parseInt(image_x.item(i).value) + (img.width / 2);
    var y = parseInt(image_y.item(i).value) + (img.height / 2);

    ctx.save();
    ctx.translate(parseInt(x), parseInt(y));
    ctx.rotate(degree * Math.PI / 180);
    ctx.translate((-1) * parseInt(x), (-1) * parseInt(y));
    ctx.drawImage(img, image_x.item(i).value, image_y.item(i).value, img.width, img.height);
    ctx.restore();

  }

}

var encode_data = canvas.toDataURL('image/png');

encode_data = encode_data.split(',')[1];

var decode_data = atob(encode_data);
var data = [];

for (var i = 0; i < decode_data.length; i++) {
  data.push(decode_data.charCodeAt(i));
}

var blob = new Blob([new Uint8Array(data)], { type: 'image/png' });
var url = window.URL.createObjectURL(blob);

setTimeout(function () {
  document.getElementById("diary_canvas").src = url;
}, 1000);