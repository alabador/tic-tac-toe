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
            console.log(winRowValue);
        }
        for(let i=0; i<3; i++){
            let winCol = [_gameboardArray[i],_gameboardArray[i+3],_gameboardArray[i+6]];
            const winColValue = winCol.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            console.log(winColValue);
        };
    };
    function _assignMarkerValue() {
        // put this in checkwin()
        //check value of index (either x, o, or '')
        //loop through array and assign each index a numerical value
        //once you do this, use these values in check win --> add up to check win 
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

    return {name, marker};
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