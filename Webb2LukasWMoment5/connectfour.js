const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = "red";
let gameOver = false;

for (let r = 0; r < ROWS; r++) {
  board[r] = Array(COLS).fill(null);
}

const boardDiv = document.getElementById("board");
const messageDiv = document.getElementById("message") || (() => {
  const div = document.createElement("div");
  div.id = "message";
  boardDiv.parentNode.insertBefore(div, boardDiv.nextSibling);
  return div;
})();

function renderBoard() {
  boardDiv.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (board[r][c] ? " " + board[r][c] : "");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleMove(c));
      boardDiv.appendChild(cell);
    }
  }
}

function handleMove(col) {
  if (gameOver) return;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      if (checkWin(r, col, currentPlayer)) {
        gameOver = true;
        renderBoard();
        messageDiv.textContent = `${currentPlayer.toUpperCase()} wins!`;
        return;
      }
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      renderBoard();
      return;
    }
  }
  // Optional: show message if column is full
  messageDiv.textContent = "Column is full!";
  setTimeout(() => { messageDiv.textContent = ""; }, 1000);
}

function checkWin(row, col, player) {
  function count(dx, dy) {
    let r = row + dx, c = col + dy, count = 0;
    while (
      r >= 0 && r < ROWS &&
      c >= 0 && c < COLS &&
      board[r][c] === player
    ) {
      count++;
      r += dx;
      c += dy;
    }
    return count;
  }
  // Check all directions
  return (
    count(-1, 0) + count(1, 0) >= 3 || // vertical
    count(0, -1) + count(0, 1) >= 3 || // horizontal
    count(-1, -1) + count(1, 1) >= 3 || // diagonal /
    count(-1, 1) + count(1, -1) >= 3    // diagonal \
  );
}
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Game";
resetBtn.id = "resetBtn";
resetBtn.addEventListener("click", () => {
  for (let r = 0; r < ROWS; r++) {
    board[r] = Array(COLS).fill(null);
  }
  currentPlayer = "red";
  gameOver = false;
  messageDiv.textContent = "";
  renderBoard();
});
boardDiv.parentNode.insertBefore(resetBtn, boardDiv);
renderBoard();
