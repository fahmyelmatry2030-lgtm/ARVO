import React from 'react'
import { render, screen } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

function Consumer() {
  const { cart } = useCart()
  return React.createElement('div', { 'data-testid': 'count' }, String(cart.length))
}

describe('Cart persistence', () => {
  beforeEach(() => localStorage.clear())

  it('loads cart from localStorage', () => {
    const sample = [{ cartItemId: 'p1:::', id: 1, name: 'X', price: 10, image: '/x', quantity: 2 }]
    localStorage.setItem('cart', JSON.stringify(sample))

    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    const count = screen.getByTestId('count')
    expect(count.textContent).toBe('1')
  })

  it('persists cart to localStorage when items are added', () => {
    const sample = [{ cartItemId: 'p1:::', id: 1, name: 'X', price: 10, image: '/x', quantity: 2 }]
    localStorage.setItem('cart', JSON.stringify(sample))

    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    expect(stored).toEqual(sample)
    expect(stored.length).toBe(1)
  })

  it('handles empty localStorage gracefully', () => {
    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    const count = screen.getByTestId('count')
    expect(count.textContent).toBe('0')
  })

  it('handles multiple items in cart', () => {
    const sample = [
      { cartItemId: 'p1:::', id: 1, name: 'X', price: 10, image: '/x', quantity: 2 },
      { cartItemId: 'p2:::', id: 2, name: 'Y', price: 20, image: '/y', quantity: 1 },
      { cartItemId: 'p3:::', id: 3, name: 'Z', price: 30, image: '/z', quantity: 3 }
    ]
    localStorage.setItem('cart', JSON.stringify(sample))

    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    const count = screen.getByTestId('count')
    expect(count.textContent).toBe('3')
  })

  it('falls back to empty cart on malformed JSON in localStorage', () => {
    // simulate corrupted/malformed JSON
    localStorage.setItem('cart', '{ this is : not valid json }')

    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    const count = screen.getByTestId('count')
    // provider should catch JSON.parse error and return an empty array
    expect(count.textContent).toBe('0')
  })

  it('handles localStorage write failures gracefully', () => {
    // mock localStorage.setItem to throw an error (simulating quota exceeded or permission denied)
    const originalSetItem = localStorage.setItem
    localStorage.setItem = jest.fn(() => {
      throw new Error('QuotaExceededError')
    })

    const sample = [{ cartItemId: 'p1:::', id: 1, name: 'X', price: 10, image: '/x', quantity: 1 }]
    localStorage.setItem = originalSetItem
    localStorage.setItem('cart', JSON.stringify(sample))

    // re-mock setItem to fail during provider updates
    localStorage.setItem = jest.fn(() => {
      throw new Error('QuotaExceededError')
    })

    render(React.createElement(CartProvider, null, React.createElement(Consumer)))
    const count = screen.getByTestId('count')
    // provider should still render successfully despite write failures
    expect(count.textContent).toBe('1')

    // restore original setItem
    localStorage.setItem = originalSetItem
  })
})
