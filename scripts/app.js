$(document).ready(function(){

  //hide end of game modals
  $('#lose').hide();
  $('#win').hide();

  //event listeners for modals
  $('.instructions').on('click',function(){
    $('.instructions').hide();
  })
  $('#lose').on('click',function(){
    $('#lose').hide();
    location.reload();
  })
  $('#win').on('click',function(){
    $('#win').hide();
    location.reload();
  })

  //declare all global vars
  var intervalUp;
  var intervalDown;
  var intervalRight;
  var currentHeight;
  var start;
  var rKeyDown;
  var lKeyDown;
  var spaceCount = 0;
  var horizontal = [];
  var vertical = [];
  var music = new Audio('sounds/music.mp3');
  var squeak = new Audio('sounds/squeak.wav');
  var fall = new Audio('sounds/fall.wav');
  var laugh = new Audio('sounds/laugh.wav');
  var witch = {
    height: 0,
    left: $('#witch').offset().left
  };

  setInterval(function(){music.play()},50);

  //bat constructor
  function Bat(number){
    this.height = $('#bat'+number).offset().top,
    this.left = $('#bat'+number).offset().left
  }

  //create bat instances
  var bats = [1,2,3,4,5,6];
  bats[1] = new Bat(1);
  bats[2] = new Bat(2);
  bats[3] = new Bat(3);
  bats[4] = new Bat(4);
  bats[5] = new Bat(5);
  bats[6] = new Bat(6);

  //random assignment of horizontal/vertical movement
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

  //event listeners for horizontal movement
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

  //animation of horizontal movement
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
      $('#lose').show();
      fall.play();
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

  //function to check for collision
  function checkPos(){
    bats.forEach(function(bat){
      if (($('#witch').offset().left>bat.left-50 && $('#witch').offset().left<bat.left+20)
      && ($('#witch').offset().top>bat.height-3 && $('#witch').offset().top<bat.height+10)){
        batBoost();
      }
    })
    if (($('#witch').offset().left>$('#house').offset().left-90 && $('#witch').offset().left<$('#house').offset().left)
    && ($('#witch').offset().top>$('#house').offset().top-3 && $('#witch').offset().top<$('#house').offset().top+30)){
      clearInterval(intervalUp);
      clearInterval(intervalDown);
      $('#win').show();
      laugh.play();
    }
  }

  //function to boost witch when collision occurs
  function batBoost(){
    squeak.play();
    currentHeight=witch.height;
    clearInterval(intervalUp);
    clearInterval(intervalDown);
    intervalUp = setInterval(goUp,1);
    intervalDown = setInterval(goDown,10);
  }


})
