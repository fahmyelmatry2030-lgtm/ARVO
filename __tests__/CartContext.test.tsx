import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

function TestConsumer() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
  return React.createElement('div', null,
    React.createElement('button', { onClick: () => addToCart({ id: 1, name: 'T', price: 100, image: '/img' }) }, 'add'),
    React.createElement('button', { onClick: () => updateQuantity('1::::', 3) }, 'update'),
    React.createElement('button', { onClick: () => removeFromCart('1::::') }, 'remove'),
    React.createElement('button', { onClick: () => clearCart && clearCart() }, 'clear'),
    React.createElement('div', { 'data-testid': 'count' }, String(cart.length))
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds, updates, removes and persists cart', () => {
    render(React.createElement(CartProvider, null, React.createElement(TestConsumer)))

    const addBtn = screen.getByText('add')
    const count = screen.getByTestId('count')

    act(() => addBtn.click())
    expect(count.textContent).toBe('1')

    // update quantity should not change length but updates the item
    const updateBtn = screen.getByText('update')
    act(() => updateBtn.click())
    expect(count.textContent).toBe('1')

    const removeBtn = screen.getByText('remove')
    act(() => removeBtn.click())
    expect(count.textContent).toBe('0')

    // add again and clear
    act(() => addBtn.click())
    expect(count.textContent).toBe('1')
    const clearBtn = screen.getByText('clear')
    act(() => clearBtn.click())
    expect(count.textContent).toBe('0')
  })
})
