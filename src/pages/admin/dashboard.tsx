import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
    FiPackage,
    FiShoppingBag,
    FiDollarSign,
    FiTrendingUp,
    FiClock,
    FiCheckCircle
} from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminDashboard() {
    const { admin, requireAdmin, loading } = useAdmin()
    const router = useRouter()

    useEffect(() => {
        requireAdmin()
    }, [admin, loading])

    if (loading || !admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const stats = [
        {
            icon: FiPackage,
            label: 'إجمالي المنتجات',
            value: '0',
            change: '0',
            color: 'from-blue-500/20 to-transparent'
        },
        {
            icon: FiShoppingBag,
            label: 'الطلبات الجديدة',
            value: '0',
            change: '0',
            color: 'from-green-500/20 to-transparent'
        },
        {
            icon: FiDollarSign,
            label: 'المبيعات اليوم',
            value: '0',
            change: '0%',
            color: 'from-amber-500/20 to-transparent'
        },
        {
            icon: FiTrendingUp,
            label: 'معدل النمو',
            value: '0%',
            change: '0%',
            color: 'from-purple-500/20 to-transparent'
        }
    ]

    const recentOrders: any[] = []

    return (
        <AdminLayout>
            <Head>
                <title>لوحة التحكم | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12">
                {/* Header Section */}
                <div className="relative">
                    <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">OVERVIEW</span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">
                        مرحباً، <span className="text-amber-500">{admin.name}</span>
                    </h1>
                </div>

                {/* Perspective Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-amber-500/30 transition-all duration-500"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity blur-2xl`} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                    {React.createElement(stat.icon as any, { className: "w-6 h-6" })}
                                </div>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-3xl font-black text-white tracking-tighter italic">{stat.value}</h3>
                                    <span className="text-[10px] font-black text-green-500">{stat.change}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Editorial Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden"
                >
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic">آخر الطلبات</h2>
                        <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:text-white transition-colors">عرض الكل</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-white/[0.02]">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black text-white/40 uppercase">رقم الطلب</th>
                                    <th className="px-8 py-5 text-xs font-black text-white/40 uppercase">العميل</th>
                                    <th className="px-8 py-5 text-xs font-black text-white/40 uppercase">المبلغ</th>
                                    <th className="px-8 py-5 text-xs font-black text-white/40 uppercase">الحالة</th>
                                    <th className="px-8 py-5 text-xs font-black text-white/40 uppercase">الوقت</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="font-mono text-sm text-amber-500">#{order.id}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors uppercase">{order.customer}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-white">{order.total} ج.م</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'completed'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                                                    }`} />
                                                {order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-[10px] text-white/20 font-bold">
                                            {order.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    )
}
