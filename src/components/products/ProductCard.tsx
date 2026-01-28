import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isSale = false
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
            جديد
          </span>
        )}
        {isSale && (
          <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
            خصم
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <Link href={`/products/${id}`} className="block h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white rounded-full p-2 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors">
            {React.createElement(FiShoppingCart as any, { className: "w-5 h-5" })}
          </button>
          <button className="bg-white rounded-full p-2 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors">
            {React.createElement(FiHeart as any, { className: "w-5 h-5" })}
          </button>
          <button className="bg-white rounded-full p-2 text-gray-800 hover:bg-primary-500 hover:text-white transition-colors">
            {React.createElement(FiEye as any, { className: "w-5 h-5" })}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="text-sm text-gray-500">{category}</span>
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
          <Link href={`/products/${id}`} className="hover:text-primary-600 transition-colors">
            {name}
          </Link>
        </h3>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{price.toFixed(2)} ر.س</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">{originalPrice.toFixed(2)} ر.س</span>
            )}
          </div>

          <button className="text-primary-600 hover:text-primary-700 transition-colors">
            {React.createElement(FiShoppingCart as any, { className: "w-5 h-5" })}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
