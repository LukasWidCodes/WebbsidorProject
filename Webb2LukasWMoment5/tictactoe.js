let cells = document.querySelectorAll(".cell");
let cellArray = Array.from(cells);
let currentPlayer = "X";
let gameActive = true;
let statusDisplay = document.getElementById("status");


function checkWinner() { // Kontrollera om det finns en vinnare
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
  for (let pattern of winPatterns) { // Loopar igenom alla vinstmönster
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
  if (cellArray.every((cell) => cell.textContent)) { // Kontrollera om alla celler är fyllda
    gameActive = false;
    return true;
  }
  return false;
}

function handleCellClick(e) { // Hantera cellklick
  const cell = e.target; // Hämta cellen som klickades
  if (!gameActive || cell.textContent) return; // Om spelet är över eller cellen redan är fylld
  cell.textContent = currentPlayer;
  if (!checkWinner()) { // Kontrollera om det finns en vinnare
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

cellArray.forEach((cell) => { // Loopar igenom alla celler
  cell.addEventListener("click", handleCellClick); // Lägg till klick-händelse
});

let resetButton = document.getElementById("reset"); // Hämta referens till reset-knappen
resetButton.addEventListener("click", function () { // Hantera reset-knappen
  cellArray.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  currentPlayer = "X";
  gameActive = true;

});

