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

describe('Ship initialization', () => {
  test('creates ship with correct properties', () => {
    const destroyer = new Ship('Destroyer', 3)
    expect(destroyer.name).toBe('Destroyer')
    expect(destroyer.length).toBe(3)
    expect(destroyer.hits).toBe(0)
    expect(destroyer.sunk).toBe(false)
  })
})

describe('Ship sinking', () => {
  test('ship sinks when hits equal length', () => {
    const patrol = new Ship('Patrol', 2)
    patrol.hit()
    expect(patrol.sunk).toBe(false)
    patrol.hit()
    expect(patrol.sunk).toBe(true)
  })

  test('ship does not take hits after sinking', () => {
    const sub = new Ship('Submarine', 3)
    sub.hit()
    sub.hit()
    sub.hit()
    expect(sub.hits).toBe(3)
    expect(sub.sunk).toBe(true)
    
    sub.hit()
    expect(sub.hits).toBe(3)
  })
})

describe('Different ship sizes', () => {
  test('5-length carrier sinks after 5 hits', () => {
    const carrier = new Ship('Carrier', 5)
    for (let i = 0; i < 4; i++) {
      carrier.hit()
      expect(carrier.sunk).toBe(false)
    }
    carrier.hit()
    expect(carrier.sunk).toBe(true)
  })
})