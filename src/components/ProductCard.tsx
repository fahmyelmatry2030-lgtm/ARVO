import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiPlus, FiHeart, FiEye } from 'react-icons/fi'
import SafeImage from './SafeImage'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
  isNew?: boolean
  isSale?: boolean
  originalPrice?: number
}

export default function ProductCard({
  product,
  isNew = false,
  isSale = false,
  originalPrice
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { show } = useToast()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    show(`تمت إضافة ${product.name} إلى السلة`)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white overflow-hidden transition-all duration-700 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] border border-gray-100"
    >
      {/* Badges */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-white text-gray-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-gray-100">
            NEW
          </span>
        )}
        {isSale && (
          <span className="bg-amber-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
            SALE
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border-b border-gray-50">
        <Link href={`/products/${product.id}`} className="block h-full">
          <SafeImage
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-6 px-6 flex items-center justify-center gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-700 px-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-amber-600 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            {React.createElement(FiPlus as any, { className: "w-4 h-4" })}
            أضف للسلة
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-900 hover:text-red-500 shadow-xl'}`}
          >
            {React.createElement(FiHeart as any, { className: `w-5 h-5 ${isWishlisted ? 'fill-current' : ''}` })}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em]">{product.category}</span>
          <div className="h-px flex-1 bg-gray-100 mx-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-[10px]">★</span>
            <span className="text-[10px] font-black text-gray-900">{product.rating}</span>
            <span className="text-[8px] font-bold text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-tight group-hover:text-amber-600 transition-colors">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900 tracking-tighter">{product.price} <span className="text-xs">ج.م</span></span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through decoration-amber-600/30 font-bold">{originalPrice} ج.م</span>
            )}
          </div>

          <Link href={`/products/${product.id}`} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:text-amber-600 hover:border-amber-600 transition-all">
            {React.createElement(FiEye as any, { className: "w-4 h-4" })}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
