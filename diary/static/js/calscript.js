var date = '';
calendars.clndr1 = $('.cal1').clndr({
  clickEvents: {
    click: function (target) {
      console.log(target.element.className)
      console.log(target.element)

      date = target.element.className
      var arr = String(date).split('-');
      arr.splice(0, 2);
      console.log(arr); // year-month-day

      // 해당 날짜 일기가 있으면 detail, 없으면 decorate 페이지로 이동
      location.href = '/diary/decorate/'; // decorate.html
    }
  }
});

console.log(date)