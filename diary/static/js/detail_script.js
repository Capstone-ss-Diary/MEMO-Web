var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var hand_inputs = document.getElementById("hand_inputs");
console.log(hand_inputs);
var hand_num = hand_inputs.childElementCount;
console.log(hand_num);
for (var i = 0; i < hand_num; i++) {
  // var hand_input = document.getElementById("hand_inputs").childNodes.item(i);
  console.log(document.getElementById("hand_inputs").childNodes.item(i));
  // document.getElementById("hand-writings").innerHTML += `<div class="hand-writing" id="hand-writing${i + 1}>${hand_input}</div>`;
}



var text_num = document.getElementById("content").childElementCount;

if (text_num > 0) {
  var content = document.getElementById("content").childNodes;
  var text_font = document.getElementById("font").childNodes;
  var text_font_size = document.getElementById("font_size").childNodes;
  var text_font_color = document.getElementById("font_color").childNodes;
  var coordinate_x = document.getElementById("text_x").childNodes;
  var coordinate_y = document.getElementById("text_y").childNodes;

  for (var j = 0; j < text_num; j++) {
    var text = content.item(j).value;
    var font = text_font.item(j).value;
    var font_size = text_font_size.item(j).value;
    var font_color = text_font_color.item(j).value;
    var text_x = coordinate_x.item(j).value;
    var text_y = coordinate_y.item(j).value;

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
  }
}

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

var remove_num = document.getElementById("remove_images").childElementCount;

if (remove_num > 0) {
  var images = document.getElementById("remove_images").children;
  var remove_x = document.getElementById("remove_x").childNodes;
  var remove_y = document.getElementById("remove_y").childNodes;
  var remove_degree = document.getElementById("remove_degree").childNodes;

  for (var i = 0; i < remove_num; i++) {

    var rm = images.item(i);
    console.log(rm);
    var rm_degree = remove_degree.item(i).value;

    var x = parseInt(remove_x.item(i).value) + (rm.width / 2);
    var y = parseInt(remove_y.item(i).value) + (rm.height / 2);

    ctx.save();
    ctx.translate(parseInt(x), parseInt(y));
    ctx.rotate(rm_degree * Math.PI / 180);
    ctx.translate((-1) * parseInt(x), (-1) * parseInt(y));
    ctx.drawImage(rm, remove_x.item(i).value, remove_y.item(i).value, rm.width, rm.height);
    ctx.restore();

  }

}

var sticker_num = document.getElementById("stickers").childElementCount;

if (sticker_num > 0) {
  var stickers = document.getElementById("stickers").children;
  var sticker_x = document.getElementById("sticker_x").childNodes;
  var sticker_y = document.getElementById("sticker_y").childNodes;

  for (var i = 0; i < sticker_num; i++) {

    var sti = stickers.item(i);

    // var x = parseInt(sticker_x.item(i).value) + (sti.width / 2);
    // var y = parseInt(sticker_y.item(i).value) + (sti.height / 2);

    ctx.drawImage(sti, sticker_x.item(i).value, sticker_y.item(i).value, sti.width, sti.height);

  }
}


setTimeout(function () {
  var encode_data = canvas.toDataURL('image/png');

  encode_data = encode_data.split(',')[1];

  var decode_data = atob(encode_data);
  var data = [];

  for (var i = 0; i < decode_data.length; i++) {
    data.push(decode_data.charCodeAt(i));
  }

  var blob = new Blob([new Uint8Array(data)], { type: 'image/png' });
  var url = window.URL.createObjectURL(blob);

  var bc = document.getElementById("bc").value;

  document.getElementById("diary_canvas").src = url;
  document.getElementById("diary_canvas").style.backgroundColor = bc;

  document.getElementById("edit").style.display = "block";
  document.getElementById("check").style.display = "block";

}, 1000);