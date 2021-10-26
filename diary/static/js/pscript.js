
function validateName(fname) { // 파일이름으로 확장자 체크
  var extensions = ['jpeg', 'jpg', 'png']; // 허용되는 확장자
  var fparts = fname.split('.');
  var fext = '';

  if (fparts.length > 1) {
    fext = fparts[fparts.length - 1]; // 확장자명
  }

  var validated = false; // 유효성

  if (fext != '') {
    extensions.forEach(function (ext) {
      if (ext == fext) { // 허용되는 확장자면 유효성 주기
        validated = true;
      }
    });
  }
  return validated; // 허용되는 확장자이면 true, 아니면 false
}

function loadFile(input) {

  var file = input.files[0]; // 파일 가져오기

  if (validateName(file.name)) { // 허용된 확장자명이면
    document.getElementById("fileName").textContent = file.name; // 파일명 넣기

    var photo = document.querySelector(".image");
    photo.src = URL.createObjectURL(file); // 파일 객체에서 이미지 데이터 가져오기
    photo.style.visibility = "visible"; // div에 이미지 미리 보여주기

    document.querySelector('.dellink').style.display = 'block'; // 이미지 삭제 링크 표시

    photo.onload = function () {
      URL.revokeObjectURL(photo.src); // URL 객체 해제
    }

    var img = document.getElementById("image");

    document.getElementById("imgHeight").value = img.clientHeight;
    document.getElementById("imgWidth").value = img.clientWidth;

    document.getElementById("imgSubmit").disabled = false; // 업로드 버튼 활성화
  }

  else alert("잘못된 확장자입니다.\n이미지 파일을 넣어주세요 (jpeg/jpg/png)");
}

function showImage() {

  document.getElementById("imgH1").value = document.getElementById("image").clientHeight;
  document.getElementById("imgW1").value = document.getElementById("image").clientWidth;




  document.getElementById('fileName').textContent = null; //기존 파일 이름 지우기

}

function deleteImg() {
  var photo = document.querySelector(".image");
  photo.src = ""; // 이미지 src 데이터 해제
  photo.style.visibility = "hidden"; // div 이미지 숨기기

  document.querySelector(".dellink").style.display = "none";

}

// "텍스트 추출" 버튼
document.getElementById("textExtract").onclick = function () {

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