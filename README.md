# Black Magic - [Link to Deployed version of the project](https://github.com/sf-wdi-labs/readme-example)

<img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="100">

## Project 0 - Black Magic

<i> This is a repo for a one player game I created. </i>

In this game, you play the character of a witch. She is low on magic from casting too many spells, and needs your guidance to get back to her home on the moon. She only has enough power for one last take off, so you must help her land on bats to get an extra upward boost. Don't let her hit the ground though, or she'll be stuck on mortal land!

See the published project at [github.com/sf-wdi-labs/readme-example](https://github.com/sf-wdi-labs/readme-example)!

## Technologies Used

<li> jQuery </li>
<li> HTML </li>
<li> CSS </li>

## Code I'm Proud Of

```javascript
	//function to clear intervals
  	function clearUp(){
	    if (witch.height>=currentHeight+350 ||
	    $('#witch').offset().top<2){
	      clearInterval(intervalUp);
	      currentHeight+=350;
	      return currentHeight;
	    }
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
```

### Screen Shots
Screen Shot 2016-12-11 at 10.20.31 PM
