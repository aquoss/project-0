//add in document ready
//when to stop witch from moving

var witch = {
  height: 0
};

$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    setInterval(moveWitchUp, 1);
  }
})

//functions to move the witch up or down
function moveWitchUp(){
  witch.height+=2;
  $('#witch').css('bottom',witch.height);
}
function moveWitchDown(){
  witch.height-=1;
  $('#witch').css('bottom',witch.height);
}
