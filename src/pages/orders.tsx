import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiPackage, FiClock, FiChevronLeft, FiArrowLeft, FiShoppingBag, FiTruck, FiCheckCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

type Order = {
  id: string | number
  date: string
  status: string
  total: number
  items: { name: string; quantity: number; price?: number }[]
}

export default function Orders() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('orders')
      if (raw) {
        setOrders(JSON.parse(raw))
      }
    } catch (err) {
      console.error('Failed to load orders', err)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full"
          />
        </div>
      </Layout>
    )
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <SEO title="طلباتي" />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-gray-200 border border-gray-100"
          >
            {React.createElement(FiShoppingBag as any, { className: "w-16 h-16 text-gray-200" })}
          </motion.div>

          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-4">لا توجد طلبات</h1>
          <p className="text-gray-400 font-bold mb-10 max-w-md leading-relaxed">
            يبدو أنك لم تقم بأي طلبات بعد. ابدأ رحلتك في عالم الأناقة الآن وتعرف على أحدث تشكيلاتنا.
          </p>

          <Link
            href="/products"
            className="group flex items-center gap-4 px-12 py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-2xl shadow-gray-900/10 active:scale-95"
          >
            ابدأ التسوق
            {React.createElement(FiArrowLeft as any, { className: "group-hover:translate-x-[-10px] transition-transform" })}
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="طلباتي" description="عرض وتتبع جميع طلباتك السابقة من براند الملابس." />

      <div className="bg-gray-50 min-h-screen py-24">
        <div className="max-w-5xl mx-auto px-4">

          <div className="flex items-center justify-between mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black tracking-[0.4em] text-amber-600 mb-4 uppercase"
              >
                YOUR HISTORY
              </motion.div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">طلباتي</h1>
            </div>
            <Link href="/profile" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-400 hover:text-amber-600 transition-colors">
              {React.createElement(FiChevronLeft as any, { className: "w-6 h-6" })}
            </Link>
          </div>

          <div className="space-y-10">
            <AnimatePresence>
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all overflow-hidden border border-gray-100"
                >
                  <div className="p-8 md:p-12 border-b border-gray-50 flex flex-wrap gap-8 justify-between items-center bg-gray-50/30 group-hover:bg-amber-50/30 transition-colors">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm text-gray-900 group-hover:text-amber-600 transition-colors border border-gray-50">
                        {React.createElement(FiPackage as any, { className: "w-10 h-10" })}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">رقم الطلب</p>
                        <p className="text-2xl font-black text-gray-900 tracking-tight">#{order.id}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2 font-bold">
                          {React.createElement(FiClock as any, { className: "w-4 h-4" })}
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'pending' || order.status === 'قيد المعالجة' ? 'bg-amber-50 text-amber-600' :
                          order.status === 'completed' || order.status === 'تم التوصيل' ? 'bg-green-50 text-green-600' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                          {order.status === 'pending' || order.status === 'قيد المعالجة' ? React.createElement(FiClock as any) : React.createElement(FiCheckCircle as any)}
                          {order.status === 'pending' ? 'قيد المعالجة' : order.status}
                        </span>
                      </div>
                      <p className="text-3xl font-black text-gray-900 tracking-tighter">{order.total} <span className="text-sm">ريال</span></p>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="space-y-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                              {React.createElement(FiShoppingBag as any)}
                            </div>
                            <span className="text-gray-900 font-black uppercase tracking-tight">{item.name}</span>
                          </div>
                          <span className="text-gray-400 font-black bg-gray-50 px-4 py-2 rounded-xl text-xs uppercase tracking-widest">x {item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-gray-400 font-bold text-sm">
                        {React.createElement(FiTruck as any)}
                        <span>شحن قياسي</span>
                      </div>
                      <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:text-amber-700 transition-colors">
                        عرض التفاصيل الكاملة
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  )
}
