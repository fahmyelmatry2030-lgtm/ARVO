import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onResetFilters: () => void;
}

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'men', name: 'ملابس رجالية' },
  { id: 'women', name: 'ملابس نسائية' },
  { id: 'kids', name: 'أطفال' },
  { id: 'accessories', name: 'إكسسوارات' }
];

const colors = [
  { id: 'red', name: 'أحمر', color: 'bg-red-500' },
  { id: 'blue', name: 'أزرق', color: 'bg-blue-500' },
  { id: 'green', name: 'أخضر', color: 'bg-green-500' },
  { id: 'black', name: 'أسود', color: 'bg-black' },
  { id: 'white', name: 'أبيض', color: 'bg-white border' },
  { id: 'gray', name: 'رمادي', color: 'bg-gray-400' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    color: true,
    size: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">تصفية النتائج</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                {React.createElement(FiX as any, { className: "w-6 h-6" })}
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="w-full flex justify-between items-center py-2 text-right"
                  onClick={() => toggleSection('category')}
                >
                  <span className="font-medium">الفئة</span>
                  {openSections.category ? React.createElement(FiChevronUp as any, {}) : React.createElement(FiChevronDown as any, {})}
                </button>

                {openSections.category && (
                  <div className="mt-2 space-y-2 pr-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`category-${category.id}`}
                          name="category"
                          type="radio"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={onFilterChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="mr-2 text-sm text-gray-700"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="w-full flex justify-between items-center py-2 text-right"
                  onClick={() => toggleSection('price')}
                >
                  <span className="font-medium">نطاق السعر</span>
                  {openSections.price ? React.createElement(FiChevronUp as any, {}) : React.createElement(FiChevronDown as any, {})}
                </button>

                {openSections.price && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                          من
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <input
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            value={filters.minPrice}
                            onChange={onFilterChange}
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">ر.س</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                          إلى
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <input
                            type="number"
                            name="maxPrice"
                            id="maxPrice"
                            value={filters.maxPrice}
                            onChange={onFilterChange}
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="1000"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">ر.س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="w-full flex justify-between items-center py-2 text-right"
                  onClick={() => toggleSection('color')}
                >
                  <span className="font-medium">اللون</span>
                  {openSections.color ? React.createElement(FiChevronUp as any, {}) : React.createElement(FiChevronDown as any, {})}
                </button>

                {openSections.color && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        className={`w-8 h-8 rounded-full ${color.color} border border-gray-200`}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Size Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="w-full flex justify-between items-center py-2 text-right"
                  onClick={() => toggleSection('size')}
                >
                  <span className="font-medium">المقاس</span>
                  {openSections.size ? React.createElement(FiChevronUp as any, {}) : React.createElement(FiChevronDown as any, {})}
                </button>

                {openSections.size && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
              <button
                onClick={onResetFilters}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                إعادة تعيين
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                عرض النتائج
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
