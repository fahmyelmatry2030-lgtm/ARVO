import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import products from '../../data/products'
import SafeImage from '../../components/SafeImage'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import SEO from '../../components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../../components/ProductCard'
import { FiTruck, FiInfo, FiRefreshCw } from 'react-icons/fi'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find(p => String(p.id) === String(id))
  const { addToCart, setIsCartOpen } = useCart()
  const { show } = useToast()
  const [activeImage, setActiveImage] = useState<number>(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care' | 'specs' | 'reviews'>('details')

  const relatedProducts = products
    .filter(p => p.category === product?.category && String(p.id) !== String(id))
    .slice(0, 4)

  useEffect(() => {
    if (!product) return
    if (product.options?.sizes?.length) setSelectedSize(product.options.sizes[0])
    if (product.options?.colors?.length) setSelectedColor(product.options.colors[0])
    setActiveImage(0)
  }, [product])

  if (!product) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <button onClick={() => router.push('/products')} className="btn-brand">العودة للمتجر</button>
        </div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, { selectedSize, selectedColor })
    setIsCartOpen(true)
    show('تمت إضافة المنتج إلى الحقيبة')
  }

  return (
    <Layout>
      <SEO
        title={product.name}
        description={product.description}
        image={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
            >
              <SafeImage
                src={(product.images && product.images[activeImage]) || product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105 duration-700"
              />
            </motion.div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 aspect-square rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-amber-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <nav className="flex items-center text-sm text-gray-500 mb-4 gap-2">
              <span onClick={() => router.push('/products')} className="hover:text-amber-600 cursor-pointer transition-colors">المتجر</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-200'}>★</span>
                ))}
              </div>
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{product.rating} / 5 ({product.reviewCount} تقييم)</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `متوفر في المخزون (${product.stock})` : 'نفذ من المخزون'}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{product.name}</h1>
            <div className="text-4xl font-black text-amber-600 mb-8 tracking-tighter">{product.price} <span className="text-lg">ج.م</span></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
              {product.longDescription || product.description}
            </p>

            {/* Options Selection */}
            <div className="space-y-10 mb-12">
              {product.options?.sizes && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Select Size</span>
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest underline decoration-gray-200 hover:text-amber-600">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.options.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[4rem] px-6 py-4 rounded-2xl border-2 text-xs font-black transition-all ${selectedSize === size ? 'border-gray-900 bg-gray-900 text-white shadow-xl' : 'border-gray-100 text-gray-400 hover:border-gray-900'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.options?.colors && (
                <div className="space-y-4">
                  <div className="px-2">
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em]">Select Color</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {product.options.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group flex items-center gap-3 pr-6 pl-2 py-2 rounded-full border-2 transition-all ${selectedColor === color ? 'border-amber-600 bg-amber-50' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className={`w-8 h-8 rounded-full border border-black/5 shadow-inner`} style={{ backgroundColor: color.includes('رمادي') ? '#4B5563' : color.includes('أخضر') ? '#065F46' : color.includes('بني') ? '#92400E' : '#FFFFFF' }}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${selectedColor === color ? 'text-amber-900' : 'text-gray-400'}`}>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-[2] bg-gray-900 text-white hover:bg-amber-600 font-black py-7 rounded-[2rem] transition-all shadow-2xl hover:shadow-amber-600/20 active:scale-95 text-xs uppercase tracking-[0.4em] disabled:bg-gray-200 disabled:shadow-none"
              >
                {product.stock > 0 ? 'Add To Selection' : 'Out Of Stock'}
              </button>
              <button className="flex-1 h-20 flex items-center justify-center border-2 border-gray-100 rounded-[2rem] hover:border-red-500 hover:text-red-500 transition-all active:scale-95 gap-3 group">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-500">Wishlist</span>
                <span className="text-xl">❤️</span>
              </button>
            </div>

            {/* Tabs for extra info */}
            <div className="border-t border-gray-100 pt-12">
              <div className="flex flex-wrap gap-10 mb-10">
                {(['details', 'specs', 'reviews', 'shipping'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'}`}
                  >
                    {tab === 'details' && 'The Story'}
                    {tab === 'specs' && 'Technical'}
                    {tab === 'reviews' && `Feedback (${product.reviewCount})`}
                    {tab === 'shipping' && 'Delivery'}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600 rounded-full" />}
                  </button>
                ))}
              </div>

              <div className="text-gray-600 text-sm leading-relaxed min-h-[12rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'details' && (
                      <div className="prose prose-sm max-w-none">
                        <p className="font-medium text-lg text-gray-700 mb-6 italic underline decoration-amber-600/20 underline-offset-8">Crafted for the few who appreciate the silent roar of excellence.</p>
                        <p className="text-gray-500 leading-loose">Every element of this piece has been meticulously vetted. From the initial sketch to the final stitch, we ensure a trajectory of quality that transcends seasonal trends. This is not just apparel; it is a legacy item designed to evolve with you.</p>
                      </div>
                    )}
                    {activeTab === 'specs' && product.specifications && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex flex-col gap-2 border-b border-gray-50 pb-4">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{key}</span>
                            <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="space-y-10">
                        {product.reviews?.map((review) => (
                          <div key={review.id} className="bg-gray-50 p-8 rounded-[2rem]">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">{review.user}</p>
                                <div className="flex text-amber-500 text-[10px]">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? 'text-amber-500' : 'text-gray-200'}>★</span>
                                  ))}
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-gray-600 font-medium italic">"{review.comment}"</p>
                          </div>
                        ))}
                        {(!product.reviews || product.reviews.length === 0) && (
                          <div className="text-center py-10">
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No Feedback Yet. Be the first.</p>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === 'shipping' && (
                      <div className="space-y-8">
                        <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-3xl">
                          {React.createElement(FiTruck as any, { className: "text-amber-600 text-2xl flex-shrink-0" })}
                          <div>
                            <p className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Global Delivery</p>
                            <p className="text-xs text-gray-500 font-medium">Free express shipping on all orders above 500 EGP. Delivered in bespoke premium packaging.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-3xl">
                          {React.createElement(FiRefreshCw as any, { className: "text-amber-600 text-2xl flex-shrink-0" })}
                          <div>
                            <p className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Returns & Exchanges</p>
                            <p className="text-xs text-gray-500 font-medium">Complimentary returns within 14 days. We ensure a seamless transition for your perfect fit.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">قد يعجبك أيضاً</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}
