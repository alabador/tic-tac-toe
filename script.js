
const gameboard = (() => {
    const _gameboardArray = [
        'X','O','X',
        'O','O','X',
        'X','X','O'
    ];

    function renderGameboard() {
        const board = document.querySelector('.gameboard');
        
        for (let i=0; i<_gameboardArray.length; i++){
            let currentMarker = _gameboardArray[i];
            let newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.textContent = currentMarker;
            board.appendChild(newSquare);

        }
    }

    return {renderGameboard};
})();

const player = (name, marker) => {

    return {name, marker};
}