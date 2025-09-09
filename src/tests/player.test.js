import Gameboard from "../modules/gameboard.js"
import Player from "../modules/player.js"

describe('Player class tests', () => {
    let player

    beforeEach(() => {
        player = new Player('Abdi')
    })
    test('player name defined', () => {
        expect(player.name).toBe('Abdi')
    })

    test('player gameboard initialized', () => {
        expect(player.gameboard).toBeInstanceOf(Gameboard)
        expect(player.gameboard.board.length).toBe(10)
        expect(player.gameboard.board[0].length).toBe(10)
    })

    test('board initialized with null values', () => {
        player.gameboard.board.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBeNull()
            })
        })
    })
})