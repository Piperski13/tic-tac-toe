const gridElement = document.querySelectorAll('.grid-element');
const restartBtn = document.querySelector('.restartBtn');
const statusText = document.querySelector('.statusText');
const winningCondition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;