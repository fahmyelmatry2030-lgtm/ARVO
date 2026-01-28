import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHome, FiShoppingBag, FiSearch } from 'react-icons/fi'

export default function NotFound() {
    return (
        <Layout>
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl"
                >
                    {/* 404 Number */}
                    <motion.h1
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 mb-4"
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        عذراً، الصفحة غير موجودة
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                        >
                            {React.createElement(FiHome as any, { className: "w-5 h-5" })}
                            العودة للرئيسية
                        </Link>

                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-primary-500 hover:text-primary-600 transition-all"
                        >
                            {React.createElement(FiShoppingBag as any, { className: "w-5 h-5" })}
                            تصفح المنتجات
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-12 flex justify-center gap-8 text-gray-400">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            👕
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                        >
                            👔
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                        >
                            👗
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}
