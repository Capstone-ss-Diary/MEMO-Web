var date = new Date();
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDay();
month += 1;
function days(year, month) {
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;

    case 4: case 6: case 9: case 11:
      return 30;

    case 2:
      if (((year % 400) == 0 || (year % 4) == 0 && (year % 100) != 0)) {
        return 29;
      }
      else {
        return 28;
      }
  }
}
function prevmonth() {
  var ymda = document.getElementById("prev");
  var yg = document.getElementById("Ymd");
  month--;
  if (month < 1) {
    month = 12;
    year -= 1;
  }
  if (year < 1970) {
    alert("기원전");
    for (var i = 1; i < 100; i--) {
      window.top.moveTo(i, i *= -1);
    }
  }
  var ymda = year + "년 " + month + "월";
  present();
}
function nextmonth() {
  var ymda = document.getElementById("next");
  var yg = document.getElementById("Ymd");
  month++;
  if (month > 12) {
    month = 1;
    year += 1;
  }
  var ymda = year + "년" + " " + month + "월";
  present();
}
function present() {
  var start = new Date(year, month - 1, 1);
  var ymda = document.getElementById("Ymd");
  var Tab = document.getElementById("tab");
  var row = null;
  var cnt = 0;
  var row_count = 1;
  var ym = year + "년 " + month + "월";
  ymda.innerHTML = ym;
  while (tab.rows.length > 2) {   // 테이블의 행의 길이가 2보다 크면 행 제거
    tab.deleteRow(tab.rows.length - 1);
  }
  row = Tab.insertRow();
  for (var j = 0; j < start.getDay(); j++) {   // 달력의 시작일
    cell = row.insertCell();
    cnt += 1;
  }
  for (var i = 1; i <= days(year, month); i++) { // 달력 일수
    var cell = row.insertCell();
    if (year == date.getFullYear() && month - 1 == date.getMonth() && i == date.getDate()) {
      cell.innerHTML = "<div class='calendar_cell'>" + i + "</div>" + "<a class='calendar_a_tag_example'>" + "today" + "</a>";
    }
    else {
      cell.innerHTML = "<div>" + i + "</div>";
    }
    cnt += 1;
    if (cnt % 7 == 0) {
      row = tab.insertRow();
      row_count += 1;
    }
  }
  for (var k = 0; k < row_count * 7 - cnt; k++) {
    cell = row.insertCell();
  }
}