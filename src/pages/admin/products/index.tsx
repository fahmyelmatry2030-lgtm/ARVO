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
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
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
            // في المستقبل سيتم الحذف من قاعدة البيانات
        }
    }

    return (
        <AdminLayout>
            <Head>
                <title>إدارة المنتجات | الإدارة</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h1>
                        <p className="text-gray-600 mt-1">
                            إجمالي المنتجات: {filteredProducts.length}
                        </p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        {React.createElement(FiPlus as any, { className: "w-5 h-5" })}
                        <span className="font-medium">إضافة منتج جديد</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {React.createElement(FiSearch as any, { className: "w-5 h-5 text-gray-400" })}
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ابحث عن منتج..."
                            className="block w-full pr-10 pl-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                        >
                            {/* Product Image */}
                            <div className="relative h-48 bg-gray-100">
                                <SafeImage
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                {/* Quick Actions Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                        title="تعديل"
                                    >
                                        {React.createElement(FiEdit2 as any, { className: "w-5 h-5 text-blue-600" })}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                        title="حذف"
                                    >
                                        {React.createElement(FiTrash2 as any, { className: "w-5 h-5 text-red-600" })}
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                                <h3 className="font-medium text-gray-900 mt-1 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">
                                        {product.price} ريال
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock && product.stock > 0
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.stock && product.stock > 0 ? `متوفر (${product.stock})` : 'نفذ'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 text-lg">لا توجد منتجات</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
