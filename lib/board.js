let Board = function (c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16) {
  this.grid = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16];
};

Board.prototype.chooseLetter = function (cube) {
  return cube.faces[Math.floor((Math.random()*6))];
};

Board.prototype.randomize = function () {
  let i = this.grid.length;
	let j;
	let temp;
	while (--i)
	{
		j = Math.floor( Math.random() * (i - 1));
		temp = this.grid[i];
		this.grid[i] = this.grid[j];
		this.grid[j] = temp;
  }
};


module.exports = Board;
