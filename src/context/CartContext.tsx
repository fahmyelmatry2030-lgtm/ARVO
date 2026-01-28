import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartContextType, CartItem, Product } from '../types';

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  isCartOpen: false,
  setIsCartOpen: () => { },
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize from localStorage when available (avoid on server)
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('cart');
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch (e) {
      return [];
    }
  });

  // persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore storage errors
    }
  }, [cart]);

  const addToCart = (product: Product, opts?: { selectedSize?: string; selectedColor?: string }) => {
    setCart(prevCart => {
      const cartItemId = `${product.id}::${opts?.selectedSize || ''}::${opts?.selectedColor || ''}`
      const existingItem = prevCart.find(item => item.cartItemId === cartItemId)
      if (existingItem) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      const newItem: CartItem = { ...product, cartItemId, quantity: 1, selectedSize: opts?.selectedSize, selectedColor: opts?.selectedColor }
      return [...prevCart, newItem]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    )
  };

  const clearCart = () => {
    setCart([])
  }

  return React.createElement(CartContext.Provider, {
    value: {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen
    }
  }, children)
}
export const useCart = () => {
  // Return the context. We provide a default no-op context to avoid runtime crashes
  // when a component is rendered outside of the provider during edge-cases.
  return useContext(CartContext);
};
