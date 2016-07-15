let d1 = new Dice("A", "E", "A", "N", "E", "G");
let d2 = new Dice("A", "H", "S", "P", "C", "O");
let d3 = new Dice("A", "S", "P", "F", "F", "K");
let d4 = new Dice("O", "B", "J", "O", "A", "B");
let d5 = new Dice("I", "O", "T", "M", "U", "C");
let d6 = new Dice("R", "Y", "V", "D", "E", "L");
let d7 = new Dice("L", "R", "E", "I", "X", "D");
let d8 = new Dice("E", "I", "U", "N", "E", "S");
let d9 = new Dice("W", "N", "G", "E", "E", "H");
let d10 = new Dice("L", "N", "H", "N", "R", "Z");
let d11 = new Dice("T", "S", "T", "I", "Y", "D");
let d12 = new Dice("O", "W", "T", "O", "A", "T");
let d13 = new Dice("E", "R", "T", "T", "Y", "L");
let d14 = new Dice("T", "O", "E", "S", "S", "I");
let d15 = new Dice("T", "E", "R", "W", "H", "V");
let d16 = new Dice("N", "U", "I", "H", "M", "QU");


// Board

let b = new Board(d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16)

// Implement Game
let hash = {};
for(let i = 0; i<baffleDictionary.length; i++) {
    hash[baffleDictionary[i]] = true;
};

let g = new Game(b, hash);
