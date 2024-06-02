// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameStatus = document.getElementById('gameStatus');
let currentPlayer = 'X';
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

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = currentPlayer === 'X' ? 'x' : 'o';
    if (cell.innerText === '' && gameActive) {
        cell.innerText = currentPlayer;
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }
};

const swapTurns = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';
    });
};

const endGame = (draw) => {
    if (draw) {
        gameStatus.innerText = 'It\'s a Draw!';
    } else {
        gameStatus.innerText = `Player ${currentPlayer} Wins!`;
    }
    gameActive = false;
};

const startGame = () => {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    gameStatus.innerText = `Player X's turn`;
    currentPlayer = 'X';
    gameActive = true;
};

startGame();
