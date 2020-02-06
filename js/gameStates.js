function checkWinning () {
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        if (board[i][j] == 2048) {
          return true;
        }
      }
    }
    return false;
  }
  
  function checkGameOver () {
    if (canMoveUp() || canMoveDown() || canMoveLeft() || canMoveRight()) {
      return false;
    }
    return true;
  }