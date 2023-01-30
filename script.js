const cells = document.querySelectorAll(".cell");
const startBtn = document.querySelector('.restart');
const winner = document.querySelector(".winner");
const gameBoard = document.querySelector(".gameBoard");
let x_turn = false;

const gameBoardCPUInit = function() {
    gameBoard.classList.add("X_TURN");
    cells.forEach(cell => {
        cell.addEventListener("click", cpuMarkListener, {once: true});
    })
}

const gameBoardPlayerInit = function(){ // initalizes the game board
    let classToAdd = x_turn ? "O_TURN" : "X_TURN";
    gameBoard.classList.add(classToAdd);
    cells.forEach(cell => {
        cell.addEventListener('click', markListener, {once: true});
    }) 
}

const cpuMove = function(currentClass) {
    let cell = Math.floor(Math.random() * 8);
    while(cells[cell].classList.contains("O_TURN") || cells[cell].classList.contains("X_TURN")){
        cell = Math.floor(Math.random() * 8);
    }
    cells[cell].classList.add(currentClass);
}

const markListener = function(e) {
    const X_TURN = "X_TURN";
    const O_TURN = "O_TURN";

    cell = e.target;
    currentTurn = x_turn ? O_TURN : X_TURN; // checks to see whos turn it is
    placeMarker(cell, currentTurn);
    if(checkForTie()){ // checks for tie
        displayTie();
        endGame();
    }
    if(checkForWin(currentTurn)){ // checks for win
        displayWinner(currentTurn);
        endGame();
    }
    x_turn = !x_turn; // switches turn
}

const cpuMarkListener = function(e){
    const playerClass = "X_TURN";
    const cpuClass = "O_TURN";

    cell = e.target;
    placeMarkerCPU(cell, playerClass);
    if(checkForWin(playerClass)){
        displayWinner(playerClass);
        endGame();
        return;
    }
    if(checkForTie()){
        displayTie();
        endGame();
        return;
    }
    cpuMove(cpuClass);
    if(checkForWin(cpuClass)){
        displayWinner(cpuClass);
        endGame();
    }
    if(checkForTie()){
        displayTie();
        endGame();
    }
}

const placeMarker = function(cell, currentClass){
    let newClass;
    cell.classList.add(currentClass); // adds the current turns mark to the cell chosen
    gameBoard.classList.remove(currentClass);
    if(currentClass === "X_TURN"){
        newClass = "O_TURN";
    }
    else{
        newClass = "X_TURN";
    }
    gameBoard.classList.add(newClass);
    
}

const placeMarkerCPU = function(cell, currentClass){
    cell.classList.add(currentClass); // adds the current turns mark to the cell chosen    
}

const restartGame = function() {
        const checkedBtn = document.querySelector('input[name="cpuOrHuman"]:checked').value;
        cells.forEach(cell => {
            cell.classList.remove("X_TURN");
            cell.classList.remove("O_TURN");
        });
        gameBoard.classList.remove("O_TURN");
        gameBoard.classList.remove("X_TURN");
        winner.textContent = ''; // function clears the entire board
        console.log(checkedBtn);
        if(checkedBtn === "human"){
            gameBoardPlayerInit();
        }
        else{
            gameBoardCPUInit();
        }
};

const checkForWin = function(currentTurn){
    const winningCombonations = [ // all possible winning combinations
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
            return cells[index].classList.contains(currentTurn); // checks to see if any combination has    been matched
        })
    })
}

const displayWinner = function(currentWinner) { // if won, adds either "X's" or "O's" have won
    if(currentWinner === "X_TURN"){
        winner.textContent = `X's have won!`; 
    }
    else{
        winner.textContent = `O's have won!`;
    }
}

const endGame = function() {
    cells.forEach(cell => {
        cell.removeEventListener('click', markListener); // removes the ability to add marks to cells
    });
}

const checkForTie = function() {
    const myCells = [...cells]; // converts cells into an array
    return myCells.every(cell => {
        return cell.classList.contains("X_TURN") || cell.classList.contains("O_TURN");
    })
}

const displayTie = function() {
    winner.textContent = `It was a tie!`; // displays tie
}

startBtn.addEventListener('click', restartGame);






