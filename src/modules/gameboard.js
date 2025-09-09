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
        if (this.board[row][col] === null) {
            this.board[row][col] = 'miss'
            return false
        } else if (this.board[row][col] !== 'miss' || this.board[row][col] !== 'hit') {
            const ship = this.board[row][col]
            ship.hit()
            this.board[row][col] = 'hit'
            return true
        }
    }
}