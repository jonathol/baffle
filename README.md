# Baffle

![image of baffle][baffle]
[baffle]: https://res.cloudinary.com/jonathol/image/upload/v1468624429/baffle_xen33v.png

[Live link][project]
[project]: https://jonathol.github.io/baffle/

Baffle is a web game inspired by Hasbro's Boggle. It is made with HTML, CSS, and JS.

## Instructions
You have 3 minutes to find as many words as you can according to the following rules:

  1. Letters must be adjacent (horizontally, vertically, or diagonally)
  2. Words must contain at least three letters
  3. No letter cube may be used more than once within a single word

To make a word, simply click on a letter and drag to the next letter.

## Features

### 3D buttons

To create a button that looks 3D, I gave it a box shadow.

![image of button][button]
[button]: https://res.cloudinary.com/jonathol/image/upload/v1468556023/button_e0v2zu.png

When a I hover over a button, I remove the shadow and shrink the size of the element while increasing the border by 1px.

![image of button hover][button_hover]
[button_hover]: https://res.cloudinary.com/jonathol/image/upload/v1468556023/button_hover_khymny.png

```
.dice {
  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a49999;
  font-size: 30px;
  box-shadow: 12px 8px 10px black;
}

.dice:hover {
  cursor: pointer;
  width: 78px;
  height: 78px;
  margin: 10px;
  border-radius: 39px 39px;
  border: 1px solid rgba(56,56,56,.6);
  box-shadow: none;
}
```

### Modal

To create a modal, I had to split it up into two parts, the overlay and the display

Overlay:
```
.instruction-overlay {
  position: fixed;
  z-index:1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  visibility:visible;
}
```
Display:
```
.score-screen {
  width: 350px;
  height: 350px;
  background: #606060;
  color: ghostwhite;
  position: fixed;
  z-index:2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 5%;
  visibility:hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
```
![image of modal][modal]
[modal]: https://res.cloudinary.com/jonathol/image/upload/v1468625040/landing_ptcxoi.png

### Menu
The menu has the time left, a pause button, a reset button, and a rules button.

![image of menu][menu]
[menu]: https://res.cloudinary.com/jonathol/image/upload/v1468625041/menu_cucbb5.png

Timer code snippit:
``` javascript
Game.prototype.countdownTimer = function (){
 	this.sec--;

  if (this.sec === -01) {
   		this.sec = 59;
   		this.min = this.min - 1;
	}
  	else {
   		this.min = this.min;
	}

	if (this.sec <= 9) {
		document.getElementById("countdownTimer").innerHTML = " " + this.min + ":0" + this.sec;
	}
	else{
		document.getElementById("countdownTimer").innerHTML  = " " + this.min + ":" + this.sec;
	}

	this.countdownTime = window.setTimeout("Game.countdownTimer();", 1000);

	if (this.min === 0 && this.sec === 0) {
		window.clearTimeout(this.countdownTime);
		this.sec = this.resetSec;
		this.min = this.resetMin;
		document.getElementById("score_overlay").style.visibility = "visible";
		document.getElementById("score_screen").style.visibility = "visible";

		document.getElementById("score").innerHTML = this.score;
		let p = Math.floor( Math.random() * (this.randomPhrase.length));
		document.getElementById("endMessage").innerHTML = this.randomPhrase[p];
	}
};
```

Pause screen:

![image of pause screen][pause]
[pause]: https://res.cloudinary.com/jonathol/image/upload/v1468625041/pause_orqjcr.png

Rules screen:

![image of rules screen][rules]
[rules]: https://res.cloudinary.com/jonathol/image/upload/v1468625041/rules_yrg2qv.png

### Score Screen
The score screen displays both current score and words the player has found. Words found are green, duplicate words are blue, and incorrect words are red.

![image of score][score]
[score]: https://res.cloudinary.com/jonathol/image/upload/v1468625041/score_bzr5r4.png

### Game Over!
The game over screen pops up when the timer hits 0:00. The screen displays a fun message and a button to play again.

![image of game over][game_over]
[game_over]: https://res.cloudinary.com/jonathol/image/upload/v1468625825/game_over_dqym0b.png

## Future Features

- multiplayer
- high score
- different languages
