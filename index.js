const statusDisplay = document.querySelector(".game--status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Jogador ${currentPlayer} venceu!`;
const drawMessage = () => `Deu velha!`;
const currentPlayerTurn = () => `É a vez do ${currentPlayer}'`;

statusDisplay.innerHTML = currentPlayerTurn();

// Array com as condições para a vitória
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Função para inserir a jogada da rodada
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

// Função para trocar o jogador a cada rodada
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

// Função para verificar o resultado
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];

    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  // Caso haja a vitória, exibe a mensagem de vitória e seta o jogo como false
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  // Caso seja um empate exibe a mensagem e seta o status do jogo como false
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

// Função que verifica o clique
function handleCellClick(e) {
  console.log(e);
  let clickedCell = e.target;
  let index = parseInt(clickedCell.getAttribute("data-cell-index"));
  if (gameState[index] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, index);
  handleResultValidation();
}

// Função para reiniciar o jogo
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((grid) => {
    grid.innerHTML = "";
  });
}
document.querySelectorAll(".cell").forEach((grid) => {
  grid.addEventListener("click", handleCellClick);
});

document 
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);