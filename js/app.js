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

  for (let i = 0; i <= 3; i++) {
    board[i] = new Array();
    for (let j = 0; j <= 3; j++) {
      board[i][j] = 0;
      let gridCell = document.querySelector(`#grid-cell-${i}-${j}`);
      gridCell.style.top = `${getPosTop(i, j)}px`;
      gridCell.style.left = `${getPosLeft(i, j)}px`;
    }
  }
  updateBoardView();
}

function updateBoardView() {
  $(".number-cell").remove();
  for (let i = 0; i <= 3; i++) {
    trueBoard[i] = new Array();
    for (let j = 0; j <= 3; j++) {
      trueBoard[i][j] = false;
      let numberCell = document.createElement("div");
      let grid = document.querySelector("#grid-container");
      numberCell.className = "number-cell";
      numberCell.id = `number-cell-${i}-${j}`;
      grid.appendChild(numberCell);

      if (board[i][j] !== 0) {
        let numberCell = document.querySelector(`#number-cell-${i}-${j}`);
        numberCell.style.top = `${getPosTop(i, j)}px`;
        numberCell.style.left = `${getPosLeft(i, j)}px`;
        numberCell.style.backgroundColor = `${getNumberCellBgColor(
          board[i][j]
        )}`;
        numberCell.style.color = `${getNumberCellColor(board[i][j])}`;
        numberCell.innerText = board[i][j];
      }
    }
  }
}

function getPosTop(i, j) {
  return 20 + 120 * i;
}

function getPosLeft(i, j) {
  return 20 + 120 * j;
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

  if (randBoard === 0) {
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
