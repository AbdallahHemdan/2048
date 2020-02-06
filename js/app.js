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

  for (let row = 0; row <= 3; row++) {
    overlappedBoard[row] = new Array();
    for (let col = 0; col <= 3; col++) {
      overlappedBoard[row][col] = 0;
    }
  }

  if (direction === directionEnum.Up) {
    for (let row = 1; row <= 3; row++) {
      for (let col = 0; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = row; // as far as possible empty position
          for (let k = row - 1; k >= 0; k--) {
            if (board[k][col] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (
            newPos !== 0 &&
            board[newPos - 1][col] === board[row][col] &&
            overlappedBoard[newPos - 1][col] === 0
          ) {
            board[newPos - 1][col] *= 2;
            overlappedBoard[newPos - 1][col] = 1;
            board[row][col] = 0;
          } else if (newPos !== row) {
            // else just move the cell if possible
            board[newPos][col] = board[row][col];
            board[row][col] = 0;
          }
        }
      }
    }
  } else if (direction === directionEnum.Down) {
    for (let row = 2; row >= 0; row--) {
      for (let col = 0; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = row; // as far as possible empty position
          for (let k = row + 1; k <= 3; k++) {
            if (board[k][col] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (
            newPos !== 3 &&
            board[newPos + 1][col] === board[row][col] &&
            overlappedBoard[newPos + 1][col] === 0
          ) {
            board[newPos + 1][col] *= 2;
            overlappedBoard[newPos + 1][col] = 1;
            board[row][col] = 0;
          } else if (newPos !== row) {
            // else just move the cell if possible
            board[newPos][col] = board[row][col];
            board[row][col] = 0;
          }
        }
      }
    }
  } else if (direction === directionEnum.Left) {
    for (let row = 0; row <= 3; row++) {
      for (let col = 1; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = col; // as far as possible empty position
          for (let k = col - 1; k >= 0; k--) {
            if (board[row][k] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (
            newPos !== 0 &&
            board[row][newPos - 1] === board[row][col] &&
            overlappedBoard[row][newPos - 1] === 0
          ) {
            board[row][newPos - 1] *= 2;
            overlappedBoard[row][newPos - 1] = 1;
            board[row][col] = 0;
          } else if (newPos !== row) {
            // else just move the cell if possible
            board[row][newPos] = board[row][col];
            board[row][col] = 0;
          }
        }
      }
    }
  } else if (direction === directionEnum.Right) {
    for (let row = 0; row <= 3; row++) {
      for (let col = 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = col; // as far as possible empty position
          for (let k = col + 1; k <= 3; k++) {
            if (board[row][k] !== 0) break;
            newPos = k;
          }

          // overlapping handling
          if (
            newPos !== 3 &&
            board[row][newPos + 1] === board[row][col] &&
            overlappedBoard[row][newPos + 1] === 0
          ) {
            board[row][newPos + 1] *= 2;
            overlappedBoard[row][newPos + 1] = 1;
            board[row][col] = 0;
          } else if (newPos !== row) {
            // else just move the cell if possible
            board[newPos][col] = board[row][col];
            board[row][col] = 0;
          }
        }
      }
    }
  }
}

function canMove (direction) {
  let checkMovement = false;

  if (direction === directionEnum.Up) {
    for (let row = 1; row <= 3; row++) {
      for (let col = 0; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = row; // as far as possible empty position
          for (let k = row - 1; k >= 0; k--) {
            if (board[k][col] !== 0) break;
            newPos = k;
          }

          if (newPos !== row)
            checkMovement = true;
        }
      }
    }
  } else if (direction === directionEnum.Down) {
    for (let row = 2; row >= 0; row--) {
      for (let col = 0; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = row; // as far as possible empty position
          for (let k = row + 1; k <= 3; k++) {
            if (board[k][col] !== 0) break;
            newPos = k;
          }

          if (newPos !== row)
            checkMovement = true;
        }
      }
    }
  } else if (direction === directionEnum.Left) {
    for (let row = 0; row <= 3; row++) {
      for (let col = 1; col <= 3; col++) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = col; // as far as possible empty position
          for (let k = col - 1; k >= 0; k--) {
            if (board[row][k] !== 0) break;
            newPos = k;
          }

          if (newPos !== col)
            checkMovement = true;
        }
      }
    }
  } else if (direction === directionEnum.Right) {
    for (let row = 0; row <= 3; row++) {
      for (let col = 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
          //if the cell isn't empty

          let newPos = col; // as far as possible empty position
          for (let k = col + 1; k <= 3; k++) {
            if (board[row][k] !== 0) break;
            newPos = k;
          }

          if (newPos !== col)
            checkMovement = true; 
        }
      }
    }
  }

  return checkMovement;
}

function showNumberWithAnimation(row, col, randNumber) {
  let numberCell = $("#number-cell-" + row + "-" + col);
  numberCell.css("top", getPosTop(row, col));
  numberCell.css("left", getPosLeft(row, col));
  numberCell.css("background-color", getNumberCellBgColor(board[row][col]));
  numberCell.css("color", getNumberCellColor(board[row][col]));
  numberCell.text(randNumber);
  numberCell.animate(
    {
      top: getPosTop(row, col),
      left: getPosLeft(row, col)
    },
    50
  );
}

function showMoveAnimation(fromX, fromY, toX, toY) {
  let numberCell = $("#number-cell-" + fromX + "-" + fromY);
  numberCell.animate(
    {
      top: getPosTop(toX, toY),
      left: getPosLeft(toX, toY)
    },
    200
  );
}
