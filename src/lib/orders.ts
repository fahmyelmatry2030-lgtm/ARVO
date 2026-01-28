import { ShippingInfo } from '../types'

export type Order = {
  id: number
  date: string
  status: string
  total: number
  items: { name: string; quantity: number; price: number }[]
  shippingAddress: ShippingInfo
}

export function createAndSaveOrder(cart: any[], shippingInfo: ShippingInfo): Order {
  const id = Date.now()
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order: Order = {
    id,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    total: totalAmount,
    items: cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.price })),
    shippingAddress: shippingInfo,
  }

  try {
    const raw = localStorage.getItem('orders')
    const existing = raw ? JSON.parse(raw) : []
    existing.unshift(order)
    localStorage.setItem('orders', JSON.stringify(existing))
  } catch (err) {
    // ignore
  }

  return order
}
