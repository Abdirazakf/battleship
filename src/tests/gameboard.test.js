import Gameboard from '../modules/gameboard'
import Ship from '../modules/ships'


describe('Gameboard tests', () => {
    let gameboard
    let destroyer
    let patrolBoat

    beforeEach(() => {
        gameboard = new Gameboard()
        destroyer = new Ship('Destroyer', 3)
        patrolBoat = new Ship('Patrol Boat', 2)
    })

    describe('board initialization', () => {
        test('create 10x10 gameboard', () => {
            expect(gameboard.board.length).toBe(10)
            expect(gameboard.board[0].length).toBe(10)
        })

        test('full of null values', () => {
            gameboard.board.forEach(row => {
                row.forEach(cell => {
                    expect(cell).toBeNull
                })
            })
        })
    })

    describe('Ship placement', () => {
        test('place ship horizontal', () => {
            const result = gameboard.placeShip(
                destroyer, 0, 0, 'horizontal'
            )

            expect(result).toBeTruthy()
            expect(gameboard.board[0][0]).toBe(destroyer)
            expect(gameboard.board[0][1]).toBe(destroyer)
            expect(gameboard.board[0][2]).toBe(destroyer)
        })

        test('place ship vertical', () => {
            const result = gameboard.placeShip(
                patrolBoat, 5, 3, 'vertical'
            )

            expect(result).toBeTruthy()
            expect(gameboard.board[6][3]).toBe(patrolBoat)
        })

        test('prevent out of bounds horizontally', () => {
            const result = gameboard.placeShip(destroyer, 0, 8, 'horizontal')

            expect(result).toBeFalsy()
        })

        test('prevent out of bounds vertically', () => {
            const result = gameboard.placeShip(destroyer, 8, 0, 'vertical')

            expect(result).toBeFalsy()
        })

        test('prevent overlap', () => {
            gameboard.placeShip(destroyer, 5, 5, 'horizontal')
            const result = gameboard.placeShip(patrolBoat, 5, 6, 'horizontal')

            expect(result).toBeFalsy()
        })

        test('adjacent ships', () => {
            gameboard.placeShip(destroyer, 3, 3, 'horizontal')
            const result = gameboard.placeShip(patrolBoat, 3, 6, 'vertical')

            expect(result).toBeTruthy()
        })
    })
})