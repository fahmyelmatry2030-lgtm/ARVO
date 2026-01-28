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
import AdminLayout, { useAdminTheme } from '../../components/admin/AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminDashboard() {
    const { admin, requireAdmin, loading } = useAdmin()
    const { theme } = useAdminTheme()
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
            value: '42',
            change: '+5%',
            color: 'from-blue-500/20 to-transparent'
        },
        {
            icon: FiShoppingBag,
            label: 'الطلبات النشطة',
            value: '12',
            change: '+8%',
            color: 'from-green-500/20 to-transparent'
        },
        {
            icon: FiDollarSign,
            label: 'المبيعات اليوم',
            value: '24,500',
            change: '+12%',
            color: 'from-amber-500/20 to-transparent'
        },
        {
            icon: FiTrendingUp,
            label: 'معدل الزيارات',
            value: '1.2k',
            change: '+15%',
            color: 'from-purple-500/20 to-transparent'
        }
    ]

    const recentOrders = [
        { id: '1024', customer: 'أحمد محمود', total: '1,200', status: 'completed', time: 'منذ ساعتين' },
        { id: '1025', customer: 'سارة علي', total: '850', status: 'pending', time: 'منذ 3 ساعات' },
        { id: '1026', customer: 'خالد حسن', total: '3,400', status: 'completed', time: 'منذ 5 ساعات' },
    ]

    return (
        <AdminLayout>
            <Head>
                <title>لوحة التحكم | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12 pb-20">
                {/* Header Section */}
                <div className="relative">
                    <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">OVERVIEW</span>
                    <h1 className="text-4xl md:text-6xl font-black text-inherit leading-none tracking-tighter uppercase italic">
                        مرحباً، <span className="text-amber-500">{admin.name}</span>
                    </h1>
                </div>

                {/* Perspective Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} backdrop-blur-md border p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all duration-500`}
                        >
                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-amber-50'} flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all`}>
                                    {React.createElement(stat.icon as any, { className: "w-6 h-6" })}
                                </div>
                                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-3xl font-black tracking-tighter italic">{stat.value}</h3>
                                    <span className="text-[10px] font-black text-green-500">{stat.change}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visual Analytics Mock */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[3rem] p-10 relative overflow-hidden group`}>
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight italic">إحصائيات المبيعات</h2>
                                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">نمو بنسبة 12% هذا الأسبوع</p>
                                </div>
                            </div>

                            {/* Simplified Visual Bar Chart */}
                            <div className="flex items-end justify-between h-64 gap-3">
                                {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                        <div className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded-t-xl relative overflow-hidden group/bar`} style={{ height: '100%' }}>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500/50 to-amber-500 rounded-t-xl group-hover/bar:from-amber-400 group-hover/bar:to-amber-500 transition-all"
                                            />
                                        </div>
                                        <span className="text-[8px] font-black opacity-20 uppercase">Day {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Orders Table */}
                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[3rem] overflow-hidden`}>
                            <div className={`p-8 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-50'} flex items-center justify-between`}>
                                <h2 className="text-xl font-black uppercase tracking-tight italic">آخر الطلبات</h2>
                                <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:text-inherit transition-colors">عرض الكل</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-right text-inherit">
                                    <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}>
                                        <tr>
                                            <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">رقم الطلب</th>
                                            <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">العميل</th>
                                            <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">المبلغ</th>
                                            <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الحالة</th>
                                            <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الوقت</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-50'}`}>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <span className="font-mono text-sm text-amber-500">#{order.id}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold group-hover:text-amber-500 transition-colors uppercase">{order.customer}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-black">{order.total} ج.م</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${order.status === 'completed'
                                                        ? 'bg-green-500/10 text-green-500'
                                                        : 'bg-amber-500/10 text-amber-500'
                                                        }`}>
                                                        <div className={`w-1 h-1 rounded-full ${order.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                        {order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-[10px] opacity-20 font-extrabold">
                                                    {order.time}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Side Info */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-[3rem] p-10 text-black">
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">PRO Tips</h3>
                            <p className="text-sm font-bold opacity-80 leading-relaxed mb-8">
                                هل تلاحظ زيادة الزيارات من الجوال؟ ننصحك بتفعيل عروض حصرية لمستخدمي التطبيق.
                            </p>
                            <div className="w-20 h-1 bg-black/20" />
                        </div>

                        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[3rem] p-8`}>
                            <h3 className={`text-sm font-black uppercase tracking-widest mb-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-50'} pb-4`}>نشاط المستودع</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-10 border-r-2 border-amber-500/30" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase">إضافة منتج جديد</p>
                                            <p className="text-[9px] opacity-40">بواسطة {admin.name} • 10:30 AM</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
