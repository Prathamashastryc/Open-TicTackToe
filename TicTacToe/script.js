const board = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const newGameBtn = document.getElementById('newGameBtn');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameState[index] === '' && gameActive) {
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      messageElement.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
      messageElement.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function resetBoard() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  board.forEach(cell => {
    cell.textContent = '';
  });
  messageElement.textContent = '';
  gameActive = true;
  currentPlayer = 'X';
}

function startNewGame() {
  resetBoard();
  currentPlayer = 'X';  // Reset the starting player for the new game
}

board.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', resetBoard);
newGameBtn.addEventListener('click', startNewGame);
