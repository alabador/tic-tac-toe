const board = document.querySelector('.gameboard');
let squares = document.querySelectorAll('.square');

const gameboard = (() => {
    let _gameboardArray = [
        '','','',
        '','','',
        '','',''
    ];

    function renderGameboard() {
        for (let i=0; i<_gameboardArray.length; i++){
            let currentMarker = _gameboardArray[i];
            let newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.textContent = currentMarker;
            board.appendChild(newSquare);
        }
    };

    function showGameboardArray () {
        console.log(_gameboardArray);
    }

    function updateBoard(index, marker) {
        _gameboardArray[index] = marker;
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
    let players = [player1, player2];
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

    return {currentPlayer, switchPlayer, enableMarking}

})();

//Initialize on load
window.onload = gameboard.renderGameboard();
squares = document.querySelectorAll('.square');