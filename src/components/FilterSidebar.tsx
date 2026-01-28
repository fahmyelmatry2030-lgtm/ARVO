import React, { useState } from 'react'
import { categories } from '../data/categories'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronDown, FiRotateCcw } from 'react-icons/fi'

export type Filters = {
  categories: string[]
  minPrice: string
  maxPrice: string
  colors: string[]
}

type Props = {
  filters: Filters
  setFilters: (f: Filters) => void
}

const AVAILABLE_COLORS = [
  { name: 'أبيض', value: 'أبيض', hex: '#FFFFFF' },
  { name: 'أسود', value: 'أسود', hex: '#000000' },
  { name: 'أزرق', value: 'أزرق', hex: '#3B82F6' },
  { name: 'أحمر', value: 'أحمر', hex: '#EF4444' },
  { name: 'بني', value: 'بني', hex: '#92400E' },
  { name: 'رمادي', value: 'رمادي', hex: '#6B7280' },
  { name: 'بيج', value: 'بيج', hex: '#F5F5DC' },
  { name: 'كحلي', value: 'كحلي', hex: '#1E3A8A' },
]

export default function FilterSidebar({ filters, setFilters }: Props) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: true
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleCategory = (slug: string) => {
    const newCategories = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug]
    setFilters({ ...filters, categories: newCategories })
  }

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color]
    setFilters({ ...filters, colors: newColors })
  }

  const SectionHeader = ({ title, section }: { title: string, section: keyof typeof openSections }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full text-left mb-4 group"
    >
      <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider text-sm">{title}</h3>
      <motion.div
        animate={{ rotate: openSections[section] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {React.createElement(FiChevronDown as any, { className: "text-gray-400 group-hover:text-amber-600" })}
      </motion.div>
    </button>
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
      {/* Categories */}
      <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
        <SectionHeader title="التصنيفات" section="categories" />
        <AnimatePresence initial={false}>
          {openSections.categories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2.5"
            >
              {categories.map(category => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.categories.includes(category.slug)
                    ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                    : 'border-gray-200 group-hover:border-amber-400'
                    }`}>
                    {filters.categories.includes(category.slug) && React.createElement(FiCheck as any, { className: "w-3.5 h-3.5 stroke-[3]" })}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.categories.includes(category.slug)}
                    onChange={() => toggleCategory(category.slug)}
                  />
                  <span className={`text-sm tracking-wide transition-colors ${filters.categories.includes(category.slug) ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                    {category.name}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
        <SectionHeader title="السعر" section="price" />
        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="من"
                    className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-300"
                  />
                </div>
                <span className="text-gray-300">/</span>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="إلى"
                    className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Colors */}
      <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
        <SectionHeader title="الألوان" section="colors" />
        <AnimatePresence initial={false}>
          {openSections.colors && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3">
                {AVAILABLE_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => toggleColor(color.value)}
                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm ${filters.colors.includes(color.value)
                      ? 'border-amber-500 scale-110 shadow-amber-500/10'
                      : 'border-transparent hover:border-gray-100'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {React.createElement(FiCheck as any, { className: `w-4 h-4 stroke-[3] ${color.value === 'أبيض' || color.value === 'بيج' ? 'text-black' : 'text-white'}` })}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({ categories: [], minPrice: '', maxPrice: '', colors: [] })}
        className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-all active:scale-95 bg-gray-50 rounded-xl hover:bg-red-50"
      >
        {React.createElement(FiRotateCcw as any, { className: "w-3.5 h-3.5" })}
        مسح جميع الفلاتر
      </button>
    </div>
  )
}
