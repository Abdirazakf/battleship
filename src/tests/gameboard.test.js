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
                    expect(cell).toBeNull()
                })
            })
        })
    })

    describe('Ship Placement', () => {
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

        test('prevent negative values', () => {
            expect(gameboard.placeShip(destroyer, -1, 3, 'vertical')).toBeFalsy()
            expect(gameboard.placeShip(destroyer, -4, -5, 'horizontal')).toBeFalsy()
        })
    })

    describe('Receive Attacks', () => {
        beforeEach(() => {
            // Ship at row: 0, cols: 0,1,2
            gameboard.placeShip(destroyer, 0, 0, 'horizontal')
        })

        test('missed shot', () => {
            const result = gameboard.receiveAttack(5, 5)
            
            expect(result).toBeFalsy()

            expect(gameboard.board[5][5]).toBe('miss')
        })

        test('hit on ship', () => {
            const result = gameboard.receiveAttack(0, 1)

            expect(result).toBeTruthy()

            expect(gameboard.board[0][1]).toBe('hit')

            expect(destroyer.hits).toBe(1)
        })

        test('hit when their are multiple ships', () => {
            gameboard.placeShip(patrolBoat, 3, 3, 'vertical')
            
            gameboard.receiveAttack(0, 1)
            expect(destroyer.hits).toBe(1)
            expect(patrolBoat.hits).toBe(0)
            
            gameboard.receiveAttack(3, 3)
            expect(destroyer.hits).toBe(1)
            expect(patrolBoat.hits).toBe(1)
        })

        test('prevent hitting same spot twice', () => {
            gameboard.receiveAttack(0, 0)
            const result = gameboard.receiveAttack(0, 0)
            
            expect(result).toBeFalsy()

            expect(gameboard.board[0][0]).toBe('hit')

            expect(destroyer.hits).toBe(1)
        })

        test('Sink a ship', () => {
            gameboard.receiveAttack(0, 0)
            gameboard.receiveAttack(0, 1)
            gameboard.receiveAttack(0, 2)

            expect(destroyer.sunk).toBeTruthy()
        })

        test('Multiple hits but alive', () => {
            gameboard.receiveAttack(0,0)
            gameboard.receiveAttack(0,2)

            expect(destroyer.sunk).toBeFalsy()
        })
    })
    
    describe('Edge cases', () => {
        test('handles placing ship at board edges', () => {
            const submarine = new Ship ('Submarine', 3)
            expect(gameboard.placeShip(destroyer, 0, 7, 'horizontal')).toBeTruthy()
            expect(gameboard.placeShip(submarine, 7, 0, 'vertical')).toBeTruthy()
        })
        
        test('validates position correctly for corner placement', () => {
            const dingy = new Ship('Dingy', 1)
            expect(gameboard.placeShip(patrolBoat, 9, 8, 'horizontal')).toBeTruthy()
            expect(gameboard.placeShip(dingy, 8, 9, 'vertical')).toBeTruthy()
        })
    })
})