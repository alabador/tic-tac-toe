
const gameboard = (() => {
    const _gameboardArray = [
        'X','O','X',
        'O','O','X',
        'X','X','O'
    ];

    function renderGameboard() {
        const board = document.querySelector('.gameboard');
        for (let i=0; i<gameboardArray.length; i++){
            let currentMarker = gameboardArray[i];
            _createDiv();
        }
    }

    function _createDiv() {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
    }

    return {renderGameboard};
})();

const player = (name, marker) => {

    return {name, marker};
}