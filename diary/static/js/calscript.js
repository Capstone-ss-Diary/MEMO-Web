var date = '';
var url = String(window.location.href).split('/');

calendars.clndr1 = $('.cal1').clndr({
  clickEvents: {
    click: function (target) {

      console.log(target.element.className)

      date = target.element.className
      var arr = String(date).split('-');
      arr.splice(0, 2);
      var click_date = `${arr[0]}-${arr[1]}-${arr[2]}`
      console.log(click_date); // year-month-day

      var flag = 0;
      var diary_num = document.getElementById("date").childElementCount;
      if (diary_num > 0) {
        var diary = document.getElementById("date").childNodes;
        var diary_id = document.getElementById("diary_id").childNodes;
        for (var i = 0; i < diary_num; i++) {
          var date_data = diary.item(i).value;
          var id_data = diary_id.item(i).value;
          console.log(date_data)
          if(click_date==date_data){
            location.href = `/diary/detail/${url[5]}/${id_data}/`;
            flag += 1
          }

        }

      }

      if(flag==0){
        location.href = `/diary/decorate/${url[5]}/${click_date}`;
      }

    }
  }
});