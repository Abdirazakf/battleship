import Player from './player.js'
import UI from './ui.js'

const ui = new UI

export default class Game {
    constructor() {
        this.playerName = null
    }

    getPlayerName() {
        ui.elements.form.addEventListener('submit', (event) => {
            event.preventDefault()

            const formData = new FormData(ui.elements.form)
            const name = formData.get('name')
            
            if (name) {
                this.playerName = name
            }

            console.log(this.playerName)
            ui.closeModal()
        })
    }
}
            