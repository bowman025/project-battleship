import { Gameboard } from "./gameboard.js";

test('check length of board', () => {
    const brd = new Gameboard;
    expect(brd.board.length).toBe(10);
});

test('check if carrier is added to board', () => {
    const brd = new Gameboard;
    brd.placeShip('Carrier', 'Horizontal', 0, 0);
    expect(brd.board[0][0]).toBe(1);
    expect(brd.board[0][1]).toBe(1);
    expect(brd.board[0][2]).toBe(1);
    expect(brd.board[0][3]).toBe(1);
    expect(brd.board[0][4]).toBe(1);
});

test('check if attacks register correctly', () => {
    const brd = new Gameboard;
    brd.placeShip('Battleship', 'Horizontal', 5, 0);
    brd.receiveAttack(5, 0);
    expect(brd.board[5][0]).toBe(2);
    brd.receiveAttack(7, 7);
    expect(brd.missedAttacks).toEqual(expect.arrayContaining([[7, 7]]));
});

test('check if all ships are have been sunk', () => {
    const brd = new Gameboard;
    brd.placeShip('Carrier', 'Horizontal', 0, 0);
    brd.placeShip('Battleship', 'Horizontal', 5, 0);
    brd.placeShip('Submarine', 'Vertical', 7, 7);
    brd.receiveAttack(0, 0);
    brd.receiveAttack(0, 1);
    brd.receiveAttack(0, 2);
    brd.receiveAttack(0, 3);
    brd.receiveAttack(0, 4);
    brd.receiveAttack(5, 0);
    brd.receiveAttack(5, 1);
    brd.receiveAttack(5, 2);
    brd.receiveAttack(5, 3);
    brd.receiveAttack(7, 7);
    brd.receiveAttack(8, 7);
    brd.receiveAttack(9, 7);
    expect(brd.checkSunk()).toBe(true);
});