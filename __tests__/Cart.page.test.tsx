import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

function TestCartUI() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  return React.createElement('div', null,
    cart.map(item => React.createElement('div', { key: item.cartItemId, 'data-testid': `row-${item.cartItemId}` },
      React.createElement('span', { 'data-testid': `name-${item.cartItemId}` }, item.name),
      React.createElement('span', { 'data-testid': `qty-${item.cartItemId}` }, String(item.quantity)),
      React.createElement('button', { onClick: () => updateQuantity(item.cartItemId, item.quantity + 1) }, '+'),
      React.createElement('button', { onClick: () => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1)) }, '-'),
      React.createElement('button', { onClick: () => removeFromCart(item.cartItemId) }, 'remove')
    ))
  )
}

describe('Cart page UI behaviors', () => {
  beforeEach(() => localStorage.clear())

  it('renders cart items, updates quantity and persists changes', () => {
    const sample = [{ cartItemId: 'p1:::', id: 1, name: 'Shirt', price: 50, image: '/s', quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(sample))

    render(React.createElement(CartProvider, null, React.createElement(TestCartUI)))

    const qty = screen.getByTestId('qty-p1:::')
    expect(qty.textContent).toBe('1')

    const plus = screen.getByText('+')
    fireEvent.click(plus)
    expect(screen.getByTestId('qty-p1:::').textContent).toBe('2')

    // ensure localStorage updated
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    expect(stored[0].quantity).toBe(2)

    const remove = screen.getByText('remove')
    fireEvent.click(remove)
    expect(screen.queryByTestId('row-p1:::')).toBeNull()
    const after = JSON.parse(localStorage.getItem('cart') || '[]')
    expect(after.length).toBe(0)
  })
})
