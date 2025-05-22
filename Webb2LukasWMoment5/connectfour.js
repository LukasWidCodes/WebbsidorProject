const ROWS = 6;
const COLS = 7;
const board = []; // Skapar en tom spelbräda som en 2D-array
let currentPlayer = "red";
let gameOver = false;

for (let r = 0; r < ROWS; r++) {
  //Initialiserar spelbrädan med null-värden
  board[r] = Array(COLS).fill(null);
}

const boardDiv = document.getElementById("board"); // Hämta referens till spelbrädan i HTML
const messageDiv =
  document.getElementById("message") ||
  (() => {
    const div = document.createElement("div");
    div.id = "message";
    boardDiv.parentNode.insertBefore(div, boardDiv.nextSibling);
    return div;
  })();

function renderBoard() {
  boardDiv.innerHTML = ""; //Rensa spelbrädan
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (board[r][c] ? " " + board[r][c] : ""); //Lägg till klassnamn för cellen
      cell.dataset.row = r; //Spara rad och kolumn i datattribut
      cell.dataset.col = c; //Spara rad och kolumn i datattribut
      cell.addEventListener("click", () => handleMove(c)); //Lägg till klick-händelse
      boardDiv.appendChild(cell); //Lägg till cellen i spelbrädan
    }
  }
}

function handleMove(col) {
  // Hantera spelrörelse
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
  messageDiv.textContent = "Column is full!"; // Meddelande om att kolumnen är full
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 1000); // Ta bort meddelandet efter 1 sekund
}

function checkWin(row, col, player) {
  // Kontrollera om spelaren vinner
  function count(dx, dy) {
    // Räknar antalet i rad
    let r = row + dx,
      c = col + dy,
      count = 0;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += dx;
      c += dy;
    }
    return count;
  }

  return (
    // Kontrollera om spelaren vinner
    count(-1, 0) + count(1, 0) >= 3 || // vertical
    count(0, -1) + count(0, 1) >= 3 || // horizontal
    count(-1, -1) + count(1, 1) >= 3 || // diagonal /
    count(-1, 1) + count(1, -1) >= 3 // diagonal \
  );
}
const resetBtn = document.createElement("button"); // Skapa en knapp för att återställa spelet
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

renderBoard(); // Rendera spelbrädan
