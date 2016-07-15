let Game = function (board, dictionary) {
  this.board = board;
  this.baffleWords = [];
  this.currentString = "";
  this.mousedown = 0;
  this.resetSec = 01;
  this.resetMin = 3;
  this.sec = 0;
  this.min = 0;
  this.countdownTime;
  this.baffleDictionary = dictionary;
  this.score = 0;
  this.prevcube;
  this.isPause = false;
  this.randomPhrase = new Array("Want puns for free? No dice.",
                                "To Baffle, or not to Baffle, that is the question",
                                "Have you ever tried to eat a clock? It's very time consuming.",
                                "Time flies like an arrow. Fruit flies like a banana.",
                                "When a clock is hungry it goes back four seconds.",
                                "Every calendar's days are numbered.",
                                "He had a photographic memory that was never developed.",
                                "Seven days without a pun makes one weak."
                               );
 this.alphabet = ["A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
};


Game.prototype.clearBoard = function () {
	let grid = document.getElementById("baffleGrid");
	let cubes = grid.getElementsByTagName("div");
	for (let i=0; i<cubes.length; i++)
	{
     	if (cubes[i].style.backgroundColor != "white"){
     		cubes[i].style.backgroundColor = "white";
     	}
	}
	this.currentString = "";
	this.mousedown = 0;
	return;
};

Game.prototype.clearList = function () {
	this.baffleWords = [];
	let wl = document.getElementById("wordList");
	while (document.getElementById("wordList").hasChildNodes()){
		document.getElementById("wordList").removeChild(document.getElementById("wordList").firstChild);
	}
};

Game.prototype.assignLetter = function (idx) {
  let cubeName = "cube"+idx.toString();
  let letter = this.board.chooseLetter(this.board.grid[idx-1]);
  document.getElementById(cubeName).textContent = letter;
};

Game.prototype.resetTimer = function () {
  if (this.min >= 0 && this.sec >= 0){
    window.clearTimeout(this.countdownTime);
    this.sec = this.resetSec;
    this.min = this.resetMin;
	}
};

Game.prototype.shuffleBaffleGrid = function () {
  document.getElementById("instruction_overlay").style.visibility = "hidden";
  document.getElementById("instruction_screen").style.visibility = "hidden";
	this.clearBoard();
	this.clearList();
	this.board.randomize();
	for (let i = 1; i < this.board.grid.length+1; i++){
    window.setTimeout(this.assignLetter.bind(this,i), i*50);
	};

	this.resetTimer();

	this.score = 0;
	document.getElementById("currentScore").innerHTML = this.score;
	this.countdownTimer();
	return;
};

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

Game.prototype.buildWord = function (event) {
  event.preventDefault();
	let cube = event.target;
	if (cube.style.backgroundColor != "black)"){
		cube.style.backgroundColor = "black";
		this.currentString = this.currentString.concat(cube.textContent);
		this.prevcube = Number(cube.id.substr(4, cube.id.length-1));
		if (this.mousedown === 0){
      this.mousedown++;
    }
	}
};

Game.prototype.buildingWord = function (event) {
  event.preventDefault();
	if (this.mousedown === 1){
		let cube = event.target;
		if (cube.style.backgroundColor != "black"){
			let currentcube = Number(cube.id.substr(4, cube.id.length-1));
			if (currentcube < this.prevcube-5 ||
          currentcube > this.prevcube+5 ||
          currentcube === this.prevcube-2 ||
          currentcube === this.prevcube+2 ||
          (this.prevcube%4 === 0 && currentcube === this.prevcube-3)||
          ((this.prevcube-1)%4 === 0 && currentcube === this.prevcube+3))
      {
				return;
			}
			cube.style.backgroundColor = "black";
			this.currentString = this.currentString.concat(cube.textContent);
			this.prevcube = currentcube;
  		if (this.mousedown === 0){
        this.mousedown=1;
      }
		}
	}
};

Game.prototype.submitWord = function (event) {
  event.preventDefault();
	if (this.mousedown === 1){
    if (this.alphabet.indexOf(this.currentString[0]) === -1)
    {
      return;
    }
		if (this.currentString.length >= 3){
			this.baffleWords.push(this.currentString);
			let wl = document.getElementById("wordList");
			this.updateList(this.baffleWords, wl);
		}
		this.clearBoard();
	}
};

Game.prototype.updateList = function (array, wl) {
	let duplicate = false;
	let index = array.length-1;
	for (let i = 0, row; row = wl.rows[i]; i++){
		if (row.cells[0].innerHTML === array[index]){
			row.style.color = "blue";
			duplicate = true;
		}
	}
	let row = wl.insertRow(index);
	row.insertCell(0);
	row.insertCell(1);
	wl.rows[index].cells[0].innerHTML = array[index];

	if (duplicate === true){
		wl.rows[index].style.color = "blue";
		wl.rows[index].cells[1].innerHTML = "/";
	}
	else{
		this.getScores(wl, index);
		document.getElementById("currentScore").innerHTML = this.score;
    let objDiv = document.getElementById("wordlist_container");
    objDiv.scrollTop = objDiv.scrollHeight;
	}
};

Game.prototype.getScores = function (wl, index) {
	let searchword = wl.rows[index].cells[0].innerHTML.toLowerCase();
    if (this.baffleDictionary[searchword]){
			switch (searchword.length){
				case 3:
				case 4:
					wl.rows[index].cells[1].innerHTML = "1";
					this.score += 1;
					break;
				case 5:
					wl.rows[index].cells[1].innerHTML = "2";
					this.score += 2;
					break;
				case 6:
					wl.rows[index].cells[1].innerHTML = "3";
					this.score += 3;
					break;
				case 7:
					wl.rows[index].cells[1].innerHTML = "5";
					this.score += 5;
					break;
				default:
					wl.rows[index].cells[1].innerHTML = "11";
					this.score += 5;
					break;
			}
			return;
		}	else{
		wl.rows[index].style.color = "red";
		wl.rows[index].cells[1].innerHTML = "X";
		return;
	}
};

Game.prototype.rules = function () {
  if (this.isPause === false){
		if (this.min < this.resetMin){
			window.clearTimeout(this.countdownTime);
			this.isPause = true;
			if (this.sec<=9) {
				document.getElementById("time").innerHTML = "\n" + this.min + ":0" + this.sec;
			}
			else{
				document.getElementById("time").innerHTML  = "\n" + this.min + ":" + this.sec;
			}
			document.getElementById("instruction_overlay").style.visibility = "visible";
			document.getElementById("rules_screen").style.visibility = "visible";
			return;
		}
	}
	else{
		document.getElementById("instruction_overlay").style.visibility = "hidden";
		document.getElementById("rules_screen").style.visibility = "hidden";
		this.isPause = false;
    if (this.min === 0 && this.sec === 0) {
      return;
    } else {
      this.countdownTime = window.setTimeout("Game.countdownTimer();", 1000);
    }
	}
};

Game.prototype.pause = function () {
	if (this.isPause === false){
		if (this.min < this.resetMin){
			window.clearTimeout(this.countdownTime);
			this.isPause = true;
			if (this.sec<=9) {
				document.getElementById("time").innerHTML = "\n" + this.min + ":0" + this.sec;
			}
			else{
				document.getElementById("time").innerHTML  = "\n" + this.min + ":" + this.sec;
			}
			document.getElementById("score_overlay").style.visibility = "visible";
			document.getElementById("pause_screen").style.visibility = "visible";
			return;
		}
	}
	else{
		document.getElementById("score_overlay").style.visibility = "hidden";
		document.getElementById("pause_screen").style.visibility = "hidden";
		this.isPause = false;
    if (this.min === 0 && this.sec === 0) {
      return;
    } else {
      this.countdownTime = window.setTimeout("Game.countdownTimer();", 1000);
    }
	}
};

Game.prototype.playAgain = function (){
	document.getElementById("score_overlay").style.visibility = "hidden";
	document.getElementById("score_screen").style.visibility = "hidden";
	this.shuffleBaffleGrid();
};



module.exports = Game;
