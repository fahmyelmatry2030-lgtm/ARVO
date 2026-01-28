import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FiSave, FiArrowRight, FiUpload } from 'react-icons/fi'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'

export default function NewProduct() {
    const { requireAdmin, loading, admin } = useAdmin()
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    })

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        // محاكاة حفظ المنتج
        await new Promise(resolve => setTimeout(resolve, 1000))

        // في المستقبل سيتم حفظ المنتج في قاعدة البيانات
        console.log('Product data:', formData)

        alert('تم إضافة المنتج بنجاح!')
        router.push('/admin/products')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <AdminLayout>
            <Head>
                <title>إضافة منتج جديد | الإدارة</title>
            </Head>

            <div className="max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        {React.createElement(FiArrowRight as any, { className: "w-5 h-5" })}
                        <span>رجوع</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">إضافة منتج جديد</h1>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
                >
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            اسم المنتج *
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="مثال: قميص قطن رجالي"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            الوصف
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="وصف تفصيلي للمنتج..."
                        />
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                السعر (ريال) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                الكمية المتوفرة *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            الفئة *
                        </label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="">اختر الفئة</option>
                            <option value="men">ملابس رجالية</option>
                            <option value="women">ملابس نسائية</option>
                            <option value="kids">أطفال</option>
                            <option value="accessories">إكسسوارات</option>
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            رابط الصورة
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="https://example.com/image.jpg"
                            />
                            <button
                                type="button"
                                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                title="رفع صورة"
                            >
                                {React.createElement(FiUpload as any, { className: "w-5 h-5 text-gray-600" })}
                            </button>
                        </div>
                        {formData.image && (
                            <div className="mt-3">
                                <img
                                    src={formData.image}
                                    alt="معاينة"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    {React.createElement(FiSave as any, { className: "w-5 h-5" })}
                                    حفظ المنتج
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            إلغاء
                        </button>
                    </div>
                </motion.form>
            </div>
        </AdminLayout>
    )
}
