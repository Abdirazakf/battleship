import './assets/styles/reset.css'
import './assets/styles/style.css'
import UI from './modules/ui.js'
import Game from './modules/game.js'

const ui = new UI
const game = new Game

document.addEventListener('DOMContentLoaded', () => {
    ui.init()
})