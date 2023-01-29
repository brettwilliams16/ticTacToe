const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector('.restart');
const winner = document.querySelector(".winner");
let x_turn = false;

const gameBoardInit = function(){
    const gameBoard = document.querySelector(".gameBoard");

    cells.forEach(cell => {
        cell.addEventListener('click', markListener, {once: true});
    }) 
}

const markListener = function(e) {
    const X_TURN = "X_TURN";
    const O_TURN = "O_TURN";

    cell = e.target;
    currentTurn = x_turn ? O_TURN : X_TURN;
    placeMarker(cell, currentTurn);
    if(checkForWin(currentTurn)){
        displayWinner(currentTurn);
        endGame();
    }
    x_turn = !x_turn;
}

const placeMarker = function(cell, currentClass){
    cell.classList.add(currentClass);
}


const restartGame = function() {
        cells.forEach(cell => {
            cell.classList.remove("X_TURN");
            cell.classList.remove("O_TURN");
        });

        winner.textContent = '';
        gameBoardInit();
};

const checkForWin = function(currentTurn){
    const winningCombonations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombonations.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentTurn);
        })
    })
}

const displayWinner = function(currentWinner) {
    if(currentWinner === "X_TURN"){
        winner.textContent = `X's have won!`;
    }
    else{
        winner.textContent = `O's have won!`;
    }
}

const endGame = function() {
    cells.forEach(cell => {
        cell.removeEventListener('click', markListener);
    });
}

gameBoardInit();
restartBtn.addEventListener('click', restartGame);






