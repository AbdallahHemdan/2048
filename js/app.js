let score = 0;
let board = new Array();
let trueBoard = new Array();

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

  let gameScore = document.querySelector("#score");
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
        numberCell.style.color = `${getNumberCellColor(board[row][col])}`;
        numberCell.innerText = board[row][col];
      }
    }
  }
}

function getPosTop(row, col) {
  return 20 + 120 * row;
}

function getPosLeft(row, col) {
  return 20 + 120 * col;
}

function generateOneNumber() {
  let randBoard = [];
  let randNumber = 0;
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (board[row][col] === 0) {
        randBoard[randNumber++] = [row][col];
      }
    }
  }

  if (randBoard.length === 0) {
    // no empty cell exists
    return false;
  } else {
    let randRandomCell = Math.random() * randBoard.length;
    randRandomCell = Math.floor(randRandomCell);
    console.log(`randRandomCell = ${randRandomCell}`);

    let randX = randBoard[randRandomCell][0];
    let randY = randBoard[randRandomCell][1];
    console.log(`randX = ${randX}`);
    console.log(`randY = ${randY}`);
    board[randX][randY] = Math.random() <= 0.7 ? 2 : 4;
    console.log(`boardRandomCell = ${board[randX][randY]}`);
    showNumberWithAnimation(randX, randY, board[randX][randY]);
  }
}
