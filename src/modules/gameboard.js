export default class Gameboard {
    constructor() {
        this.rows = 10
        this.cols = 10
        this.board = Array.from({length: this.rows}, () => 
            new Array(this.cols).fill(null)
        )
    }

    validPosition(ship, row, col, direction) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return false
        }
        
        if (direction === 'horizontal') {
            if (col + ship.length > this.cols) {
                return false
            }
        } else if (direction === 'vertical') {
            if (row + ship.length > this.rows) {
                return false
            }
        }

        
        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row][col + i] !== null) {
                    return false
                }
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][col] !== null) {
                    return false
                }
            }
        }
        
        return true
    }

    placeShip(ship, row, col, direction) {
        if (!this.validPosition(ship, row, col, direction)) {
            return false
        }

        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][col + i] = ship
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][col] = ship
            }
        }

        return true
    }

    receiveAttack(row, col) {
        const cell = this.board[row][col]

        if (cell === null) {
            this.board[row][col] = 'miss'
            return false
        } else if (cell !== 'miss' && cell !== 'hit') {
            cell.hit()
            this.board[row][col] = 'hit'
            return true
        }
        
        return false
    }
}