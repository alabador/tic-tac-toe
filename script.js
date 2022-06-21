const board = document.querySelector('.gameboard');

const gameboard = (() => {
    const _gameboardArray = [
        'X','O','X',
        'O','O','X',
        'X','X','O'
    ];

    function renderGameboard() {
        // const board = document.querySelector('.gameboard');
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

const currentPlayer = ((player) => {

})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    
    function allowClick() {
        board.addEventListener('click', (e) => {
            console.log(e.target);
        });
    };

    return {getName, getMarker, allowClick};
}

const player1 = Player('player1', 'X');
// const player2 = Player('player2', 'O');

//Event listeners
window.onload = gameboard.renderGameboard();