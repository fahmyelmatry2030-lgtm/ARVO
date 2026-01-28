import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import AdminLayout, { useAdminTheme } from '../../components/admin/AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'
import { offers as initialOffers } from '../../data/offers'

export default function AdminOffers() {
    const { requireAdmin, loading, admin } = useAdmin()
    const { theme } = useAdminTheme()
    const [offers, setOffers] = useState(initialOffers)

    useEffect(() => {
        requireAdmin()
    }, [admin, loading])

    if (loading || !admin) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const handleDelete = (id: string | number) => {
        if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
            setOffers(offers.filter(o => o.id !== id))
        }
    }

    return (
        <AdminLayout>
            <Head>
                <title>إدارة العروض | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12">
                {/* Header */}
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'} pb-12`}>
                    <div>
                        <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">PROMOTIONS</span>
                        <h1 className={`text-4xl md:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} leading-none tracking-tighter uppercase italic`}>إدارة العروض</h1>
                    </div>
                    <button
                        className={`group relative px-10 py-5 ${theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'} font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95`}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {React.createElement(FiPlus as any, { className: "w-4 h-4" })}
                            إنشاء عرض جديد
                        </span>
                        <div className="absolute inset-0 bg-amber-500 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                    </button>
                </div>

                {/* Offers Table/Grid */}
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                        {offers.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`text-center py-40 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[3rem]`}
                            >
                                {React.createElement(FiTag as any, { className: `w-16 h-16 ${theme === 'dark' ? 'text-white/10' : 'text-gray-100'} mx-auto mb-6` })}
                                <span className={`text-[10px] font-black ${theme === 'dark' ? 'text-white/20' : 'text-gray-300'} uppercase tracking-[0.8em]`}>لا توجد عروض حالياً</span>
                            </motion.div>
                        ) : (
                            offers.map((offer: any, index: number) => (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-amber-500/30 transition-all duration-500`}
                                >
                                    <div className="flex items-center gap-8 w-full md:w-auto">
                                        <div className={`w-20 h-20 ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'} rounded-3xl flex items-center justify-center text-amber-500`}>
                                            {React.createElement(FiTag as any, { className: "w-10 h-10" })}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} italic tracking-tighter`}>{offer.title}</h3>
                                                <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${offer.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {offer.isActive ? 'Active' : 'Expired'}
                                                </span>
                                            </div>
                                            <p className={`${theme === 'dark' ? 'text-white/40' : 'text-gray-500'} font-bold text-sm mb-4 leading-relaxed max-w-md`}>{offer.description}</p>
                                            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-amber-500/60">
                                                <div className="flex items-center gap-2">
                                                    {React.createElement(FiClock as any, { className: "w-3 h-3" })}
                                                    <span>تنتهي في: {offer.endDate}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {React.createElement(FiCheckCircle as any, { className: "w-3 h-3" })}
                                                    <span>الخصم: {offer.discount}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                        <button className={`flex-1 md:flex-none h-14 px-8 ${theme === 'dark' ? 'bg-white/[0.05] text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all`}>
                                            تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDelete(offer.id)}
                                            className="w-14 h-14 bg-red-500/10 text-red-500 flex items-center justify-center rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            {React.createElement(FiTrash2 as any, { className: "w-5 h-5" })}
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Info Card */}
                <div className={`${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200 shadow-sm'} border rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10`}>
                    <div className="text-6xl">💡</div>
                    <div>
                        <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 italic`}>نصيحة للإدارة</h4>
                        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} font-bold leading-relaxed`}>العروض الموسمية تزيد من نسبة المبيعات بمعدل 40%. تأكد من جدولة عروضك القادمة قبل فترة كافية لجذب انتباه العملاء.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
