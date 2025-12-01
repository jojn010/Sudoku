let mistakes = 0;
let wins = 0;
let games = 0;

const boardContainer = document.getElementById("game-board");
const mistakesDisplay = document.getElementById("mistakes");
const winsDisplay = document.getElementById("wins");
const gamesDisplay = document.getElementById("games");

document.getElementById("startBtn").addEventListener("click", startGame);

let selectedCell = null;
let board = [];
let solution = [];

// ------------------ LOGIN CHECK ------------------
window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("usernameDisplay").innerText = `Welcome, ${username}!`;
  } else {
    // not logged in → redirect
    window.location.href = "login.html";
  }
});

// ------------------ GAME LOGIC ------------------
function startGame() {
  const diff = document.getElementById("difficulty").value;
  games++;
  gamesDisplay.innerText = games;
  mistakes = 0;
  mistakesDisplay.innerText = mistakes;
  alert("Game started: " + diff + " mode!");
  generateSudoku(diff);
  renderBoard();
}

function generateSudoku(difficulty) {
  solution = generateFullBoard();
  board = solution.map(row => [...row]);

  let removeCount = 35;
  if (difficulty === "Medium") removeCount = 45;
  if (difficulty === "Hard") removeCount = 55;

  while (removeCount > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removeCount--;
    }
  }
}

// ------------------ BOARD RENDERING ------------------
function renderBoard() {
  boardContainer.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (board[row][col] !== 0) {
        cell.innerText = board[row][col];
        cell.classList.add("fixed");
      }
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => selectCell(cell));
      boardContainer.appendChild(cell);
    }
  }
}

function selectCell(cell) {
  if (selectedCell) selectedCell.classList.remove("selected");
  selectedCell = cell;
  cell.classList.add("selected");
  clearHighlights();
  const value = cell.innerText;
  if (value) highlightSameNumbers(value);
}

function highlightSameNumbers(value) {
  document.querySelectorAll(".cell").forEach(c => {
    if (c.innerText === value) c.classList.add("highlight");
  });
}

function clearHighlights() {
  document.querySelectorAll(".cell.highlight").forEach(c => c.classList.remove("highlight"));
}

// ------------------ KEYBOARD INPUT ------------------
document.addEventListener("keydown", (e) => {
  if (!selectedCell) return;
  if (selectedCell.classList.contains("fixed") || selectedCell.classList.contains("locked")) return;

  const row = parseInt(selectedCell.dataset.row);
  const col = parseInt(selectedCell.dataset.col);

  if (e.key >= "1" && e.key <= "9") {
      const num = parseInt(e.key);

      // always reset state
      selectedCell.classList.remove("correct", "incorrect");

      selectedCell.innerText = num;
      board[row][col] = num;

      if (solution[row][col] !== num) {
          selectedCell.classList.add("incorrect");
          mistakes++;
          mistakesDisplay.innerText = mistakes;
      } else {
          selectedCell.classList.add("correct");
          selectedCell.classList.add("locked"); // 🔒 lock it
          checkWin();
      }
  }
  else if (["Backspace", "Delete", "0"].includes(e.key)) {
    selectedCell.innerText = "";
    board[row][col] = 0;
    selectedCell.classList.remove("incorrect", "correct");
  }
});

// ------------------ GENERATOR FUNCTIONS ------------------
function generateFullBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let i = 0; i < 9; i += 3) fillBox(board, i, i);
  solveBoard(board);
  return board;
}

function fillBox(board, row, col) {
  let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = nums.pop();
    }
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function solveBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true
}
function checkWin() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== solution[r][c]) return;
    }
  }

  wins++;
  winsDisplay.innerText = wins;
  alert("🎉 You solved the Sudoku!");

  const userId = localStorage.getItem("userId");
  const difficulty = document.getElementById("difficulty").value;
  let score = 1000;
  if (difficulty === "Hard") {
    score = score * 10 - mistakes * 2;
  } else if (difficulty === "Medium") {
    score = score * 5 - mistakes * 1.5;
  } else {
    score = score - mistakes;
  }
  const win = true;
  fetch(`http://localhost:8089/api/users/saveGame?userId=${userId}&mistakes=${mistakes}&score=${score}&win=${win}`, {
    method: "POST"
  })
    .then(res => {
      if (res.ok) {
        console.log("Game saved automatically! 🔥");
      } else {
        console.error("Failed to save game.");
      }
    })
    .catch(err => console.error("Error saving game:", err));
}