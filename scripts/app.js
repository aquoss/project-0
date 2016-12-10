$(document).ready(function(){

  var intervalUp;
  var intervalDown;
  var intervalRight;
  var currentHeight;
  var start;

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
      e.preventDefault();
      start = witch.left+9;
      intervalRight = setInterval(goRight,9);
    } else if (e.keyCode === 37){
      e.preventDefault();
      start = witch.left-9;
      intervalRight = setInterval(goLeft,9);
    }
  })

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
  function clearSide(){
    if (witch.left===start){
      clearInterval(intervalRight);
    }
  }

  //functions to move witch
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
  function goRight(){
    witch.left+=1;
    $('#witch').css('left',witch.left);
    clearSide()
  }
  function goLeft(){
    witch.left-=1;
    $('#witch').css('left',witch.left);
    clearSide()
  }

  //function to check witch vs bat position
  //????? why is this running on the way up too?
  function checkPos(){
    if (($('#witch').offset().left>bat1.left-60 && $('#witch').offset().left<bat1.left)
    && ($('#witch').offset().top>bat1.height-3 && $('#witch').offset().top<bat1.height+2)){
      batBoost();
    }
  }

  function batBoost(){
    intervalUp = setInterval(goUp,1);
    intervalDown = setInterval(goDown,10);
  }


})
