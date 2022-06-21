const board = document.querySelector('.gameboard');

const gameboard = (() => {
    const _gameboardArray = [
        'X','O','X',
        'O','O','X',
        'X','X','O'
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

    function updateBoard() {

    };

    return {renderGameboard, updateBoard};
})();

const Player = (name, marker) => {

    return {name, marker};
}

const player1 = Player('player1', 'X');
const player2 = Player('player2', 'O');

const currentPlayer = (() => {
    let players = [player1, player2];
    let currentPlayer = player1;

    function _switchPlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        }
        else if (currentPlayer == player2) {
            currentPlayer = player1;
        }
    }

    board.addEventListener('click', (e) => {
        e.target.textContent = currentPlayer.marker;
        _switchPlayer();
    });
})();

//Event listeners
window.onload = gameboard.renderGameboard();