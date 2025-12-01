export class Ship {
    constructor(name) {
        this.name = name;
        this.hits = 0;
        switch (name) {
            case 'carrier':
                this.length = 5;
                break;
            case 'battleship':
                this.length = 4;
                break;
            case 'destroyer':
                this.length = 3;
                break;
            case 'submarine':
                this.length = 3;
                break;
            case 'patrol-boat':
                this.length = 2;
                break;
            default:
                break;
        }
    }
    orientation = '';
    position = [];
    hit() {
        this.hits++;
    }
    isSunk() {
        return this.hits >= this.length ? true : false;
    }
}