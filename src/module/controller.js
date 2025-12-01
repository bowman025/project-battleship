import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';
import { ComputerPlayer, Player } from './player.js';

export function initializePlayers(type) {
    const player1 = new Player('Player 1', 1);
    if (type === 'Human') {
        const player2 = new Player('Player 2', 2);
        return [player1, player2];
    } else if (type === 'Computer') {
        const comp = new ComputerPlayer('Player 2', 2);
        return [player1, comp];
    } else return false;
}

export function attack(player, coordinates) {
    return player.gameboard.receiveAttack(coordinates[1], coordinates[2]);
}

export function randomizeShips(player) {
    player.gameboard.placeShipsRandomly();
}

export function resetShips(player) {
    player.gameboard.resetBoard();
}

export function addShip(player, name, orientation, x, y) {
    const a = Number(x);
    const b = Number(y);
    return player.gameboard.placeShip(name, orientation, a, b);
}