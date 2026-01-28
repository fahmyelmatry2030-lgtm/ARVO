import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { Order } from '../lib/orders'
import Link from 'next/link'
import { FiCheckCircle, FiPackage, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function ThankYou() {
  const router = useRouter()
  const { orderId } = router.query
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!orderId) return

    try {
      const raw = localStorage.getItem('orders')
      if (raw) {
        const orders = JSON.parse(raw) as Order[]
        const found = orders.find(o => o.id.toString() === orderId.toString())
        if (found) setOrder(found)
      }
    } catch (err) {
      console.error('Failed to load order', err)
    }
  }, [orderId])

  return (
    <Layout>
      <SEO title="شكرًا لطلبك" description="تم استلام طلبك بنجاح. شكرًا لتسوقك معنا!" />

      <div className="bg-gray-50 min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 text-center mb-10 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400" />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-100/50"
            >
              {React.createElement(FiCheckCircle as any, { className: "w-12 h-12 text-green-500" })}
            </motion.div>

            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black text-gray-900 mb-4"
            >
              شكراً لثقتك بنا!
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-xl max-w-md mx-auto mb-6 leading-relaxed"
            >
              تم استلام طلبك بنجاح. نحن الآن نقوم بتجهيزه بكل حب وعناية ليصلك في أسرع وقت.
            </motion.p>

            {orderId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-6 py-2 bg-amber-50 rounded-full border border-amber-100"
              >
                <p className="text-amber-700 font-bold mb-0">
                  رقم طلبك: <span className="font-mono text-amber-900 tracking-wider">#{orderId}</span>
                </p>
              </motion.div>
            )}
          </motion.div>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-lg shadow-gray-200/40 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-3 text-gray-900">
                  {React.createElement(FiPackage as any, { className: "text-amber-600" })}
                  ملخص الطلب
                </h2>
                <span className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-black uppercase tracking-widest">
                  قيد التجهيز
                </span>
              </div>

              <div className="p-8">
                <div className="space-y-6 mb-10">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-sm font-black text-amber-600 border border-gray-100 group-hover:border-amber-200 transition-colors">
                          {item.quantity}x
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400">سعر القطعة: {item.price} ر.س</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">{(item.price || 0) * (item.quantity || 1)} ر.س</span>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-10 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                      {React.createElement(FiMapPin as any, { className: "text-amber-500" })}
                      وجهة التوصيل
                    </h3>
                    <div className="text-gray-600 space-y-2 text-sm leading-relaxed">
                      <p className="font-black text-gray-900 text-base">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}</p>
                      <p dir="ltr" className="text-right inline-block bg-white px-3 py-1 rounded-lg border border-gray-100 font-mono text-gray-900">{order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-gray-900 uppercase tracking-wider text-xs">تفاصيل الحساب</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-gray-500">
                        <span>طريقة الدفع</span>
                        <span className="font-bold text-gray-900">الدفع عند الاستلام</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>الشحن</span>
                        <span className="font-bold text-green-600 tracking-wider">مجاني</span>
                      </div>
                      <div className="flex justify-between text-xl font-black text-gray-900 border-t border-gray-200 pt-4 mt-4">
                        <span>الإجمالي الكلي</span>
                        <span className="text-2xl text-amber-600">{order.total} ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
          >
            <Link
              href="/products"
              className="group px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              متابعة التسوق
              {React.createElement(FiArrowRight as any, { className: "group-hover:translate-x-[-5px] transition-transform" })}
            </Link>
            <Link
              href="/orders"
              className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all text-center active:scale-95"
            >
              متابعة طلباتي
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
