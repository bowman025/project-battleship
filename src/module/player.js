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
            if (missed === false && made === false) {
                return [x, y, opponent.gameboard.receiveAttack(x, y)];
            } else return this.attack(opponent);
        /* if (this.hit === 0) {
            const [x, y] = this.#choosePosition();
            const missed = opponent.gameboard.missedAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
            const made = opponent.gameboard.madeAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
            if (missed === false && made === false) {
                let [a, b, result] = [x, y, opponent.gameboard.receiveAttack(x, y)];
                if (result === 'hit') {
                    this.hit = 1;
                    this.coordinates.push([x, y]);
                    return [a, b, result];
                }
            } else return this.attack(opponent);
        } else if (this.hit === 1) {
            let [x, y] = this.#chooseOrientation(this.coordinates[0]);
            const missed = opponent.gameboard.missedAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
            const made = opponent.gameboard.madeAttacks.some(position => JSON.stringify(position) === JSON.stringify([x, y]));
            if (missed === false && made === false) {
                let result = [x, y, opponent.gameboard.receiveAttack(x, y)];
                if (result === 'hit') {
                    this.hit = 2;
                    this.coordinates.push([x, y]);
                    return result;
                }
            } else return this.attack(opponent);
        } else if (this.hit === 2) {

        } */
   }
    #choosePosition() {
        let x = Math.floor((Math.random() * 10));
        let y = Math.floor((Math.random() * 10));
        return [x, y];
    }
    #chooseOrientation([x, y]) {
        let positions = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
        let index = Math.floor(Math.random() + positions.length);
        return positions[index];
    }
    hit = 0;
    coordinates = [];
}