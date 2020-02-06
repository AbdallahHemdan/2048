let score = 0;
let board = new Array();
let trueBoard = new Array();

const directionEnum = {
  Up: 1,
  Down: 2,
  Left: 3,
  Right: 4
};

function newGame() {
  createGrid();
  initGrid();
  generateOneNumber();
  generateOneNumber();
}

function createGrid() {
  let grid = document.querySelector(".grid-container");
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      let cell = document.createElement("div");
      cell.className = `grid-cell`;
      cell.id = `grid-cell-${row}-${col}`;
      grid.appendChild(cell);
    }
  }
}

function initGrid() {
  score = 0;

  let gameScore = document.querySelector(".score");
  gameScore.innerHTML = "0";
  console.log(gameScore.innerHTML);

  for (let row = 0; row <= 3; row++) {
    board[row] = new Array();
    for (let col = 0; col <= 3; col++) {
      board[row][col] = 0;
      let gridCell = document.querySelector(`#grid-cell-${row}-${col}`);
      gridCell.style.top = `${getPosTop(row, col)}px`;
      gridCell.style.left = `${getPosLeft(row, col)}px`;
    }
  }
  updateBoardView();
}

function updateBoardView() {
  $(".number-cell").remove();
  for (let row = 0; row <= 3; row++) {
    trueBoard[row] = new Array();
    for (let col = 0; col <= 3; col++) {
      trueBoard[row][col] = false;
      let numberCell = document.createElement("div");
      let grid = document.querySelector("#grid-container");
      numberCell.className = "number-cell";
      numberCell.id = `number-cell-${row}-${col}`;
      grid.appendChild(numberCell);

      if (board[row][col] !== 0) {
        let numberCell = document.querySelector(`#number-cell-${row}-${col}`);
        numberCell.style.top = `${getPosTop(row, col)}px`;
        numberCell.style.left = `${getPosLeft(row, col)}px`;
        numberCell.style.backgroundColor = `${getNumberCellBgColor(
          board[row][col]
        )}`;
        if (board[row][col] >= 4) {
          numberCell.style.fontSize = `50px`;
        }
        numberCell.style.color = `${getNumberCellColor(board[row][col])}`;
        numberCell.innerText = board[row][col];
        
        let digits = getDigitsnNumber(board[row][col]);
        if (digits >= 3) {
          let fontSize = String(80 - digits * 10);
          numberCell.style.fontSize = `${fontSize}` + "px";
        }
      }
    }
  }
}

function getDigitsnNumber (number) {
  let digits = 0;
  while(number >= 1) {
    digits++;
    number /= 10;
  }
  return digits;
}

function getPosTop(row, col) {
  return 20 + 120 * row;
}

function getPosLeft(row, col) {
  return 20 + 120 * col;
}
