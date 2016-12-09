//add in document ready

//initializes witch object
var witch = {
  height: 0
};

//initial witch jump/fall with spacebar
$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    var intervalUp = setInterval(function(){
      witch.height+=2;
      $('#witch').css('bottom',witch.height);
      if (witch.height>=250){
        clearInterval(intervalUp);
      }
    }, 1);
    var intervalDown = setInterval(function(){
      witch.height-=1;
      $('#witch').css('bottom',witch.height);
      if (witch.height<=0){
        clearInterval(intervalDown);
      }
    }, 10);
  }
})
