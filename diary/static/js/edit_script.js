var canvas = document.getElementById("paper");
var ctx = canvas.getContext("2d");

var text_x = ctx.canvas.offsetLeft + 10;
var text_y = ctx.canvas.offsetTop + 10;

function writingText() {
  for (var i = 0; i < 6; i++) {
    var UserInput = document.getElementById(`UserInput${i + 1}`);

    if (UserInput.style.visibility == "visible") {
      // textarea
      var input_x = document.getElementById(`text_x${i + 1}`);
      var input_y = document.getElementById(`text_y${i + 1}`);
      var font = document.getElementById(`font${i + 1}`);
      var font_size = document.getElementById(`font_size${i + 1}`);
      var font_color = document.getElementById(`font_color${i + 1}`);

      // console.log(font);

      // select box
      var select_font = document.getElementById("fontSelect");
      var select_font_size = document.getElementById("fontSize");
      var r = document.getElementById("R").value;
      var g = document.getElementById("G").value;
      var b = document.getElementById("B").value;
      document.getElementById("setRGB").value = "rgb(" + r + "," + g + "," + b + ")";
      var select_font_color = document.getElementById("fontColorSelect");

      if (input_x.value == "") { input_x.value = text_x; }
      if (input_y.value == "") { input_y.value = text_y; }
      if (font.value == "") { font.value = select_font.options[select_font.selectedIndex].value; }
      if (font_size.value == "") { font_size.value = select_font_size.value; }
      if (font_color.value == "") { select_font_color.options[select_font_color.selectedIndex].value; }

      ctx.font = font_size.value + "px " + font.value;
      ctx.fillStyle = font_color.value;

      var text = UserInput.value;
      var line = "";
      var fontSize = parseFloat(ctx.font);
      var currentY = parseFloat(input_y.value);

      ctx.textBaseline = "top";

      if (font.value != "hand-writing") {
        for (var j = 0; j < text.length; j++) {
          var tempLine = line + text[j];
          var tempWidth = parseFloat(input_x.value) + ctx.measureText(tempLine).width;

          if (tempWidth < canvas.width && text[j] != "\n") line = tempLine;
          else {
            ctx.fillText(line, parseFloat(input_x.value), currentY);
            if (text[j] != "\n") line = text[j];
            else line = "";
            currentY += fontSize * (1.2);
          }
        }
        ctx.fillText(line, parseFloat(input_x.value), currentY);
      }

      else {
        for (var j = 0; j < text.length; j++) {
          line = line + text[j];
          document.getElementById(`hand-writing${i + 1}`).innerText = line;
          document.getElementById(`hand-writing${i + 1}`).style.top = currentY;
          document.getElementById(`hand-writing${i + 1}`).style.left = input_x.value;
          document.getElementById(`hand-writing${i + 1}`).style.color = font_color.value;
          document.getElementById(`hand-writing${i + 1}`).style.fontSize = font_size.value;
        }
      }
    }
  }
}

function drawingImg() {

  var canvasImg = document.getElementById("canvasImg");
  var canvasImgX = document.getElementById("canvasImgX");
  var canvasImgY = document.getElementById("canvasImgY");
  var canvasDegree = document.getElementById("degree");

  // 업로드 한 이미지기 1개 이상이면 출력
  if (canvasImg.childElementCount > 0) {
    var images = canvasImg.childNodes; // 업로드한 이미지 모두 불러오기
    var imagesX = canvasImgX.childNodes; // 이미지 x좌표 모두 불러오기
    var imagesY = canvasImgY.childNodes; // 이미지 y좌표 모두 불러오기
    var imagesD = canvasDegree.childNodes;

    for (var i = 0; i < images.length; i++) {
      var img = images.item(i);
      var degree = imagesD.item(i).value;

      var x = parseInt(imagesX.item(i).value) + (img.width / 2);
      var y = parseInt(imagesY.item(i).value) + (img.height / 2);

      ctx.save();
      ctx.translate(parseInt(x), parseInt(y));
      ctx.rotate(degree * Math.PI / 180);
      ctx.translate((-1) * parseInt(x), (-1) * parseInt(y));
      ctx.drawImage(img, imagesX.item(i).value, imagesY.item(i).value, img.width, img.height);
      ctx.restore();

    }

  }
}

function drawingSti() {

  var canvasImg = document.getElementById("canvasSti");
  var canvasImgX = document.getElementById("canvasStiX");
  var canvasImgY = document.getElementById("canvasStiY");

  // console.log(canvasImg.childElementCount);

  // 업로드 한 이미지기 1개 이상이면 출력
  if (canvasImg.childElementCount > 0) {
    var images = canvasImg.childNodes; // 업로드한 이미지 모두 불러오기
    var imagesX = canvasImgX.childNodes; // 이미지 x좌표 모두 불러오기
    var imagesY = canvasImgY.childNodes; // 이미지 y좌표 모두 불러오기

    for (var i = 0; i < images.length; i++) {
      var img = images.item(i);

      var x = parseInt(imagesX.item(i).value) + (img.width / 2);
      var y = parseInt(imagesY.item(i).value) + (img.height / 2);

      // ctx.save();
      ctx.drawImage(img, imagesX.item(i).value, imagesY.item(i).value, img.width, img.height);
      // ctx.restore();

    }

  }
}

function totalCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  writingText(); // 일기작성 상태 불러오기
  drawingImg(); // 사진업로드 상태 불러오기
  drawingSti(); // 스티커 업로드 상태 불러오기
}

function backchange(back_color) {

  totalCanvas();
  document.getElementById("paper").style.backgroundColor = back_color;
  document.getElementById("back_color").value = back_color;
}


var text_append_num = 2;
var hash_num = 1;

// 텍스트 불러오기
var text_num = document.getElementById("content").childElementCount;
document.getElementById("text_num").value = parseInt(text_num);
console.log(document.getElementById("text_num").value);

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

    document.getElementById(`UserInput${j+1}`).innerText += text;
    document.getElementById(`UserInput${j+1}`).style.visibility = "visible";
    document.getElementById(`text_x${j+1}`).value = text_x;
    document.getElementById(`text_y${j+1}`).value = text_y;
    document.getElementById(`font${j+1}`).value = font;
    document.getElementById(`font_size${j+1}`).value = font_size;
    document.getElementById(`font_color${j+1}`).value = font_color;

    if(j>0){
      var select = document.querySelector("#UserInput_select");
      var option = document.createElement('option');
      option.innerText = `텍스트${j+1}`;
      select.append(option);
      select[text_append_num - 1].selected = true;
      text_append_num += 1
    }
  }
}

var imgNum = 0; // 업로드한 이미지 개수
var image_num = document.getElementById("images").childElementCount + document.getElementById("remove_images").childElementCount; // 이미지 개수
document.getElementById("image_num1").value = document.getElementById("images").childElementCount;
document.getElementById("image_num2").value = document.getElementById("remove_images").childElementCount;
if(image_num>0){
  if(document.getElementById("remove_images").childElementCount>0){
    imgNum += 1;
    document.getElementById("imgNum").value = parseInt(imgNum); // 업로드 이미지 수 업뎃

    var images = document.getElementById("remove_images").children;
    var img_xs = document.getElementById("remove_x").childNodes;
    var img_ys = document.getElementById("remove_y").childNodes;
    var degrees = document.getElementById("remove_degree").childNodes;

    for(var j=0; j<document.getElementById("remove_images").childElementCount; j++){
      var image = images.item(j);
      var img_x = img_xs.item(j).value;
      var img_y = img_ys.item(j).value;
      var degree = degrees.item(j).value;

      image.style.display = "none";
      document.getElementById("canvasImg").appendChild(image);
      document.getElementById("canvasImgW").innerHTML += `<input name="attr${String(imgNum)}[]" value="${image.width}" style="display: none;" />`;
      document.getElementById("canvasImgH").innerHTML += `<input name="attr${String(imgNum)}[]" value="${image.height}" style="display: none;" />`;
      document.getElementById("canvasImgX").innerHTML += `<input name="attr${String(imgNum)}[]" value="${img_x}" style="display: none;" />`;
      document.getElementById("canvasImgY").innerHTML += `<input name="attr${String(imgNum)}[]" value="${img_y}" style="display: none;" />`;
      document.getElementById("degree").innerHTML += `<input name="attr${String(imgNum)}[]" value="${degree}" style="display: none;" />`;

      var title = image.src.split('/');
      console.log(title);
      document.getElementById("selectImg").innerHTML += `<option selected id="img${String(imgNum)}O">${title[title.length-1]}</option>`;

      // 다음 label 
      document.getElementById(`label${String(imgNum)}`).style.display = "none";
      document.getElementById(`label${String(imgNum + 1)}`).style.display = "block";
    }
  }

  if(document.getElementById("images").childElementCount>0){
    imgNum += 1;
    document.getElementById("imgNum").value = parseInt(imgNum); // 업로드 이미지 수 업뎃

    var images = document.getElementById("images").children;
    var img_xs = document.getElementById("image_x").childNodes;
    var img_ys = document.getElementById("image_y").childNodes;
    var degrees = document.getElementById("degrees").childNodes;

    for(var j=0; j<document.getElementById("images").childElementCount; j++){
      var image = images.item(j);
      var img_x = img_xs.item(j).value;
      var img_y = img_ys.item(j).value;
      var degree = degrees.item(j).value;

      image.style.display = "none";
      document.getElementById("canvasImg").appendChild(image);
      document.getElementById("canvasImgW").innerHTML += `<input name="attr${String(imgNum)}[]" value="${image.width}" style="display: none;" />`;
      document.getElementById("canvasImgH").innerHTML += `<input name="attr${String(imgNum)}[]" value="${image.height}" style="display: none;" />`;
      document.getElementById("canvasImgX").innerHTML += `<input name="attr${String(imgNum)}[]" value="${img_x}" style="display: none;" />`;
      document.getElementById("canvasImgY").innerHTML += `<input name="attr${String(imgNum)}[]" value="${img_y}" style="display: none;" />`;
      document.getElementById("degree").innerHTML += `<input name="attr${String(imgNum)}[]" value="${degree}" style="display: none;" />`;

      var title = image.src.split('/');
      console.log(title);
      document.getElementById("selectImg").innerHTML += `<option selected id="img${String(imgNum)}O">${title[title.length-1]}</option>`;

      // 다음 label 
      document.getElementById(`label${String(imgNum)}`).style.display = "none";
      document.getElementById(`label${String(imgNum + 1)}`).style.display = "block";
    }
  }
}

var stiNum = 0;
var sticker_select_num = 0;
var sticker_num = document.getElementById("stickers").childElementCount;
document.getElementById("sticker_num").value = sticker_num;
if(sticker_num>0){
  stiNum += 1;
  document.getElementById("stiNum").value = parseInt(stiNum); // 업로드 이미지 수 업뎃

  var stickers = document.getElementById("stickers").children;
  var sti_xs = document.getElementById("sticker_x").childNodes;
  var sti_ys = document.getElementById("sticker_y").childNodes;

  for(var j=0; j<sticker_num; j++){
    var sticker = stickers.item(j);
    var sti_x = sti_xs.item(j).value;
    var sti_y = sti_ys.item(j).value;

    console.log(`sticker${String(stiNum)}`);

    sticker.style.display = "none";
    document.getElementById("canvasSti").appendChild(sticker);
    document.getElementById("sticker_url").innerHTML += `<input id="sticker${String(stiNum)}" name="sti${String(stiNum)}" value="${sticker.src}">`;
    document.getElementById("canvasStiW").innerHTML += `<input name="aticker${String(stiNum)}[]" value="${sticker.width}" style="display: none;" />`;
    document.getElementById("canvasStiH").innerHTML += `<input name="aticker${String(stiNum)}[]" value="${sticker.height}" style="display: none;" />`;
    document.getElementById("canvasStiX").innerHTML += `<input name="aticker${String(stiNum)}[]" value="${sti_x}" style="display: none;" />`;
    document.getElementById("canvasStiY").innerHTML += `<input name="aticker${String(stiNum)}[]" value="${sti_y}" style="display: none;" />`;

    sticker_select_num = parseInt(sticker_select_num) + 1;

    document.getElementById("sticker_select").innerHTML += `<option selected id="gif${String(sticker_select_num)}">${String(imgNum)}</option>`;


  }

}

backchange(document.getElementById("bc").value);


var hashtag_num = document.getElementById("hashtags").childElementCount;
if (hashtag_num > 0) {
  var hashtag = document.getElementById("hashtags").childNodes;
  for (var j = 0; j < hashtag_num; j++) {
    var input = hashtag.item(j).value;
    var tag = document.getElementById("hashtagForm");
    tag.innerHTML += `<a id="hash${hash_num}" style="font-size: 22px;">#${input}</a><button type="button" value="${hash_num}" onclick="hashtag_delete(this)">X</button><br id="br${hash_num}">`;

    var tag_input = document.getElementById("hash_input");
    tag_input.innerHTML += `<input value="${input}" id="hashtag${hash_num}" name="hashtag${hash_num}">`;

    document.getElementById("hashtagInput").value = "";
    document.getElementById("hashtag_num").value = parseInt(hash_num);

    hash_num += 1
  }
}



function font_selected_change(font_selected) {
  var text_i = document.getElementById("UserInput_select").selectedIndex;
  var font = document.getElementById(`font${text_i + 1}`);
  font.value = font_selected.options[font_selected.selectedIndex].value;
  totalCanvas();
}

function font_size_selected_change(size_selected) {
  var text_i = document.getElementById("UserInput_select").selectedIndex;
  var font_size = document.getElementById(`font_size${text_i + 1}`);
  font_size.value = size_selected.value;
  console.log(font_size.value);
  totalCanvas();
}

function font_color_selected_change(color_selected) {
  var text_i = document.getElementById("UserInput_select").selectedIndex;
  var font_color = document.getElementById(`font_color${text_i + 1}`);
  font_color.value = color_selected.options[color_selected.selectedIndex].value;
  totalCanvas();
}

var text_append_num = 2;
document.getElementById("text_append").onclick = function () {
  if (text_append_num > 6) { alert("텍스트 박스는 6개 제한입니다."); }
  else {
    var input_id = `UserInput${text_append_num}`;
    document.getElementById(input_id).style.visibility = "visible";

    var select = document.querySelector("#UserInput_select");
    var option = document.createElement('option');
    option.innerText = `텍스트${text_append_num}`;
    select.append(option);
    select[text_append_num - 1].selected = true;

    text_append_num += 1;
  }

}

document.getElementById("text_delete").onclick = function () {
  var input_id = document.getElementById("UserInput_select").selectedIndex;
  var input = document.getElementById(`UserInput${input_id + 1}`);
  input.value = "";
  var select = document.querySelector("#UserInput_select");
  select[input_id - 1].selected = true;

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


function validateName(fname) { // 파일이름으로 확장자 체크하는 함수
  var extensions = ['jpeg', 'jpg', 'png', 'PNG']; // 허용되는 확장자
  var fparts = fname.split('.');
  var fext = '';
  var validated = false; // 유효성

  if (fparts.length > 1) { fext = fparts[fparts.length - 1]; } // 확장자명

  if (fext != '') {
    extensions.forEach(function (ext) {
      if (ext == fext) { validated = true; } // 허용되는 확장자면 유효성 주기
    });
  }

  return validated; // 허용되는 확장자이면 true, 아니면 false
}

var img_cnt = 0; // 업로드한 이미지 개수

function loadFile(input) { // 이미지 불러오면 미리보기 이미지 업로드
  var file = input.files[0]; // 파일 가져오기
  document.getElementById("pre_img_name").value = file.name;
  document.getElementById("pre_img_id").value = input.id;

  if (validateName(file.name)) { // 허용된 확장자명이면
    document.getElementById("fileName").textContent = file.name; // 파일명 넣기

    var photo = document.querySelector(".image"); // 미리보기 이미지
    photo.src = URL.createObjectURL(file); // 파일 객체에서 이미지 데이터 가져오기
    photo.style.visibility = "visible"; // div에 이미지 미리 보여주기

    img_cnt += 1; // 이미지 수
    document.getElementById("img_count").value = img_cnt;

    document.getElementById("background_remove").disabled = false;
    document.getElementById("imgSubmit").disabled = false; // 업로드 버튼 활성화
  }
  else alert("잘못된 확장자입니다.\n이미지 파일을 넣어주세요 (jpeg/jpg/png)");
}

var removes = "";
var rmImages = "";

document.getElementById("imgSubmit").onclick = function () { // canvas에 이미지 올리기
  var pre_img = document.querySelector(".image"); // 미리보기 이미지 불러오기
  imgNum += 1;
  document.getElementById("imgNum").value = parseInt(imgNum); // 업로드 이미지 수 업뎃

  // img 태그 생성
  var img = document.createElement("img");
  img.id = `img${String(imgNum)}`;
  img.src = pre_img.src;
  img.width = pre_img.clientWidth;
  img.height = pre_img.clientHeight;
  img.style.display = "none";
  document.getElementById("canvasImg").appendChild(img);

  // img weight 태그 생성
  var imgW = document.createElement("input");
  imgW.name = `attr${String(imgNum)}[]`;
  imgW.value = pre_img.clientWidth;
  img.style.display = "none";
  document.getElementById("canvasImgW").appendChild(imgW);

  // img height 태그 생성
  var imgH = document.createElement("input");
  imgH.name = `attr${String(imgNum)}[]`;
  imgH.value = pre_img.clientHeight;
  img.style.display = "none";
  document.getElementById("canvasImgH").appendChild(imgH);

  // option 태그 생성
  var opt = document.createElement("option");
  opt.id = `img${String(imgNum)}O`;
  opt.selected = true;
  opt.innerText = document.getElementById("fileName").textContent;
  document.getElementById("selectImg").appendChild(opt);

  // img x 좌표 태그 생성
  var imgX = document.createElement("input");
  imgX.name = `attr${String(imgNum)}[]`;
  imgX.value = text_x;
  imgX.style.display = "none"
  document.getElementById("canvasImgX").appendChild(imgX);

  // img y 좌표 태그 생성
  var imgY = document.createElement("input");
  imgY.name = `attr${String(imgNum)}[]`;
  imgY.value = text_y;
  imgY.style.display = "none";
  document.getElementById("canvasImgY").appendChild(imgY);

  // 이미지 기울기
  var degree = document.createElement("input");
  degree.name = `attr${String(imgNum)}[]`;
  degree.value = 0;
  degree.style.display = "none";
  document.getElementById("degree").appendChild(degree);

  // 다음 label 
  document.getElementById(`label${String(imgNum)}`).style.display = "none";
  document.getElementById(`label${String(imgNum + 1)}`).style.display = "block";

  totalCanvas()

  var pre_file_name = document.getElementById("pre_img_name").value;
  var rm_file_name = document.getElementById("remove_name").value;
  var rm_file_id = document.getElementById("pre_img_id").value;

  console.log(document.getElementById("pre_img_name"));

  if (pre_file_name == rm_file_name) {
    // console.log(rm_file_name);
    // console.log(rm_file_name);

    var file_name = document.getElementById(rm_file_id).name;
    removes += `${file_name}/`;
    document.getElementById("remove_list").value = removes;
    rmImages += `${rm_file_name}/`;
    document.getElementById("name_list").value = rmImages;
    // console.log(removes);
    // console.log(document.getElementById("remove_list").value);
  }

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

document.getElementById("leftRotate").onclick = function () {
  var slt = document.getElementById("selectImg").selectedIndex;
  var degree = document.getElementById("degree").childNodes.item(slt).value;
  degree -= 10;
  document.getElementById("degree").childNodes.item(slt).value = parseInt(degree);

  console.log(degree);

  totalCanvas();
}

document.getElementById("rightRotate").onclick = function () {
  var slt = document.getElementById("selectImg").selectedIndex;
  var degree = parseInt(document.getElementById("degree").childNodes.item(slt).value);
  degree += 10;
  document.getElementById("degree").childNodes.item(slt).value = parseInt(degree);

  console.log(degree);

  totalCanvas();
}

var img_tag_num = 30;
document.getElementById("delImg").onclick = function () { // 이미지 삭제 및 변경 기능 (수정 많이 필요)

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

  var degree = document.getElementById("degree").childNodes.item(slt);
  degree.parentNode.removeChild(degree);

  var file = document.getElementById(`chooseFile${slt + 1}`);
  var form = document.getElementById("forms");
  form.removeChild(file);

  img_tag_num += 1

  form.innerHTML += `<label id="label${img_tag_num}" for="chooseFile${img_tag_num}"> 불러오기</label>
  <input type="file" id="chooseFile${img_tag_num}" name="img${img_tag_num}" accept="image/*" onchange="loadFile(this)">`;


  console.log(form);

  // input type=file img(slt+1) 태그 삭제

  totalCanvas();

  document.getElementById("checkImg").childNodes.item(slt).value = parseInt(0);
}


function hashtagingClick() { // hashtag - 해시태그 입력칸 나타내기
  var div = document.getElementById("hashtagingDiv");
  if (div.style.display == 'none') { div.style.display = 'block'; }
  else { div.style.display = 'none'; }
}


function hashtagingOk() { // hashtag - 해시태그를 입력하세요 확인 버튼 클릭
  if (document.getElementById("hashtagForm").childElementCount >= 40) {
    alert("해시태그는 10개까지 가능합니다.");
  }

  var input = document.getElementById("hashtagInput").value;
  if (input) {
    var tag = document.getElementById("hashtagForm");
    tag.innerHTML += `<a id="hash${hash_num}" style="font-size: 22px;">#${input}</a><button type="button" value="${hash_num}" onclick="hashtag_delete(this)">X</button><br id="br${hash_num}">`;

    var tag_input = document.getElementById("hash_input");
    tag_input.innerHTML += `<input value="${input}" id="hashtag${hash_num}" name="hashtag${hash_num}">`;

    document.getElementById("hashtagInput").value = "";
    document.getElementById("hashtag_num").value = parseInt(hash_num);

    hash_num += 1
  }

}

function hashtag_delete(button) {
  var num = button.value;
  var hashtag = document.getElementById(`hash${num}`);
  var hash_input = document.getElementById(`hashtag${num}`);
  var hash_br = document.getElementById(`br${num}`);
  hashtag.parentNode.removeChild(hashtag);
  hash_input.value = "";
  hash_br.parentNode.removeChild(hash_br);
  button.parentNode.removeChild(button);
}

document.getElementById("hashtagInput").addEventListener("keydown", event => {
  if (event.code == "Enter") {
    event.preventDefault();
    alert("확인 버튼을 클릭하세요.");
  }
})

document.getElementById("hashtag_auto").onclick = function () {
  var formData = new FormData();
  var input_num = 0;
  var tag_num = document.getElementById("hashtagForm").childElementCount;

  for (var i = 0; i < 6; i++) {
    var input = document.getElementById(`UserInput${i + 1}`).value;
    if (input != "") {
      formData.append('text', String(input));
      input_num += 1;
    }
  }

  var data = { 'text': formData.getAll('text') };

  console.log(input_num);

  if (input_num == 0) {
    alert("먼저 텍스트를 작성해주세요.");
  }
  else {
    $.ajax({
      type: 'post',
      url: '/diary/hashtag/',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false,
      success: function (data) {
        alert('해시태그가 생성되었습니다.');

        if (typeof (data) != "undefined") {
          var hashtag = data;

          if (Array.isArray(hashtag) && hashtag.length === 0) {
            alert("해시태그 생성 실패");
          }
          else {
            $.each(data, function (index, item) {
              if (tag_num < 40) {
                $("#hashtagForm").append(`<a id="hash${hash_num}" style="font-size: 22px;">#${item.keyword}</a><button type="button" value="${hash_num}" onclick="hashtag_delete(this)">X</button><br id="br${hash_num}">`);
                $("#hash_input").append(`<input value="${item.keyword}" id="hashtag${hash_num}" name="hashtag${hash_num}">`);
                hash_num += 1;
                document.getElementById("hashtag_num").value = parseInt(hash_num);
                tag_num += 2;
              }
              else {
                alert("해시태그는 10개까지 가능합니다.");
              }

            })
          }
        }
      },
      error: function (err) {
        alert("글이 너무 간결해서 해시태그를 생성할 수 없습니다.");
      }
    });

    document.getElementById("hashtag_num").value = parseInt(hash_num - 1);
  }

}

document.getElementById("background_remove").onclick = function () {
  // var image_src = document.getElementById("image").src;

  // console.log(image_src);
  // var image_data = { 'image': image_src };

  var image_name = document.getElementById("pre_img_name").value;
  console.log(document.getElementById("pre_img_id").value);

  var image_data = { 'image': image_name };


  if (image_name == "") {
    alert("먼저 이미지를 불러와 주세요.");
  }
  else {
    $.ajax({
      type: 'post',
      url: '/diary/remove/',
      data: JSON.stringify(image_data),
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false,
      success: function (data) {
        alert("이미지 배경이 제거되었습니다.");
        console.log(data.path);
        console.log(document.getElementById("image"));
        document.getElementById("image").src = `/media/rmImages/${data.path}`;
        document.getElementById("remove_id").value = document.getElementById("pre_img_id").value;
        document.getElementById("remove_name").value = image_name;
      },
      error: function () {
        alert("실패");
      }
    });
  }

}


// 스티커
function sticker_hashtag() {
  var tag_input = document.getElementById("hash_input").childElementCount;
  var tag_count = 0;
  document.getElementById("hashtag_select").options.length = 0;

  if (tag_input == 0) {
    document.getElementById("hashtag_sticker").style.display = "none";
    document.getElementById("hashtag_none").style.display = "block";
  }

  else {
    for (var i = 0; i < tag_input; i++) {
      var hashtag = document.getElementById(`hashtag${i + 1}`).value;

      if (hashtag != "") {
        document.getElementById("hashtag_select").innerHTML += `<option value="${hashtag}">${hashtag}</option>`;
        tag_count += 1;
      }

    }
    if (tag_count > 0) {
      document.getElementById("hashtag_sticker").style.display = "block";
      document.getElementById("hashtag_none").style.display = "none";
    }
    else {
      document.getElementById("hashtag_sticker").style.display = "none";
      document.getElementById("hashtag_none").style.display = "block";
    }
  }

}

let APIKEY = "eytNBijnHtf5mtZBfok9hNEB2FD011el";
let picnum = 30;
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("hashtag_select").addEventListener("change", ev => {
    ev.preventDefault();
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&limit=${picnum}&lang=ko&q=`;
    let sticker_opt = document.getElementById("hashtag_select")
    let str = sticker_opt.options[sticker_opt.selectedIndex].value;

    const gifs_gallery = document.getElementById('gifs');
    if (gifs_gallery != null) {
      gifs_gallery.remove();
    }
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let fig = document.createElement("figure");
        fig.setAttribute("id", "gifs");
        var num = 1;
        content.data.forEach(element => {
          let img = document.createElement("img");
          // let fc = document.createElement("figcaption");
          img.src = element.images.downsized.url;
          img.alt = element.title;
          img.onclick = "";
          img.id = `gif${num}`;
          num += 1;
          fig.appendChild(img);
          let out = document.querySelector(".out");
          out.insertAdjacentElement("afterbegin", fig);
        })
        for (var i = 1; i < num; i++) { document.getElementById(`gif${i}`).setAttribute("onclick", "sticker_on_canvas(this)") }
      })
      .catch(err => {
        console.error(err);
      });
  });
}



function sticker_on_canvas(sticker) {
  stiNum += 1;
  document.getElementById("stiNum").value = parseInt(stiNum); // 업로드 이미지 수 업뎃

  // // img 태그 생성
  var sti = document.createElement("img");
  sti.id = `sti${String(stiNum)}`;
  sti.src = sticker.src;
  sti.width = sticker.clientWidth;
  sti.height = sticker.clientHeight;
  sti.style.display = "none";
  document.getElementById("canvasSti").appendChild(sti);

  document.getElementById("sticker_url").innerHTML += `<input id="sticker${String(stiNum)}" name="sti${String(stiNum)}" value="${sti.src}">`;

  // img weight 태그 생성
  var stiW = document.createElement("input");
  stiW.name = `aticker${String(stiNum)}[]`;
  stiW.value = sticker.clientWidth;
  sti.style.display = "none";
  document.getElementById("canvasStiW").appendChild(stiW);

  // img height 태그 생성
  var stiH = document.createElement("input");
  stiH.name = `aticker${String(stiNum)}[]`;
  stiH.value = sticker.clientHeight;
  sti.style.display = "none";
  document.getElementById("canvasStiH").appendChild(stiH);

  // img x 좌표 태그 생성
  var stiX = document.createElement("input");
  stiX.name = `aticker${String(stiNum)}[]`;
  stiX.value = text_x;
  stiX.style.display = "none"
  document.getElementById("canvasStiX").appendChild(stiX);

  // img y 좌표 태그 생성
  var stiY = document.createElement("input");
  stiY.name = `aticker${String(stiNum)}[]`;
  stiY.value = text_y;
  stiY.style.display = "none";
  document.getElementById("canvasStiY").appendChild(stiY);


  totalCanvas();

  sticker_select_num = parseInt(sticker_select_num) + 1;

  // option 태그 생성
  var selecticker = document.createElement("option");
  selecticker.id = `gif${String(sticker_select_num)}`;
  selecticker.selected = true;
  selecticker.innerText = sticker.alt;
  document.getElementById("sticker_select").appendChild(selecticker);

  // console.log(sticker);
}


// canvas 클릭 이벤트
canvas.onclick = function (event) {
  // 일기 작성
  if (document.getElementById("selectEdit").value == "write") {
    var text_i = document.getElementById("UserInput_select").selectedIndex;
    document.getElementById(`text_x${text_i + 1}`).value = event.clientX - ctx.canvas.offsetLeft - 10;
    document.getElementById(`text_y${text_i + 1}`).value = event.clientY - ctx.canvas.offsetTop - 45;
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

  else if (document.getElementById("selectEdit").value == "sticker") {
    var slt = document.getElementById("sticker_select").selectedIndex;
    var pimg = document.getElementById("canvasSti").childNodes.item(slt);
    var px = document.getElementById("canvasStiX").childNodes.item(slt);
    var py = document.getElementById("canvasStiY").childNodes.item(slt);
    var photo_x = event.clientX - ctx.canvas.offsetLeft - (pimg.width / 2); // 이미지 x 좌표 변경
    var photo_y = event.clientY - ctx.canvas.offsetTop - (pimg.height / 2); // 이미지 y 좌표 변경
    px.value = photo_x;
    py.value = photo_y;
  }

  totalCanvas(); // 다시 canvas 그리기
}

