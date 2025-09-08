export default class Gameboard {
    constructor() {
        this.rows = 10
        this.cols = 10
        this.board = Array.from({length: this.rows}, () => 
            new Array(this.cols).fill(0)
        )
    }
}