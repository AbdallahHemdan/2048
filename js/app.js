let score = 0;
let board = new Array();
let trueBoard = new Array();

const directions = {
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
        randBoard[randNumber++] = [row, col];
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

function getNumberCellBgColor(number) {
  switch (number) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ece0c6";
    case 8:
      return "#f2b079";
    case 16:
      return "#f49664";
    case 32:
      return "#f57c61";
    case 64:
      return "#f65f3c";
    case 128:
      return "#eecf73";
    case 256:
      return "#ebcd5f";
    case 512:
      return "#ebc84e";
    case 1024:
      return "#EEC22D";
    case 2048:
      return "#EAC32F";

    //Empty cell
    case 0:
      return "#CDC1B4";

    default:
      throw "Number is NotFound 404";
  }
}

function getNumberCellColor(number) {
  if (number == 2 || number == 4) {
    return "#776e65";
  }
  return "#FFFFD5";
}

function movement(direction) {
  // check the overlapped cells in the current move not to overlapped twice
  let overlappedBoard = new Array();

  for (let i = 0; i <= 3; i++) {
    overlappedBoard[i] = new Array();
    for (let j = 0; j <= 3; j++) {
      overlappedBoard[i][j] = 0;
    }
  }

  if (directions === directions.Up) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = i; // as far as possible empty position
          for (let k = i - 1; k >= 0; k--) {
            if (board[k][j] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (newPos !== 0 && board[newPos - 1][j] === board[i][j] && overlappedBoard[newPos - 1][j] === 0) {
            board[newPos - 1][j] *= 2;
            overlappedBoard[newPos - 1][j] = 1;
            board[i][j] = 0;
          }
          else if (newPos !== i) { // else just move the cell if possible
            board[newPos][j] = board[i][j]; 
            board[i][j] = 0;
          }

        }
      }
    }
  }
  else if (directions === directions.Down) {
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = i; // as far as possible empty position
          for (let k = i + 1; k <= 3; k++) {
            if (board[k][j] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (newPos !== 3 && board[newPos + 1][j] === board[i][j] && overlappedBoard[newPos + 1][j] === 0) {
            board[newPos + 1][j] *= 2;
            overlappedBoard[newPos + 1][j] = 1;
            board[i][j] = 0;
          }
          else if (newPos !== i) { // else just move the cell if possible
            board[newPos][j] = board[i][j]; 
            board[i][j] = 0;
          }
        }
      }
    }
  }
  else if (directions === directions.Left) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = j; // as far as possible empty position
          for (let k = j - 1; k >= 0; k--) {
            if (board[i][k] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (newPos !== 0 && board[i][newPos - 1] === board[i][j] && overlappedBoard[i][newPos - 1] === 0) {
            board[i][newPos - 1] *= 2;
            overlappedBoard[i][newPos - 1] = 1;
            board[i][j] = 0;
          }
          else if (newPos !== i) { // else just move the cell if possible
            board[i][newPos] = board[i][j]; 
            board[i][j] = 0;
          }
        }
      }
    }
  }
  else if (directions === directions.Right) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 2; j >= 0; j--) {
        if (board[i][j] !== 0) { //if the cell isn't empty
          
          let newPos = j; // as far as possible empty position
          for (let k = j + 1; k <= 3; k++) {
            if (board[i][k] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (newPos !== 3 && board[i][newPos + 1] === board[i][j] && overlappedBoard[i][newPos + 1] === 0) {
            board[i][newPos + 1] *= 2;
            overlappedBoard[i][newPos + 1] = 1;
            board[i][j] = 0;
          }
          else if (newPos !== i) { // else just move the cell if possible
            board[newPos][j] = board[i][j]; 
            board[i][j] = 0;
          }
        }
      }
    }
  }
}

function showNumberWithAnimation(row, col, randNumber) {
  let numberCell = $("#number-cell-" + row + "-" + col);
  numberCell.css("top", getPosTop(row, col));
  numberCell.css("left", getPosLeft(row, col));
  numberCell.css("background-color", getNumberCellBgColor(board[row][col]));
  numberCell.css("color", getNumberCellColor(board[row][col]));
  numberCell.text(randNumber);
}
