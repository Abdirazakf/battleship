export default class Ship {
    constructor() {
        this.carrier = {
            length: 5,
            hits: 0,
            sunk: false
        }

        this.battleship = {
            length: 4,
            hits: 0,
            sunk: false
        }

        this.destroyer = {
            length: 3,
            hits: 0,
            sunk: false
        }

        this.submarine = {
            length: 3,
            hits: 0,
            sunk: false
        }

        this.patrolBoat = {
            length: 2,
            hits: 0,
            sunk: false
        }
    }
}