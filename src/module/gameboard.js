import { Ship } from "./ship.js";

//add getters and setters, make board a private property

export class Gameboard {
    constructor() {
        this.board = Array.from({length: 10}, () => new Array(10).fill(0));
        // 0 = empty, 1 = ship, 2 = hit, -1 = miss; 
    }
    shipInventory = [];
    missedAttacks = [];
    madeAttacks = [];
    placeShip(name, orientation, x, y) {
        let ship = new Ship(name);
        let empty = true;
        if (orientation === 'Horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (y + i > 9 || this.board[x][y + i] === 1) return empty = false;
                if (i === 0) {
                    if (y > 0 && this.board[x][y - 1] === 1 || x > 0 && this.board[x - 1][y] === 1 || x < 9 && this.board[x + 1][y] === 1 || x > 0 && y > 0 && this.board[x - 1][y - 1] === 1 || x < 9 && y > 0 && this.board[x + 1][y - 1] === 1 ) return empty = false;
                } else if (i > 0 && i < ship.length - 1) {
                    if (x > 0 && this.board[x - 1][y + i] === 1 || x < 9 && this.board[x + 1][y + i] === 1) return empty = false;
                } else if (i === ship.length - 1) {
                    if (y + i < 9 && this.board[x][y + i + 1] === 1 || x > 0 && this.board[x - 1][y + i] === 1 || x < 9 && this.board[x + 1][y + i] === 1 || x > 0 && y + i < 9 && this.board[x - 1][y + i + 1] === 1 || x < 9 && y + i < 9 && this.board[x + 1][y + i + 1] === 1) return empty = false;
                }
            }
            if (empty === true) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[x][y + i] = 1;
                    ship.position.push([x, y + i]);
                }
                this.shipInventory.push(ship);
                return empty;
            } else return false;
        } else if (orientation === 'Vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (x + i > 9 || this.board[x + i][y] === 1) return empty = false;
                if (i === 0) {
                    if (x > 0 && this.board[x - 1][y] === 1 || y > 0 && this.board[x][y - 1] === 1 || y < 9 && this.board[x][y + 1] === 1 || x > 0 && y > 0 && this.board[x - 1][y - 1] === 1 || x > 0 && y < 9 && this.board[x - 1][y + 1] === 1) return empty = false;
                } else if (i > 0 && i < ship.length - 1) {
                    if (y > 0 && this.board[x + i][y - 1] === 1 || y < 9 && this.board[x + i][y + 1] === 1) return empty = false;
                } else if (i === ship.length - 1) {
                    if (x + i < 9 && this.board[x + i + 1][y] === 1 || y > 0 && this.board[x + i][y - 1] === 1 || y < 9 && this.board[x + i][y + 1] === 1 || x + i < 9 && y > 0 && this.board[x + i + 1][y - 1] === 1 || x + i < 9 && y < 9 && this.board[x + i + 1][y + 1] === 1) return empty = false;
                }
            }
            if (empty === true) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[x + i][y] = 1;
                    ship.position.push([x + i, y]);
                }
                this.shipInventory.push(ship);
                return empty;
            } else return false;
        } else return false;
    }
    receiveAttack(x, y) {
        if (this.board[x][y] === 1) {
            this.board[x][y] = 2;
            const targetedShip = this.#findShip(x, y);
            targetedShip.hit();
            console.log(targetedShip);
            this.madeAttacks.push([x, y]);
            if (targetedShip.isSunk()) return 'sunk';
            else return 'hit';
        }
        else if (this.board[x][y] === 0) {
            this.board[x][y] = -1;
            this.missedAttacks.push([x, y]);
            return 'miss';
        } else return false;
    }
    #findShip(x, y) {
        const targetPosition = [Number(x), Number(y)];
        for (let i = 0; i < this.shipInventory.length; i++) {
            let status = this.shipInventory[i].position.some(coordinate => coordinate.length === targetPosition.length && coordinate.every((value, index) => value === targetPosition[index]));
            if (status) return this.shipInventory[i];
        }
    }
    checkSunk() {
        for (let i = 0; i < this.shipInventory.length; i++) {
            if (!this.shipInventory[i].isSunk()) return false;
        }
        return true;
    }
    placeShipsRandomly() {
        this.resetBoard();
        const ships = ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat'];
        const orientation = ['Horizontal', 'Vertical'];
        for (let i = 0; i < ships.length; i++) {
            let status = false;
            while (status === false) {
                const index = Math.floor(Math.random() * 2);
                const x = Math.floor((Math.random() * 10));
                const y = Math.floor((Math.random() * 10));
                status = this.placeShip(ships[i], orientation[index], x, y);
            }
        }
    }
    resetBoard() {
        this.shipInventory.length = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) this.board[i][j] = 0;
        }
        console.log(this.board);
        console.log(this.shipInventory);
    }
}