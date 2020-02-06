let score = 0;
let board = new Array();
let trueBoard = new Array();

const directions = {
  Up: 1,
  Down: 2,
  Left: 3,
  Right: 4
}

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

function getNumberCellBgColor(number) {
  switch(number) {
    case 2:    return "#BBADA0";
    case 4:    return "#ece0c6";
    case 8:    return "#f2b079";
    case 16:   return "#f49664";
    case 32:   return "#f57c61";
    case 64:   return "#f65f3c";
    case 128:  return "#eecf73";
    case 256:  return "#ebcd5f";
    case 512:  return "#ebc84e";
    case 1024: return "#EEC22D";
    case 2048: return "#EAC32F";
    
    //Empty cell
    case 0:    return "#CDC1B4";

    default:
      throw ("Number is NotFound 404");
  }
}

function getNumberCellColor(number) {
  if (number == 2 || number == 4) {
    return "#7E7360";
  }
  return "#FFFFD5";
}

function movement(direction) {
  if (directions == directions.Up) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = i; // as far as possible empty position
          for (let k = i - 1; k >= 0; k--) {
            if (board[k][j] !== 0) break;
            newPos = k;
          }

          board[newPos][j] = board[i][j]; 
          board[i][j] = 0;
        }
      }
    }
  }
  else if (directions == directions.Down) {
    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = i; // as far as possible empty position
          for (let k = i + 1; k <= 3; k++) {
            if (board[k][j] !== 0) break;
            newPos = k;
          }

          board[newPos][j] = board[i][j]; 
          board[i][j] = 0;
        }
      }
    }
  }
  else if (directions == directions.Left) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = j; // as far as possible empty position
          for (let k = j - 1; k >= 0; k--) {
            if (board[i][k] !== 0) break;
            newPos = k;
          }

          board[i][newPos] = board[i][j]; 
          board[i][j] = 0;
        }
      }
    }
  }
  else if (directions == directions.Right) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 3; j >= 0; j--) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = j; // as far as possible empty position
          for (let k = j + 1; k <= 3; k++) {
            if (board[i][k] !== 0) break;
            newPos = k;
          }

          board[i][newPos] = board[i][j]; 
          board[i][j] = 0;
        }
      }
    }
  }
}