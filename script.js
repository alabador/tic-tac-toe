const board = document.querySelector('.gameboard');
let squares = document.querySelectorAll('.square');


//player clicks on board, calls updateBoard(), each marker is assigned a value, 
//then win conditions are checked.
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
        for(let i = 0; i < _gameboardArray.length; i += 3){
            const winRow = _gameboardArray.slice(i, i+3);
            const winRowValue = winRow.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            _checkValue(winRowValue);
        }
        //Check columns for win condition
        for(let i = 0; i < 3; i++){
            let winCol = [_gameboardArray[i],_gameboardArray[i+3],_gameboardArray[i+6]];
            const winColValue = winCol.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
            _checkValue(winColValue);
        };
        //Check diagonals for win condition
        for(let i = 0; i < 3; i += 2){
            let winDiag = [];
            if (i==0){
                winDiag = [_gameboardArray[i],_gameboardArray[i+4],_gameboardArray[i+8]];
            }
            else if (i==2){
                winDiag = [_gameboardArray[i],_gameboardArray[i+2],_gameboardArray[i+4]];
            }
            const winDiagValue = winDiag.reduce((previousValue, currentValue) => 
                previousValue + currentValue, 0);
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
            player1.winner = "tied";
            player2.winner = "tied";
            announcement.winner.textContent = "It's a tie!";
            announcement.showAnnouncement();
            controlPanel.showControls();
        }
    }
    //if a player is marked as winner,declares winner then stops game.
    function _checkWinningPlayer() {
        if (player1.winner == true){
            announcement.winner.textContent = `${player1.name} wins!`;
            announcement.showAnnouncement();
            controlPanel.showControls();
        }
        else if (player2.winner == true){
            announcement.winner.textContent = `${player2.name} wins!`;
            announcement.showAnnouncement();
            controlPanel.showControls();
        }
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
        if (player1.winner == false && player2.winner == false && !_gameboardArray.includes(0)){
            _checkTie();  
        }
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
    };
    function resetGameboard () {
        _gameboardArray = [
            '','','',
            '','','',
            '','',''
        ];
        while (board.firstChild) {
            board.removeChild(board.lastChild);
        }
    }
    return {renderGameboard, updateBoard, showGameboardArray, resetGameboard};
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
                if (e.target.textContent == player1.marker || e.target.textContent == player2.marker) {
                    return;
                }
                else if (player1.winner == true || player2.winner == true || player1.winner == "tied") {
                    return;
                }
                else {
                    e.target.textContent = currentPlayer.marker;
                    gameboard.updateBoard(currentIndex, currentPlayer.marker);
                    switchPlayer();
                }
            });
        }); 
    };
    function resetStartingPlayer() {
        currentPlayer = player1;
    }
    return {switchPlayer, enableMarking, resetStartingPlayer}
})();

const startMenu = {
    start: document.querySelector('.start'),
    menu: document.querySelector('.menu'),
    player1Name: document.querySelector('#player1'),
    player2Name: document.querySelector('#player2'),
    newGame: function() {
        startMenu.menu.classList.toggle('invisible');
        currentPlayer.enableMarking();
    },
    submitNames: function() {
        player1.name = startMenu.player1Name.value;
        player2.name = startMenu.player2Name.value;
    },
    showStart: function() {
        let player1 = startMenu.player1Name.value;
        let player2 = startMenu.player2Name.value;
        console.log(player1);
        console.log(player2);
        if (player1.length > 0 && player2.length > 0){
            startMenu.start.classList.remove('invisible');
        }
    },
};

const controlPanel = {
    controls: document.querySelector('.game-controls'),
    end: document.querySelector('.end'),
    restart: document.querySelector('.restart'),
    showControls: function() {
        controlPanel.controls.classList.toggle('invisible');
    },
    endGame: function() {
        startMenu.menu.classList.toggle('invisible');
        controlPanel.restartGame();
    },
    restartGame: function() {
        gameboard.resetGameboard();
        gameboard.renderGameboard();
        squares = document.querySelectorAll('.square');
        currentPlayer.enableMarking();
        currentPlayer.resetStartingPlayer();
        player1.winner = false;
        player2.winner = false;
        announcement.winner.textContent = '';
        announcement.showAnnouncement();
        controlPanel.showControls();
    }
}

const announcement = {
    gameStatus: document.querySelector('.announcement'),
    winner: document.querySelector('.winner'),
    showAnnouncement: function() {
        announcement.gameStatus.classList.toggle('invisible');
    }
}


startMenu.start.addEventListener('click', startMenu.newGame);
startMenu.start.addEventListener('click', startMenu.submitNames);
startMenu.player1Name.addEventListener('change', startMenu.showStart);
startMenu.player2Name.addEventListener('change', startMenu.showStart);
controlPanel.end.addEventListener('click', controlPanel.endGame);
controlPanel.restart.addEventListener('click', controlPanel.restartGame);

//Initialize on load
window.onload = gameboard.renderGameboard();
squares = document.querySelectorAll('.square');