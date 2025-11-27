import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.gameboard = new Gameboard;
    }
}

export class ComputerPlayer extends Player {
    constructor(name, id) {
        super(name, id);
    }
    attack(opponent) {
        const [x, y] = this.#choosePosition();
        const missed = opponent.gameboard.missedAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
        const made = opponent.gameboard.madeAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
        if (missed === false && made === false && this.#checkBuffer(opponent, x, y) === true) {
            let [a, b, result] = [x, y, opponent.gameboard.receiveAttack(x, y)];
            if (result === 'hit') this.#hitCoordinates.push([x, y]);
            else if (result === 'sunk') this.#hitCoordinates = [];
            return [a, b, result];
        } else return this.attack(opponent);
    }
    #choosePosition() {
        if (this.#hitCoordinates.length === 0) {
            const x = Math.floor((Math.random() * 10));
            const y = Math.floor((Math.random() * 10));
            return [x, y];
        } else {
        const coord = this.#hitCoordinates.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        const [x, y] = coord[0];
        const last = coord.length - 1;
        let pos = [];
        if (coord.length === 1) {
            if (x > 0) pos.push([x - 1, y]);
            if (x < 9) pos.push([x + 1, y]);
            if (y > 0) pos.push([x, y - 1]);
            if (y < 9) pos.push([x, y + 1]);
        } else {
            const [a, b] = coord[last];
            if (x === a && y + last === b) {
                if (y > 0) pos.push([x, y - 1]);
                if (b < 9) pos.push([a, b + 1]);
            } else if (x + last === a && y === b) {
                if (x > 0) pos.push([x - 1, y]);
                if (a < 9) pos.push([a + 1, b]);
            }
        }
        let index = Math.floor(Math.random() * pos.length);
        return pos[index];
        }
    }
    #hitCoordinates = [];
    #checkBuffer(opponent, x, y) {
        return opponent.gameboard.board[x][y] === 2 ? false : true;
    }
}