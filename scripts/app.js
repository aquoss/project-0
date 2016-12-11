//add witch house on moon
//double check sizing of collision
//remove background from witch image
//add sound effects
//add sparkles coming from witch
//add alerts to say win or lose

$(document).ready(function(){

  var intervalUp;
  var intervalDown;
  var intervalRight;
  var currentHeight;
  var start;
  var rKeyDown;
  var lKeyDown;
  var spaceCount = 0;

  //initializes witch/bat objects
  var witch = {
    height: 0,
    left: $('#witch').offset().left
  };

  function Bat(number){
    this.height = $('#bat'+number).offset().top,
    this.left = $('#bat'+number).offset().left
  }

  var bats = [1,2,3,4,5,6];
  var horizontal = [];
  var vertical = [];

  bats[1] = new Bat(1);
  bats[2] = new Bat(2);
  bats[3] = new Bat(3);
  bats[4] = new Bat(4);
  bats[5] = new Bat(5);
  bats[6] = new Bat(6);

// var item = items[Math.floor(Math.random()*items.length)];

  for (var i=bats.length; i>0; i--){
    horizontal.push(Math.floor(Math.random()*bats.length));
  }
  for (var i=bats.length; i>0; i--){
    vertical.push(Math.floor(Math.random()*bats.length));
  }

  horizontal.forEach(function(num){
    setInterval(function(){
      $('#bat'+num).animate({left:'+=5%'},1000,'linear');
      $('#bat'+num).animate({left:'-=5%'},1000,'linear');
    },10);
  })

  vertical.forEach(function(num){
    setInterval(function(){
      $('#bat'+num).animate({top:'+=5%'},1000,'linear');
      $('#bat'+num).animate({top:'-=5%'},1000,'linear');
    },10);
  })

  //initial witch jump/fall with spacebar
  $(window).keydown(function(e){
    if (e.keyCode === 32) {
      if (spaceCount===0){
        e.preventDefault();
        spaceCount ++;
        currentHeight = witch.height;
        intervalUp = setInterval(goUp,1);
        intervalDown = setInterval(goDown,10);
      }
    }
  })

  //horizontal movement
  $(window).keydown(function(e){
    if (spaceCount>0){
      if (e.keyCode === 39){
        rKeyDown = true;
      } else if (e.keyCode === 37){
        lKeyDown = true;
      }
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
      $('#witch').animate({left:'+=.2%'},10,'linear');
    }
    if (lKeyDown) {
      $('#witch').animate({left:'-=.2%'},10,'linear');
    }
  },20);

  //functions to clear intervals
  function clearUp(){
    if (witch.height>=currentHeight+350 ||
    $('#witch').offset().top<2){
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
    bats.forEach(function(bat){
      if (($('#witch').offset().left>bat.left-60 && $('#witch').offset().left<bat.left)
      && ($('#witch').offset().top>bat.height-3 && $('#witch').offset().top<bat.height+2)){
        batBoost();
      }
    })
  }

  function batBoost(){
    currentHeight=witch.height;
    clearInterval(intervalUp);
    clearInterval(intervalDown);
    intervalUp = setInterval(goUp,1);
    intervalDown = setInterval(goDown,10);
  }


})
