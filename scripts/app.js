$(document).ready(function(){

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
      var intervalUp = setInterval(function(){
        witch.height+=2;
        $('#witch').css('bottom',witch.height);
        if (witch.height>=350){
          clearInterval(intervalUp);
        }
      }, 1);
      var intervalDown = setInterval(function(){
        witch.height-=1;
        checkPos();
        $('#witch').css('bottom',witch.height);
        if (witch.height<=0){
          clearInterval(intervalDown);
          // alert('game over');
        }
      }, 10);
    }
  })

  //horizontal movement
  $(window).keydown(function(e){
    if (e.keyCode === 39){
      e.preventDefault();
      var start = witch.left+9;
      var intervalRight = setInterval(function(){
        witch.left+=1;
        $('#witch').css('left',witch.left);
        if (witch.left===start){
          clearInterval(intervalRight);
        }
      },9);
    } else if (e.keyCode === 37){
      e.preventDefault();
      var start = witch.left-9;
      var intervalRight = setInterval(function(){
        witch.left-=1;
        $('#witch').css('left',witch.left);
        if (witch.left===start){
          clearInterval(intervalRight);
        }
      },9);
    }
  })

  //function to check witch vs bat position
  //????? why is this running on the way up too?
  function checkPos(){
    if (($('#witch').offset().left>bat1.left-60 && $('#witch').offset().left<bat1.left)
    && ($('#witch').offset().top>bat1.height-3 && $('#witch').offset().top<bat1.height+2)){
      jumpUp();
    }
  }

})
