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
