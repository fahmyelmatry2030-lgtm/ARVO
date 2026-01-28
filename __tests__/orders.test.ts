import { createAndSaveOrder } from '../src/lib/orders'

describe('orders helper', () => {
  beforeEach(() => localStorage.clear())

  it('creates and persists an order', () => {
    const cart = [{ id: 1, name: 'P', price: 50, quantity: 2 }]
    const shipping = { name: 'Ali', address: 'X', city: 'Riyadh', phone: '050' }
    const order = createAndSaveOrder(cart as any, shipping as any)

    expect(order).toHaveProperty('id')
    const raw = localStorage.getItem('orders')
    expect(raw).toBeTruthy()
    const arr = JSON.parse(raw as string)
    expect(arr[0].id).toBe(order.id)
    expect(arr[0].items[0].name).toBe('P')
  })
})
