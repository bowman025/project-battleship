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
        if (missed === false && made === false) return [x, y, opponent.gameboard.receiveAttack(x, y)];
        else return this.attack(opponent);
   }
    #choosePosition() {
        let x = Math.floor((Math.random() * 10));
        let y = Math.floor((Math.random() * 10));
        return [x, y];
    }
}