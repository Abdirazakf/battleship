export default class Gameboard {
    constructor() {
        this.rows = 10
        this.cols = 10
        this.board = Array.from({length: this.rows}, () => 
            new Array(this.cols).fill(null)
        )
        this.shipPositions = new Map()
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

        const positions = []

        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][col + i] = ship
                positions.push({row, col: col + i})
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][col] = ship
                positions.push({row: row + i, col})
            }
        }

        this.shipPositions.set(ship, positions)
        return true
    }

    receiveAttack(row, col) {
        const cell = this.board[row][col]

        if (cell === null) {
            this.board[row][col] = 'miss'
            return { hit: false, sunk: false, ship: null }
        } else if (cell !== 'miss' && cell !== 'hit') {
            const ship = cell
            ship.hit()
            this.board[row][col] = 'hit'
            return { hit: true, sunk: ship.sunk, ship: ship }
        }
        
        return { hit: false, sunk: false, ship: null }
    }
}