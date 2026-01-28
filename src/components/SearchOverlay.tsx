import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import products from '../data/products'
import SafeImage from './SafeImage'

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        } else {
            setQuery('')
        }
    }, [isOpen])

    // Filter products
    const results = query.trim() === '' ? [] : products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5) // Limit to 5 results

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Search Container */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-xl rounded-b-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="relative flex items-center gap-4">
                                {React.createElement(FiSearch as any, { className: "w-6 h-6 text-gray-400 absolute right-4" })}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ابحث عن منتج، لون، أو قسم..."
                                    className="w-full bg-gray-100 border-none rounded-xl py-4 pr-12 pl-12 text-lg focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    {React.createElement(FiX as any, { className: "w-6 h-6 text-gray-500" })}
                                </button>
                            </div>

                            {/* Results */}
                            {query && (
                                <div className="mt-6">
                                    {results.length > 0 ? (
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-medium text-gray-500">نتائج البحث ({results.length})</h3>
                                            <div className="grid gap-4">
                                                {results.map(product => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/products/${product.id}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                                    >
                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <SafeImage
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                                                                {product.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">{product.price} ريال</p>
                                                        </div>
                                                        {React.createElement(FiArrowLeft as any, { className: "w-5 h-5 text-gray-300 group-hover:text-primary-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" })}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="text-center mt-4">
                                                <Link
                                                    href={`/products?search=${query}`}
                                                    onClick={onClose}
                                                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                                >
                                                    عرض جميع النتائج
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 text-gray-500">
                                            <p>لا توجد نتائج لـ "{query}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
