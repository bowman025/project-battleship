export class Ship {
    constructor(name) {
        this.name = name;
        this.hits = 0;
        switch (name) {
            case 'Carrier':
                this.length = 5;
                break;
            case 'Battleship':
                this.length = 4;
                break;
            case 'Destroyer':
                this.length = 3;
                break;
            case 'Submarine':
                this.length = 3;
                break;
            case 'Patrol Boat':
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