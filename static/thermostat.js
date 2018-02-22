$(document).ready(function(){
  

  var loggedIn = $('#loggedIn');

  function moveToGoal() {
    var goal = $('#goalTemp');
    var current = $('#currentTemp');
    if (loggedIn.text() == 'Sending Events'){
      
      if (parseInt(goal.val()) > parseInt(current.val())) {
        current.val(parseInt(current.val()) + 1);
        emit();
      } 
      if (parseInt(goal.val()) < parseInt(current.val())) {
        current.val(parseInt(current.val()) - 1);
        emit();
      }
    }
  }

  function emit(){
    console.log('changing current temp by 1');
    var emitTemp = $.get('/emit', { temp: parseInt($('#currentTemp').val()) })
      .done(function () {
        console.log('sent event');
      })
      .fail(function (data) {
        console.log('event failed to send ' + data);
      });
  }

  setInterval(moveToGoal, 5000);


});