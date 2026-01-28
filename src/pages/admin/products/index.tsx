import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'
import SafeImage from '../../../components/SafeImage'
import productsData from '../../../data/products'

export default function AdminProducts() {
    const { requireAdmin, loading, admin } = useAdmin()
    const [products, setProducts] = useState(productsData)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        requireAdmin()
    }, [admin, loading])

    if (loading || !admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = (id: string | number) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            setProducts(products.filter(p => p.id.toString() !== id.toString()))
        }
    }

    return (
        <AdminLayout>
            <Head>
                <title>إدارة المنتجات | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b border-white/5 pb-12">
                    <div>
                        <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">INVENTORY</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">إدارة المنتجات</h1>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {React.createElement(FiPlus as any, { className: "w-4 h-4" })}
                            إضافة منتج جديد
                        </span>
                        <div className="absolute inset-0 bg-amber-500 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                    </Link>
                </div>

                {/* Search Bar - Glassmorphism */}
                <div className="relative group">
                    <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-amber-500">
                        {React.createElement(FiSearch as any, { className: "w-5 h-5" })}
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="البحث في المستودع..."
                        className="w-full bg-white/[0.03] border border-white/5 text-white pr-16 pl-8 py-6 rounded-3xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:text-white/20"
                    />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all duration-700"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                                <SafeImage
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                {/* Quick Actions Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="w-14 h-14 bg-white text-black flex items-center justify-center rounded-2xl hover:bg-amber-500 transition-colors shadow-2xl"
                                        title="تعديل"
                                    >
                                        {React.createElement(FiEdit2 as any, { className: "w-5 h-5" })}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="w-14 h-14 bg-red-600 text-white flex items-center justify-center rounded-2xl hover:bg-red-700 transition-colors shadow-2xl"
                                        title="حذف"
                                    >
                                        {React.createElement(FiTrash2 as any, { className: "w-5 h-5" })}
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">{product.category}</span>
                                    <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${product.stock && product.stock > 0
                                        ? 'bg-green-500/10 text-green-500'
                                        : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {product.stock && product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-white italic tracking-tighter mb-4 line-clamp-1 group-hover:text-amber-500 transition-colors">
                                    {product.name}
                                </h3>

                                <div className="text-2xl font-black text-white tracking-tighter">
                                    {product.price} <span className="text-xs text-white/40">ج.م</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-40 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">No results found</span>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
