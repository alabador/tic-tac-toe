const board = document.querySelector('.gameboard');
let squares = document.querySelectorAll('.square');

const gameboard = (() => {
    let _gameboardArray = [
        '','','',
        '','','',
        '','',''
    ];
    function _checkWin() {
        const xWins = 3;
        const oWins = -3;
        //Check rows for win condition
        for(let i=0; i<_gameboardArray.length; i+=3){
            const winRow = _gameboardArray.slice(i,i+3);
            const winRowValue = winRow.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            _checkValue(winRowValue);
        }
        //Check columns for win condition
        for(let i=0; i<3; i++){
            let winCol = [_gameboardArray[i],_gameboardArray[i+3],_gameboardArray[i+6]];
            const winColValue = winCol.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            console.log(winColValue);
            _checkValue(winColValue);
        };
        //Check diagonals for win condition
        for(let i=0; i<3; i+=2){
            let winDiag = [];
            if (i==0){
                winDiag = [_gameboardArray[i],_gameboardArray[i+4],_gameboardArray[i+8]];
            }
            else if (i==2){
                winDiag = [_gameboardArray[i],_gameboardArray[i+2],_gameboardArray[i+4]];
            }
            const winDiagValue = winDiag.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            console.log(winDiagValue);
            _checkValue(winDiagValue);
        };
    };
    function _checkValue(value) {
        if (value == 3){
            return player1.winner = true;
        }
        else if (value == -3){
            return player2.winner = true;
        }
        else {
            return;
        }
    }
    function _checkTie() {
        if (!_gameboardArray.includes(0)){
            console.log('Game is tied');
        }
    }
    //if a player is marked as winner, then stops game.
    function _checkWinningPlayer() {
        
    }
    function _assignMarkerValue() {
        for (let i=0; i<_gameboardArray.length; i++){
            if (_gameboardArray[i] == 'X' || _gameboardArray[i] == 1){
                _gameboardArray[i]= 1;
            }
            else if (_gameboardArray[i] == 'O' || _gameboardArray[i] == -1){
                _gameboardArray[i] = -1;
            }
            else {
                _gameboardArray[i] = 0;
            }
        }
        _checkWin();
        _checkTie();
        _checkWinningPlayer();
    }
    function renderGameboard() {
        for (let i=0; i<_gameboardArray.length; i++){
            let currentMarker = _gameboardArray[i];
            let newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.textContent = currentMarker;
            board.appendChild(newSquare);
        }
    };
    //For troubleshooting purposes
    function showGameboardArray () {
        console.log(_gameboardArray);
        return _gameboardArray;
    }
    function updateBoard(index, marker) {
        _gameboardArray[index] = marker;
        _assignMarkerValue();
        console.log(_gameboardArray);
    };
    return {renderGameboard, updateBoard, showGameboardArray};
})();

const Player = (name, marker) => {
    let winner = false;
    return {name, marker, winner};
}

const player1 = Player('player1', 'X');
const player2 = Player('player2', 'O');

const currentPlayer = (() => {
    let currentPlayer = player1;
    function switchPlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        }
        else if (currentPlayer == player2) {
            currentPlayer = player1;
        }
    };
    function enableMarking() {
        squares.forEach((square, currentIndex) => {
            square.addEventListener('click', (e) => {
                e.target.textContent = currentPlayer.marker;
                gameboard.updateBoard(currentIndex, currentPlayer.marker);
                switchPlayer();
            });
        }); 
    }
    return {switchPlayer, enableMarking}
})();

//Initialize on load
window.onload = gameboard.renderGameboard();
squares = document.querySelectorAll('.square');