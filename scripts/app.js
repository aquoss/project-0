$(document).on("ready", function(){

  //initializes witch/bat objects
  var witch = {
    height: 0,
    left: $('#witch').offset().left
  };
  var bat1 = {
    height: $('#bat1').offset().top,
    left: $('#bat1').offset().left
  }

  //initial witch jump/fall with spacebar
  $(window).keypress(function(e){
    if (e.keyCode === 32) {
      e.preventDefault();
      var intervalUp = setInterval(function(){
        witch.height+=2;
        $('#witch').css('bottom',witch.height);
//_____________________________
        //figure this part out
        if ((witch.height<bat1.height+10) && (witch.height>bat1.height-10)){
          console.log('y');
        }
        if (witch.height>=250){
          clearInterval(intervalUp);
        }
      }, 1);
      var intervalDown = setInterval(function(){
        witch.height-=1;
        $('#witch').css('bottom',witch.height);
        if (witch.height<=0){
          clearInterval(intervalDown);
          // alert('game over');
        }
      }, 10);
    }
  })

  //find correct key codes!!!!!!!!!
  //horizontal movement
  $(window).keypress(function(e){
    if (e.keyCode === 39){
      e.preventDefault();
      witch.left+=15;
      $('#witch').css('left',witch.left);
    } else if (e.keyCode === 37){
      e.preventDefault();
      witch.left-=15;
      $('#witch').css('right',witch.left);
    }
  })

})

function checkPos(){
  console.log(witch.height);
  if(witch.height<50){
    console.log('yay');
  }
}
