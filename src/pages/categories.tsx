import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { categories } from '../data/categories'
import SafeImage from '../components/SafeImage'

export default function Categories() {
    return (
        <Layout>
            <SEO
                title="التصنيفات"
                description="تصفح جميع تصنيفات الملابس والإكسسوارات - ملابس رجالية، نسائية، أحذية، حقائب والمزيد من براند الملابس."
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        تصنيفات المنتجات
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        اختر التصنيف المناسب لك وابدأ التسوق من مجموعتنا الواسعة
                    </motion.p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/products?category=${category.slug}`}
                                className="group block relative h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <SafeImage
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                    <p className="text-gray-200 mb-3">{category.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                            {category.count} منتج
                                        </span>
                                        <span className="text-sm font-medium group-hover:translate-x-2 transition-transform">
                                            تسوق الآن ←
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        لم تجد ما تبحث عنه؟
                    </h2>
                    <p className="text-gray-600 mb-6">
                        تصفح جميع المنتجات أو استخدم البحث للعثور على ما تريد
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products"
                            className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                        >
                            تصفح جميع المنتجات
                        </Link>
                        <Link
                            href="/products"
                            className="inline-block bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-primary-500 hover:text-primary-600 transition-all"
                        >
                            البحث المتقدم
                        </Link>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}
