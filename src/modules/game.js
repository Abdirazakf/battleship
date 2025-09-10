import Player from './player.js'
import Ship from './ships.js'

export default class Game {
    constructor() {
        this.playerName = null
        this.elements = {
            modal: document.querySelector('dialog'),
            form: document.querySelector('form'),
            playerHeader: document.querySelector('.player-container > h2'),
            playerGrid: document.querySelector('.player-grid'),
            computerGrid: document.querySelector('.comp-grid')
        }
        this.player = null
        this.computer = null
        this.playerTurn = true
        this.gameActive = false
    }

    openModal() {
        this.elements.modal.showModal()
    }

    closeModal() {
        this.elements.modal.close()
        this.elements.form.reset()
    }

    getPlayerName() {
        this.elements.form.addEventListener('submit', (event) => {
            event.preventDefault()

            const formData = new FormData(this.elements.form)
            const name = formData.get('name')
            
            if (name) {
                this.playerName = name.toUpperCase()
                this.elements.playerHeader.textContent = this.playerName
            }

            this.closeModal()
        })
    }

    createGrid(container, gameboard, isPlayer) {
        container.innerHTML = ''

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div')
                cell.classList.add('grid-cell')
                cell.dataset.row = row
                cell.dataset.col = col

                if (isPlayer && gameboard.board[row][col] !== null) {
                    cell.classList.add('ship')
                }

                container.appendChild(cell)
            }
        }
    }

    updateGrid(container, row, col, state) {
        const cell = container.querySelector(`[data-row="${row}"][data-col="${col}"]`)

        if (cell) {
            cell.classList.add(state)
        }
    }

    randomInt(max) {
        return Math.floor(Math.random() * max)
    }

    placeShipsRandom(gameboard, ships) {
        const directions = ['horizontal', 'vertical']

        for (const ship of ships) {
            let placed = false

            while (!placed) {
                const row = this.randomInt(10)
                const col = this.randomInt(10)
                const direction = directions[this.randomInt(2)]

                placed = gameboard.placeShip(ship, row, col, direction)
            }
        }
    }

    handleAttack(event) {
        if (!this.gameActive || !this.playerTurn) {
            return
        }

        if (!event.target.classList.contains('grid-cell')) {
            return
        }

        const row = parseInt(event.target.dataset.row)
        const col = parseInt(event.target.dataset.col)

        if (event.target.classList.contains('hit') || event.target.classList.contains('miss')) {
            return
        }

        const hit = this.computer.gameboard.receiveAttack(row, col)
        this.updateGrid(this.elements.computerGrid, row, col, hit ? 'hit' : 'miss')

        if (this.checkGameOver()) {
            return
        }

        this.playerTurn = false
        setTimeout(() => this.computerMove(), 500)
    }

    computerMove() {
        if (!this.gameActive || this.playerTurn) {
            return
        }

        let validMove = false
        let row, col

        while(!validMove) {
            row = this.randomInt(10)
            col = this.randomInt(10)

            const cell = this.elements.playerGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`)

            if (cell && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                validMove = true
            }
        }

        const hit = this.player.gameboard.receiveAttack(row, col)
        this.updateGrid(this.elements.playerGrid, row, col, hit ? 'hit' : 'miss')

        if (this.checkGameOver()) {
            return
        }

        this.playerTurn = true
    }

    checkAllShipsSunk(gameboard) {

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = gameboard.board[row][col]

                if (cell !== null && cell !== 'miss' && cell !== 'hit') {
                    return false
                }
            }
        }

        return true
    }

    checkGameOver() {
        const playerLost = this.checkAllShipsSunk(this.player.gameboard)
        const computerLost = this.checkAllShipsSunk(this.computer.gameboard)

        if (playerLost || computerLost) {
            this.gameActive = false
            const winner = playerLost ? 'Computer' : this.playerName
            this.displayGameOver(winner)
            return true
        }
        
        return false
    }

    displayGameOver(winner) {
        const message = document.createElement('div')
        message.classList.add('game-over')
        message.textContent = `${winner} wins!`
        const contentArea = document.querySelector('.content-area')
        contentArea.appendChild(message)
    }

    startGame() {
        this.player = new Player(this.playerName)
        this.computer = new Player('Computer')

        const playerShips = [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4),
            new Ship('Destroyer', 3),
            new Ship('Submarine', 3),
            new Ship('Patrol Boat', 2)
        ]

        const computerShips = [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4),
            new Ship('Destroyer', 3),
            new Ship('Submarine', 3),
            new Ship('Patrol Boat', 2)
        ]

        this.placeShipsRandom(this.player.gameboard, playerShips)
        this.placeShipsRandom(this.computer.gameboard, computerShips)

        this.createGrid(this.elements.playerGrid, this.player.gameboard, true)
        this.createGrid(this.elements.computerGrid, this.computer.gameboard, false)

        this.elements.computerGrid.addEventListener('click', (e) => this.handleAttack(e))

        this.playerTurn = true
        this.gameActive = true
    }

    init() {
        this.openModal()
        this.getPlayerName()
        this.startGame()
    }
}
            