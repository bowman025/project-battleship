import { Ship } from './ship.js';

const ship = new Ship('Carrier');
const ship2 = new Ship('Destroyer');
const ship3 = new Ship('Patrol Boat');

test('checks ship length', () => {
    expect(ship.length).toBe(5);
    expect(ship2.length).toBe(3);
    expect(ship3.length).toBe(2);
});

test('checks ship hits and sunk status', () => {
    ship3.hit();
    expect(ship3.hits).toBe(1);
    ship3.hit();
    expect(ship3.hits).toBe(2);
    expect(ship3.isSunk()).toBeTruthy();
    expect(ship.isSunk()).toBeFalsy();
});