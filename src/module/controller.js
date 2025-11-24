import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';
import { ComputerPlayer, Player } from './player.js';

const createPlayers = (value) => {
    let player1 = new Player('Player 1');
    let player2;
    if (value === 'Computer') player2 = new ComputerPlayer('Computer');
    else player2 = new Player('Player 2');
    return {player1, player2};
}

const playRound = (value) => {
    const {player1, player2} = createPlayers(value);
    let activePlayer = player1;
    const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActivePlayer = () => activePlayer;
    const checkWinner = () => {
    let gameWinner;
    if (player1.gameboard.checkSunk()) gameWinner = player2;
    else if (player2.gameboard.checkSunk()) gamewinner = player1;
    else return false;
    return gamewinner.name;
    }
}