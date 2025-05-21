let cells = document.querySelectorAll(".cell");
let cellArray = Array.from(cells);
let currentPlayer = "X";
let gameActive = true;
let statusDisplay = document.getElementById("status");


function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cellArray[a].textContent &&
      cellArray[a].textContent === cellArray[b].textContent &&
      cellArray[a].textContent === cellArray[c].textContent
    ) {
      gameActive = false;
      [a, b, c].forEach(i => cellArray[i].style.backgroundColor = "#d4ffd4");
      return true;
    }
  }
  if (cellArray.every((cell) => cell.textContent)) {
    gameActive = false;
    return true;
  }
  return false;
}

function handleCellClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent) return;
  cell.textContent = currentPlayer;
  if (!checkWinner()) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

cellArray.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  cellArray.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  currentPlayer = "X";
  gameActive = true;

});

