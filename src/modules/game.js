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
        container.innerHtml = ''

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

    startGame() {
        this.player = new Player(this.playerName)
        this.computer = new Player('Computer')

        const carrier = new Ship('Carrier', 5)
        const destroyer = new Ship('Destroyer', 3)
        const patrolBoat = new Ship('Patrol Boat', 2)

        this.player.gameboard.placeShip(destroyer, 0, 0, 'horizontal')
        this.player.gameboard.placeShip(patrolBoat, 7, 8, 'vertical')
        this.player.gameboard.placeShip(carrier, 4, 5, 'horizontal')

        this.createGrid(this.elements.playerGrid, this.player.gameboard, true)
        this.createGrid(this.elements.computerGrid, this.computer.gameboard, true)
    }

    init() {
        this.openModal()
        this.getPlayerName()
        this.startGame()
    }
}
            