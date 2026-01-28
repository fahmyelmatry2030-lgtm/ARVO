import React, { useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import SafeImage from './SafeImage'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  const sidebarVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  }

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-[9999] flex justify-end"
    >
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-white/95 backdrop-blur-3xl shadow-[-20px_0_80px_rgba(0,0,0,0.3)] flex flex-col"
      >
        <div className="p-8 flex items-center justify-between border-b border-gray-100">
          <div>
            <div className="text-amber-600 text-[10px] font-black tracking-[0.4em] uppercase mb-1">Your Selection</div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic flex items-center gap-3">
              Bag <span className="text-gray-300 not-italic">({cart.length})</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-sm"
          >
            {React.createElement(FiX as any, { className: "w-5 h-5" })}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                {React.createElement(FiShoppingBag as any, { className: "w-10 h-10 text-gray-200" })}
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Your bag is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.cartItemId} className="py-8 flex gap-6 group">
                  <div className="w-24 h-32 relative flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
                    <SafeImage src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} className="group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-gray-900 uppercase tracking-tight leading-tight text-sm pr-4">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-200 hover:text-red-500 transition-colors">
                          {React.createElement(FiTrash2 as any, { className: "w-4 h-4" })}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                        {item.selectedSize && <span>Size: <span className="text-gray-900">{item.selectedSize}</span></span>}
                        {item.selectedColor && <span>Color: <span className="text-gray-900">{item.selectedColor}</span></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                        <button onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">{React.createElement(FiMinus as any, { className: "w-2 h-2" })}</button>
                        <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">{React.createElement(FiPlus as any, { className: "w-2 h-2" })}</button>
                      </div>
                      <div className="font-black text-gray-900 text-sm tracking-tighter">{item.price * item.quantity} ر.س</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Estimated Total</span>
            <div className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
              {subtotal} <span className="text-xs not-italic text-gray-400">ر.س</span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => { onClose(); router.push('/cart') }}
              className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-4 group"
            >
              View Full Bag
              {React.createElement(FiArrowRight as any, { className: "w-4 h-4 group-hover:translate-x-2 transition-transform" })}
            </button>
            <button
              onClick={() => { onClose(); router.push('/checkout') }}
              className="w-full bg-white text-gray-900 border-2 border-gray-900 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-900 hover:text-white transition-all active:scale-95"
            >
              Direct Checkout
            </button>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  )
}

