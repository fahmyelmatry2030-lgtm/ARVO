import React, { useState, useMemo } from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'
import { CartItem } from '../types'
import { useRouter } from 'next/router'
import SafeImage from '../components/SafeImage'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag, FiTag, FiTruck, FiShield, FiGift } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import Link from 'next/link'

export default function Cart() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [coupon, setCoupon] = useState<string>('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; amount: number } | null>(null)
  const [isGift, setIsGift] = useState(false)

  const subtotal = useMemo(() => cart.reduce((s: number, it: CartItem) => s + it.price * it.quantity, 0), [cart])
  const FREE_SHIPPING_THRESHOLD = 500
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 30
  const discount = appliedCoupon ? appliedCoupon.amount : 0
  const tax = +(0.05 * (subtotal - discount)).toFixed(0)
  const giftPrice = isGift ? 25 : 0
  const total = Math.max(0, subtotal - discount + tax + shippingCost + giftPrice)

  const handleApplyCoupon = () => {
    if (!coupon) return
    const code = coupon.trim().toUpperCase()
    if (code === 'PREMIUM10') {
      setAppliedCoupon({ code, amount: Math.round(subtotal * 0.1) })
    } else {
      setAppliedCoupon(null)
    }
  }

  if (cart.length === 0) {
    return (
      <Layout>
        <SEO title="حقيبة التسوق" description="حقيبة التسوق الخاصة بك فارغة." />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-12 shadow-inner"
          >
            {React.createElement(FiShoppingBag as any, { className: "w-16 h-16 text-gray-200" })}
          </motion.div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Shopping Bag Empty</h1>
          <p className="text-gray-400 mb-12 max-w-sm font-bold leading-relaxed">
            Your collection awaits. Start building your signature style today with our latest arrivals.
          </p>
          <Link href="/products" className="bg-gray-900 text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-2xl active:scale-95">
            Explore Collection
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="حقيبة التسوق" />

      <div className="bg-white min-h-screen py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Left: Cart Items */}
            <div className="lg:w-2/3">
              <div className="flex items-end justify-between mb-20">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-4"
                  >
                    YOUR SELECTION
                  </motion.div>
                  <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase">Shopping Bag</h1>
                </div>
                <button
                  onClick={() => confirm('تفريغ الحقيبة؟') && clearCart?.()}
                  className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-1"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="py-12 flex flex-col md:flex-row items-center gap-12 group"
                    >
                      <div className="w-40 h-52 relative rounded-[2rem] overflow-hidden flex-shrink-0 bg-gray-50 shadow-sm">
                        <SafeImage src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} className="group-hover:scale-110 transition-transform duration-1000" />
                      </div>

                      <div className="flex-1 w-full space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">{item.name}</h3>
                            <div className="flex gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              {item.selectedSize && <span>Size: <span className="text-gray-900">{item.selectedSize}</span></span>}
                              {item.selectedColor && <span>Color: <span className="text-gray-900">{item.selectedColor}</span></span>}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="w-10 h-10 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                          >
                            {React.createElement(FiTrash2 as any, { className: "w-4 h-4" })}
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-6">
                          <div className="flex items-center border border-gray-100 rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900"
                            >
                              {React.createElement(FiMinus as any, { className: "w-3 h-3" })}
                            </button>
                            <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900"
                            >
                              {React.createElement(FiPlus as any, { className: "w-3 h-3" })}
                            </button>
                          </div>
                          <div className="text-2xl font-black text-gray-900 tracking-tighter">
                            {item.price * item.quantity} <span className="text-xs text-gray-400">ريال</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-20 flex flex-col md:flex-row gap-10 items-center justify-between p-12 bg-gray-50 rounded-[3rem]">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isGift ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-gray-400 shadow-sm cursor-pointer hover:bg-amber-50'}`} onClick={() => setIsGift(!isGift)}>
                    {React.createElement(FiGift as any, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">تغليف فاخر للهدايا</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">+25 ريال إضافية</p>
                  </div>
                </div>
                <Link href="/products" className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-4">
                  {React.createElement(FiArrowLeft as any)}
                  Return To Shop
                </Link>
              </div>
            </div>

            {/* Right: Summary Side Panel */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="bg-gray-900 rounded-[3.5rem] p-12 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full -mr-32 -mt-32 blur-[100px]" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic">Summary</h2>

                    <div className="space-y-8 mb-12">
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Subtotal</span>
                        <span className="text-xl font-black">{subtotal} <span className="text-[10px] text-gray-500">ر.س</span></span>
                      </div>

                      <div className="flex justify-between items-center group">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Shipping</span>
                          {shippingCost === 0 && <span className="text-[8px] text-green-400 font-black uppercase tracking-widest mt-1">Free Shipping Applied</span>}
                        </div>
                        <span className={`text-xl font-black ${shippingCost === 0 ? 'text-green-400' : ''}`}>
                          {shippingCost === 0 ? '0' : shippingCost} <span className="text-[10px] text-gray-500">ر.س</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Estimated Tax</span>
                        <span className="text-xl font-black">{tax} <span className="text-[10px] text-gray-500">ر.س</span></span>
                      </div>

                      {isGift && (
                        <div className="flex justify-between items-center group text-amber-500">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gift Packaging</span>
                          <span className="text-xl font-black">+25 <span className="text-[10px]">ر.س</span></span>
                        </div>
                      )}

                      {appliedCoupon && (
                        <div className="flex justify-between items-center group text-green-400">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Promo: {appliedCoupon.code}</span>
                          <span className="text-xl font-black">-{discount} <span className="text-[10px]">ر.س</span></span>
                        </div>
                      )}
                    </div>

                    <div className="pt-10 border-t border-white/10 mb-12">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="block text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-3">Grand Total</span>
                          <span className="text-6xl font-black tracking-tighter">{total}</span>
                          <span className="text-lg font-bold text-gray-500 ml-2">ر.س</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push('/checkout')}
                      className="w-full bg-white text-black py-8 rounded-full font-black text-xl shadow-2xl transition-all hover:bg-amber-600 hover:text-white active:scale-95 uppercase tracking-[0.1em] mb-8"
                    >
                      Checkout Now
                    </button>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-3xl border border-white/5">
                        {React.createElement(FiShield as any, { className: "w-5 h-5 text-amber-600" })}
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400">100% Secure Checkout Guaranteed</span>
                      </div>

                      {/* Compact Promo Code */}
                      <div className="flex gap-4">
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="PROMO CODE"
                          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black placeholder:text-gray-600 focus:outline-none focus:border-amber-600"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-white/10 px-6 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-amber-600 transition-all"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
