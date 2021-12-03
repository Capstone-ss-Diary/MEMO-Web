var date = '';
var url = String(window.location.href).split('/');

calendars.clndr1 = $('.cal1').clndr({
  clickEvents: {
    click: function (target) {

      console.log(target.element.className)
      console.log(target.element)

      date = target.element.className
      var arr = String(date).split('-');
      arr.splice(0, 2);
      console.log(arr); // year-month-day

      // var dates = [];
      // var diary_num = document.getElementById("date").childElementCount;
      // if (diary_num > 0) {
      //   var diary = document.getElementById("date").childNodes;
      //   for (var i = 0; i < diary_num; i++) {
      //     var date_data = diary.item(i).value;
      //     date_data = date_data.split(".").join("").split(",").join("").split(" "); // 11 -> Nov

      //   }
      // }

      // 해당 날짜 일기가 있으면 detail, 없으면 decorate 페이지로 이동

      location.href = `/diary/decorate/${url[5]}/`;

      // ajax
    }
  }
});