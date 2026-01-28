import Navbar from './Navbar'
import Footer from './Footer'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CartDrawer from './CartDrawer'
import { useCart } from '../context/CartContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isCartOpen, setIsCartOpen } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-20">
        {children}
      </main>

      <Footer />

      {/* سلة التسوق */}
      <AnimatePresence mode="wait">
        {isCartOpen && (
          <CartDrawer
            key="cart-drawer-sidebar"
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
