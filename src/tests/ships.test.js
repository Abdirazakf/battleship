import Ship from '../modules/ships'

test('module found', () => {
    expect(Ship).toBeDefined()
})

describe('hit method', () => {
    const carrier = new Ship('Carrier', 4)

    test('register hit', () => {
        carrier.hit()
        
        expect(carrier.hits).toBe(1)
    })
})
describe('isSunk method', () => {
    const sub = new Ship('submarine', 3)
    for (let i = 0; i < 3; i++) {
        sub.hit()
    }

    test('sink submarine', () => {
        expect(sub.sunk).toBeTruthy()
    })
})    