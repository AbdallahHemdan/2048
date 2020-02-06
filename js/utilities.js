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

function canMoveLeft(board) {
  for (let row = 0; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      if (board[row][col] !== 0) {
        if (
          board[row][col - 1] === 0 ||
          board[row][col - 1] === board[row][col]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveUp(board) {
  for (let col = 0; col <= 3; col++) {
    for (let row = 1; row <= 3; row++) {
      if (board[row][col] !== 0) {
        if (
          board[row - 1][col] === 0 ||
          board[row - 1][col] === board[row][col]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown(board) {
  for (let col = 0; col <= 3; col++) {
    for (let row = 2; row >= 0; row--) {
      if (board[row][col] !== 0) {
        if (
          board[row + 1][col] === 0 ||
          board[row + 1][col] === board[row][col]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight(board) {
  for (let row = 0; row <= 3; row++) {
    for (let col = 2; col >= 0; col--) {
      if (board[row][col] !== 0) {
        if (
          board[row][col + 1] === 0 ||
          board[row][col + 1] === board[row][col]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function noBlockLeft(row, col1, col, board) {
  for (let i = col1 + 1; i < col; i++) {
    if (board[row][i] !== 0) {
      return false;
    }
  }
  return true;
}

function noBlockUp(col, row1, row, board) {
  for (let i = row1 + 1; i < row; i++) {
    if (board[i][col] !== 0) {
      return false;
    }
  }
  return true;
}

function noBlockDown(col, row1, row, board) {
  for (let i = row1 - 1; i > row; i--) {
    if (board[i][col] !== 0) {
      return false;
    }
  }
  return true;
}

function noBlockRight(row, col1, col, board) {
  for (let i = col1 - 1; i > col; i--) {
    if (board[row][i] !== 0) {
      return false;
    }
  }
  return true;
}
