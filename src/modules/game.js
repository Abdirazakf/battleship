import Player from './player.js'

export default class Game {
    constructor() {
        this.playerName = null
        this.elements = {
            modal: document.querySelector('dialog'),
            form: document.querySelector('form'),
            playerHeader: document.querySelector('.player-container > h2')
        }
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

    createPlayer() {
        this.getPlayerName()
        const player = new Player(this.playerName)

        return player
    }

    createPlayerGrid() {

    }

    createComputer() {
        const computer = new Player('Computer')
        return computer
    }

    createComputerGrid() {
        
    }

    startGame() {
        const player = this.createPlayer()
        const computer = this.createComputer()


    }

    init() {
        this.openModal()
        this.createPlayer()
    }
}
            