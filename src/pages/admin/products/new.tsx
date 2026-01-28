import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FiSave, FiArrowRight, FiUpload } from 'react-icons/fi'
import AdminLayout, { useAdminTheme } from '../../../components/admin/AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'
import { useRef } from 'react'

export default function NewProduct() {
    const { requireAdmin, loading, admin } = useAdmin()
    const { theme } = useAdminTheme()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
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
                        className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'} mb-4 transition-colors`}
                    >
                        {React.createElement(FiArrowRight as any, { className: "w-5 h-5" })}
                        <span>رجوع</span>
                    </button>
                    <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} uppercase italic tracking-tighter`}>إضافة منتج جديد</h1>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className={`${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100 shadow-sm'} rounded-[2.5rem] border p-10 space-y-8`}
                >
                    {/* Product Name */}
                    <div>
                        <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
                            اسم المنتج *
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`}
                            placeholder="مثال: قميص قطن رجالي"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
                            الوصف
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:${theme === 'dark' ? 'text-white/10' : 'text-gray-300'} resize-none`}
                            placeholder="وصف تفصيلي للمنتج..."
                        />
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
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
                                className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
                                الكمية المتوفرة *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={handleChange}
                                className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
                            الفئة *
                        </label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold appearance-none cursor-pointer`}
                        >
                            <option value="">اختر الفئة</option>
                            <option value="men">ملابس رجالية</option>
                            <option value="women">ملابس نسائية</option>
                            <option value="kids">أطفال</option>
                            <option value="accessories">إكسسوارات</option>
                        </select>
                    </div>

                    {/* Image URL & Local Upload */}
                    <div>
                        <label className={`block text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-3`}>
                            صورة المنتج
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="url"
                                name="image"
                                value={formData.image.startsWith('data:') ? 'صورة مرفوعة محلياً' : formData.image}
                                onChange={handleChange}
                                disabled={formData.image.startsWith('data:')}
                                className={`flex-1 px-6 py-4 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all font-bold placeholder:${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`}
                                placeholder="رابط الصورة (URL)"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`px-6 py-4 ${theme === 'dark' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white' : 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white'} rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3`}
                                >
                                    {React.createElement(FiUpload as any, { className: "w-4 h-4" })}
                                    رفع صورة
                                </button>
                                {formData.image.startsWith('data:') && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                        className="px-6 py-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
                                    >
                                        حذف
                                    </button>
                                )}
                            </div>
                        </div>
                        {formData.image && (
                            <div className="mt-6 flex justify-center sm:justify-start">
                                <div className={`relative p-2 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-[2rem] overflow-hidden group`}>
                                    <img
                                        src={formData.image}
                                        alt="معاينة"
                                        className="w-40 h-40 object-cover rounded-[1.5rem]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Preview</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className={`flex flex-col sm:flex-row gap-4 pt-10 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                        <button
                            type="submit"
                            disabled={saving}
                            className={`flex-1 relative group h-16 ${theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'} rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {saving ? (
                                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {React.createElement(FiSave as any, { className: "w-4 h-4" })}
                                        حفظ المنتج
                                    </>
                                )}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className={`flex-1 h-16 ${theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} rounded-2xl font-black uppercase tracking-widest text-xs transition-all`}
                        >
                            إلغاء
                        </button>
                    </div>
                </motion.form>
            </div>
        </AdminLayout>
    )
}
