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
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    // Mock statistics - في المستقبل سيتم جلبها من قاعدة البيانات
    const stats = [
        {
            icon: FiPackage,
            label: 'إجمالي المنتجات',
            value: '156',
            change: '+12',
            changeType: 'positive',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: FiShoppingBag,
            label: 'الطلبات الجديدة',
            value: '24',
            change: '+5',
            changeType: 'positive',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: FiDollarSign,
            label: 'المبيعات اليوم',
            value: '12,450',
            change: '+8%',
            changeType: 'positive',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: FiTrendingUp,
            label: 'معدل النمو',
            value: '23%',
            change: '+3%',
            changeType: 'positive',
            color: 'from-orange-500 to-orange-600'
        }
    ]

    // Mock recent orders
    const recentOrders = [
        { id: '1001', customer: 'أحمد محمد', total: 450, status: 'pending', time: 'منذ 5 دقائق' },
        { id: '1002', customer: 'فاطمة علي', total: 680, status: 'completed', time: 'منذ 15 دقيقة' },
        { id: '1003', customer: 'محمد سعيد', total: 320, status: 'pending', time: 'منذ 30 دقيقة' },
        { id: '1004', customer: 'سارة أحمد', total: 890, status: 'completed', time: 'منذ ساعة' },
    ]

    return (
        <AdminLayout>
            <Head>
                <title>لوحة التحكم | الإدارة</title>
            </Head>

            <div className="space-y-6">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        مرحباً، {admin.name} 👋
                    </h1>
                    <p className="text-gray-600">
                        إليك نظرة سريعة على أداء متجرك اليوم
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                                    {React.createElement(stat.icon as any, { className: "w-6 h-6" })}
                                </div>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.changeType === 'positive'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">آخر الطلبات</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        رقم الطلب
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        العميل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        المبلغ
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        الوقت
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm font-medium text-gray-900">
                                                #{order.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">{order.customer}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                {order.total} ريال
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {React.createElement(
                                                    (order.status === 'completed' ? FiCheckCircle : FiClock) as any,
                                                    { className: "w-3 h-3" }
                                                )}
                                                {order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
