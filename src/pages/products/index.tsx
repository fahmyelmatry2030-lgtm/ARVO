import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'
import FilterSidebar, { Filters } from '../../components/FilterSidebar'
import productsData from '../../data/products'
import { FiFilter, FiX, FiSearch, FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../../components/SEO'
import { ProductSkeleton, FilterSkeleton } from '../../components/ui/Skeleton'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

export default function Products() {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: '',
    maxPrice: '',
    colors: []
  })
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [isLoading, setIsLoading] = useState(true)

  // Sync with URL params
  useEffect(() => {
    if (!router.isReady) return

    const { search, category, offer } = router.query

    if (search) setQuery(search as string)
    if (category) setFilters(prev => ({ ...prev, categories: [category as string] }))
    if (offer) setFilters(prev => ({ ...prev, categories: [offer as string] }))

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [router.isReady, router.query])

  const filtered = useMemo(() => {
    let result = productsData.filter(p => {
      // Category Filter
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false

      // Price Filter
      const min = filters.minPrice ? Number(filters.minPrice) : 0
      const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity
      if (p.price < min || (max > 0 && p.price > max)) return false

      // Color Filter
      if (filters.colors.length > 0) {
        const productColors = p.options?.colors || []
        const hasColor = filters.colors.some(c => productColors.includes(c))
        if (!hasColor) return false
      }

      // Search Query
      if (query) {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      }

      return true
    })

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        // Mock popular sorting
        result.sort((a, b) => (b.id % 5) - (a.id % 5))
        break
      default:
        // Newest (reversed mock data)
        result.reverse()
    }

    return result
  }, [filters, query, sortBy])

  return (
    <Layout>
      <SEO
        title="تسوق جميع المنتجات"
        description="تصفح مجموعتنا الواسعة من الملابس العصرية. جودة عالية وتصاميم فريدة تناسب جميع الأذواق."
      />

      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">كولكشن 2024</h1>
              <p className="text-gray-500 text-lg">اكتشف أحدث صيحات الموضة العالمية المصممة خصيصاً بجودة لا تضاهى.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex-1 px-6 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors font-bold text-sm"
                >
                  {React.createElement(FiFilter as any, { className: "text-amber-600" })}
                  <span>تصفية</span>
                </button>
                <div className="relative flex-1 md:w-80 group">
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="ابحث عن قطعة مميزة..."
                    className="w-full px-5 py-3 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {React.createElement(FiSearch as any, { className: "h-5 w-5 text-gray-400 group-focus-within:text-amber-600 transition-colors" })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto gap-8">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest whitespace-nowrap">
                  {filtered.length} قطعة وجدت
                </p>

                <div className="relative group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="price-asc">السعر: من الأقل</option>
                    <option value="price-desc">السعر: من الأعلى</option>
                    <option value="popular">الأكثر شعبية</option>
                  </select>
                  {React.createElement(FiChevronDown as any, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12">
          <div className="flex gap-10">
            {/* Sidebar (Desktop) */}
            <aside className="w-80 hidden lg:block flex-shrink-0">
              <div className="sticky top-28">
                {isLoading ? <FilterSkeleton /> : <FilterSidebar filters={filters} setFilters={setFilters} />}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                    >
                      <ProductCard product={product} isNew={product.id % 3 === 0} isSale={product.id % 5 === 0} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-6">
                    {React.createElement(FiSearch as any, { className: "w-10 h-10 text-gray-200" })}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">لم نجد ما تبحث عنه</h3>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto">نعتذر، لم نتمكن من العثور على أي منتج يطابق خيارات التصفية الخاصة بك.</p>
                  <button
                    onClick={() => {
                      setFilters({ categories: [], minPrice: '', maxPrice: '', colors: [] })
                      setQuery('')
                    }}
                    className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all active:scale-95 shadow-lg shadow-amber-600/20"
                  >
                    مسح جميع الفلاتر
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[60] lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex items-center justify-between border-b sticky top-0 bg-white z-10">
                <h2 className="text-xl font-black uppercase tracking-widest text-gray-900">تصفية المنتجات</h2>
                <button onClick={() => setFilterOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                  {React.createElement(FiX as any, { className: "w-6 h-6" })}
                </button>
              </div>
              <div className="p-6">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
              <div className="p-6 border-t sticky bottom-0 bg-white shadow-up">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 active:scale-95"
                >
                  عرض النتائج ({filtered.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  )
}
