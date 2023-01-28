const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector('.restart');

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
                    currentTurn = O_TURN;
                }
                else{
                    cell.classList.add("O_TURN");
                    console.log(checkForWin(currentTurn));
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

console.log(winningCombonations);

gameBoardInit();
restartBtn.addEventListener('click', restartGame);






