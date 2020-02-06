let gameEnd = 0;
$(document).keydown(function(action) {
  if (gameEnd === 0) {
    switch (action.keyCode) {
      case 37: //left
        if (moveLeft()) setTimeout("generateOneNumber()", 300);
        break;
      case 38: //up
        if (moveUp()) setTimeout("generateOneNumber()", 300);
        break;
      case 39: //right
        if (moveRight()) setTimeout("generateOneNumber()", 300);
        break;
      case 40: //down
        if (moveDown()) setTimeout("generateOneNumber()", 300);
        break;
      default:
        break;
    }
    // check Winning-GameOver statues
    //console.log("Winning State", checkWinning());
    //console.log("Gameover State", checkGameOver());
  }
});

function moveLeft() {
  if (!canMoveLeft(board)) {
    return false;
  }
  for (let row = 0; row < 4; row++) {
    for (let col = 1; col < 4; col++) {
      if (board[row][col] != 0) {
        for (let k = 0; k < col; k++) {
          if (board[row][k] === 0 && noBlockLeft(row, k, col, board)) {
            showMoveAnimation(row, col, row, k);
            board[row][k] = board[row][col];
            board[row][col] = 0;
          } else if (
            board[row][k] === board[row][col] &&
            noBlockLeft(row, k, col, board) &&
            !trueBoard[row][k]
          ) {
            showMoveAnimation(row, col, row, k);
            board[row][k] += board[row][col];
            board[row][col] = 0;
            score += board[row][k];
            $(".score").html(score);
            trueBoard[row][k] = true;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveUp() {
  if (!canMoveUp(board)) {
    return false;
  }
  for (let col = 0; col < 4; col++) {
    for (let row = 1; row < 4; row++) {
      if (board[row][col] != 0) {
        for (let k = 0; k < row; k++) {
          if (board[k][col] === 0 && noBlockUp(col, k, row, board)) {
            showMoveAnimation(row, col, k, col);
            board[k][col] = board[row][col];
            board[row][col] = 0;
          } else if (
            board[k][col] === board[row][col] &&
            noBlockUp(col, k, row, board) &&
            !trueBoard[k][col]
          ) {
            showMoveAnimation(row, col, k, col);
            board[k][col] += board[row][col];
            board[row][col] = 0;
            score += board[k][col];
            $(".score").html(score);
            trueBoard[k][col] = true;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveDown() {
  if (!canMoveDown(board)) {
    return false;
  }
  for (let col = 0; col < 4; col++) {
    for (let row = 2; row >= 0; row--) {
      if (board[row][col] != 0) {
        for (let k = 3; k > row; k--) {
          if (board[k][col] === 0 && noBlockDown(col, k, row, board)) {
            showMoveAnimation(row, col, k, col);
            board[k][col] = board[row][col];
            board[row][col] = 0;
          } else if (
            board[k][col] === board[row][col] &&
            noBlockDown(col, k, row, board) &&
            !trueBoard[k][col]
          ) {
            showMoveAnimation(row, col, k, col);
            board[k][col] += board[row][col];
            board[row][col] = 0;
            score += board[k][col];
            $(".score").html(score);
            trueBoard[k][col] = true;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveRight() {
  if (!canMoveRight(board)) {
    return false;
  }
  for (let row = 0; row < 4; row++) {
    for (let col = 2; col >= 0; col--) {
      if (board[row][col] !== 0) {
        for (let k = 3; k > col; k--) {
          if (board[row][k] === 0 && noBlockRight(row, k, col, board)) {
            showMoveAnimation(row, col, row, k);
            board[row][k] = board[row][col];
            board[row][col] = 0;
          } else if (
            board[row][k] === board[row][col] &&
            noBlockRight(row, k, col, board) &&
            !trueBoard[row][k]
          ) {
            showMoveAnimation(row, col, row, k);
            board[row][k] += board[row][col];
            board[row][col] = 0;
            score += board[row][k];
            $(".score").html(score);
            trueBoard[row][k] = true;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}
