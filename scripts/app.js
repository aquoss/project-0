$(document).ready(function(){

  var intervalUp;
  var intervalDown;
  var intervalRight;
  var currentHeight;
  var start;
  var rKeyDown;
  var lKeyDown;

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
  $(window).keydown(function(e){
    if (e.keyCode === 32) {
      e.preventDefault();
      currentHeight = witch.height;
      intervalUp = setInterval(goUp,1);
      intervalDown = setInterval(goDown,10);
    }
  })

  //horizontal movement
  $(window).keydown(function(e){
    if (e.keyCode === 39){
      rKeyDown = true;
    } else if (e.keyCode === 37){
      lKeyDown = true;
    }
  }).keyup(function(e){
    if (e.keyCode === 39){
      rKeyDown = false;
    } else if (e.keyCode === 37){
      lKeyDown = false;
    }
  })

  setInterval(function(){
    if (rKeyDown) {
      $('#witch').animate({left:'+=.5%'},10,'linear');
    }
    if (lKeyDown) {
      $('#witch').animate({left:'-=.5%'},10,'linear');
    }
  },20);

  //functions to clear intervals
  function clearUp(){
    if (witch.height>=currentHeight+350){
      clearInterval(intervalUp);
      currentHeight+=350;
      return currentHeight;
    }
  }
  function clearDown(){
    if (witch.height<=0){
      clearInterval(intervalDown);
      // alert('game over');
    }
  }

  //functions to move witch vertically
  function goUp(){
    witch.height+=2;
    $('#witch').css('bottom',witch.height);
    clearUp();
  }
  function goDown(){
    witch.height-=1;
    checkPos();
    $('#witch').css('bottom',witch.height);
    clearDown();
  }

  //function to check witch vs bat position
  function checkPos(){
    if (($('#witch').offset().left>bat1.left-60 && $('#witch').offset().left<bat1.left)
    && ($('#witch').offset().top>bat1.height-3 && $('#witch').offset().top<bat1.height+2)){
      batBoost();
    }
  }

  function batBoost(){
    currentHeight=witch.height;
    clearInterval(intervalUp);
    clearInterval(intervalDown);
    intervalUp = setInterval(goUp,1);
    intervalDown = setInterval(goDown,10);
  }


})
