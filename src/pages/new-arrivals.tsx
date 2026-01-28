import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import { motion } from 'framer-motion'
import { FiStar, FiTrendingUp } from 'react-icons/fi'

export default function NewArrivals() {
    // في المستقبل، يمكن فلترة المنتجات حسب تاريخ الإضافة
    // حالياً سنعرض جميع المنتجات كمنتجات جديدة
    const newProducts = products

    return (
        <Layout>
            <Head>
                <title>المنتجات الجديدة | AROVA</title>
                <meta name="description" content="اكتشف أحدث المنتجات والتشكيلات الجديدة من AROVA" />
            </Head>

            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />

                {/* Animated Stars */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-white/30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 10}px`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.8, 0.3],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </div>

                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block mb-4"
                        >
                            {React.createElement(FiStar as any, { className: "w-16 h-16 text-yellow-300" })}
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                            المنتجات الجديدة
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            اكتشف أحدث التشكيلات والصيحات العصرية
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                        <div className="text-4xl font-extrabold text-purple-600 mb-2">
                            {newProducts.length}
                        </div>
                        <div className="text-gray-600">منتج جديد</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-4xl font-extrabold text-pink-600 mb-2">
                            {React.createElement(FiTrendingUp as any, {})}
                            <span>100%</span>
                        </div>
                        <div className="text-gray-600">جودة مضمونة</div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 text-center">
                        <div className="text-4xl font-extrabold text-red-600 mb-2">
                            ⚡
                        </div>
                        <div className="text-gray-600">توصيل سريع</div>
                    </div>
                </motion.div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        تشكيلة حصرية وجديدة
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        كن أول من يحصل على أحدث المنتجات والتصاميم العصرية
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard
                                product={product}
                                isNew={true}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State (if no products) */}
                {newProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            لا توجد منتجات جديدة حالياً
                        </h3>
                        <p className="text-gray-600 mb-6">
                            تابعنا لتكون أول من يعرف عن المنتجات الجديدة
                        </p>
                        <a
                            href="/products"
                            className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                        >
                            تصفح جميع المنتجات
                        </a>
                    </motion.div>
                )}

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="text-center">
                        <div className="text-5xl mb-4">🎨</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            تصاميم عصرية
                        </h3>
                        <p className="text-gray-600">
                            أحدث التصاميم العالمية والمحلية
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl mb-4">✨</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            جودة عالية
                        </h3>
                        <p className="text-gray-600">
                            خامات فاخرة وجودة مضمونة
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-5xl mb-4">💝</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            أسعار مناسبة
                        </h3>
                        <p className="text-gray-600">
                            أفضل الأسعار مع جودة استثنائية
                        </p>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-2xl p-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        اشترك في النشرة البريدية
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        احصل على إشعارات فورية عند وصول منتجات جديدة وعروض حصرية
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="بريدك الإلكتروني"
                            className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                        />
                        <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
                            اشترك الآن
                        </button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}
