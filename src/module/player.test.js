import { Player, ComputerPlayer } from "./player.js";

test('Creates a new player and their board', () => {
    const player = new Player('Jimmy');
    expect(player.name).toBe('Jimmy');
    expect(Array.isArray(player.gameboard.board)).toBe(true);
});

test('Creates a computer player and their board', () => {
    const comp = new ComputerPlayer('Hal');
    expect(comp.name).toBe('Hal');
    expect(Array.isArray(comp.gameboard.board)).toBe(true);
});