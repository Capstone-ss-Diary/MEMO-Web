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
    }
  }
});

console.log(date)