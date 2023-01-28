const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector('.restart');
const winner = document.querySelector(".winner");

const gameBoardInit = function(){
    const gameBoard = document.querySelector(".gameBoard");

    const X_TURN = "X_TURN";
    const O_TURN = "O_TURN";
    let currentTurn = X_TURN;

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            let cell = e.target;
            if(!(cell.classList.contains("X_TURN") || cell.classList.contains("O_TURN"))){
                if(currentTurn === X_TURN){
                    cell.classList.add("X_TURN");
                    console.log(checkForWin(currentTurn));
                    if(checkForWin(currentTurn)){
                       displayWinner(currentTurn); 
                        //  endGame();
                    }
                    currentTurn = O_TURN;
                }
                else{
                    cell.classList.add("O_TURN");
                    console.log(checkForWin(currentTurn));
                    if(checkForWin(currentTurn)){
                        displayWinner(currentTurn);
                        // endGame();
                    }
                    currentTurn = X_TURN;
                }
            }
        });
    });
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

// const endGame = function() {
//     cells.forEach(cell => {
//         cell.removeEventListener('click', )
//     });
// }

gameBoardInit();
restartBtn.addEventListener('click', restartGame);






