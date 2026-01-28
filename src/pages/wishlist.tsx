import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHeart, FiChevronRight } from 'react-icons/fi'
import SEO from '../components/SEO'

export default function Wishlist() {
    const { wishlist } = useWishlist()

    return (
        <Layout>
            <SEO
                title="قائمة الأمنيات"
                description="استعرض مجموعتك الخاصة من قطعنا الفريدة التي قمت بحفظها. تسوق مفضلاتك الآن."
            />

            {/* Hero Section */}
            <section className="bg-gray-900 py-32 relative overflow-hidden text-white uppercase font-black">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="grid grid-cols-6 h-full border-r border-white/20">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="border-l border-white/20" />)}
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.4em] text-amber-500 mb-8"
                    >
                        PRIVATE COLLECTION
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        قائمة الأمنيات
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        className="h-1.5 bg-amber-600 mx-auto mb-10"
                    />
                </div>
            </section>

            <div className="bg-gray-50 py-24 min-h-screen">
                <div className="container mx-auto px-4">
                    {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {wishlist.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden max-w-3xl mx-auto text-center"
                        >
                            <div className="absolute top-0 right-0 w-2 h-full bg-amber-600" />
                            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-10 text-amber-600">
                                {React.createElement(FiHeart as any, { className: "w-10 h-10" })}
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">قائمتك خالية</h2>
                            <p className="text-gray-500 mb-12 text-lg max-w-sm mx-auto font-medium">ابدأ باستكشاف كولكشن 2024 وأضف ما ينال إعجابك إلى قائمتك الخاصة.</p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-3 px-12 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                            >
                                تصفح الكولكشن
                                {React.createElement(FiChevronRight as any)}
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    )
}
