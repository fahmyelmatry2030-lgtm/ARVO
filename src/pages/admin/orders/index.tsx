import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye } from 'react-icons/fi'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'

interface Order {
    id: string
    customer: string
    email: string
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    date: string
    items: number
}

export default function AdminOrders() {
    const { requireAdmin, loading, admin } = useAdmin()
    const [orders, setOrders] = useState<Order[]>([
        {
            id: '1001',
            customer: 'أحمد محمد',
            email: 'ahmad@example.com',
            total: 450,
            status: 'pending',
            date: '2024-01-15',
            items: 3
        },
        {
            id: '1002',
            customer: 'فاطمة علي',
            email: 'fatima@example.com',
            total: 680,
            status: 'delivered',
            date: '2024-01-14',
            items: 2
        },
        {
            id: '1003',
            customer: 'محمد سعيد',
            email: 'mohammed@example.com',
            total: 320,
            status: 'processing',
            date: '2024-01-14',
            items: 1
        },
        {
            id: '1004',
            customer: 'سارة أحمد',
            email: 'sara@example.com',
            total: 890,
            status: 'shipped',
            date: '2024-01-13',
            items: 4
        },
    ])

    const [filterStatus, setFilterStatus] = useState<string>('all')

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

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus)

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending':
                return { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-700', icon: FiClock as any }
            case 'processing':
                return { label: 'قيد المعالجة', color: 'bg-blue-100 text-blue-700', icon: FiPackage as any }
            case 'shipped':
                return { label: 'تم الشحن', color: 'bg-purple-100 text-purple-700', icon: FiTruck as any }
            case 'delivered':
                return { label: 'تم التسليم', color: 'bg-green-100 text-green-700', icon: FiCheckCircle as any }
            default:
                return { label: status, color: 'bg-gray-100 text-gray-700', icon: FiPackage as any }
        }
    }

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const stats = [
        { label: 'إجمالي الطلبات', value: orders.length, color: 'from-blue-500 to-blue-600' },
        { label: 'قيد الانتظار', value: orders.filter(o => o.status === 'pending').length, color: 'from-yellow-500 to-yellow-600' },
        { label: 'قيد المعالجة', value: orders.filter(o => o.status === 'processing').length, color: 'from-purple-500 to-purple-600' },
        { label: 'تم التسليم', value: orders.filter(o => o.status === 'delivered').length, color: 'from-green-500 to-green-600' },
    ]

    return (
        <AdminLayout>
            <Head>
                <title>إدارة الطلبات | الإدارة</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h1>
                    <p className="text-gray-600 mt-1">
                        متابعة وإدارة جميع الطلبات
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                        >
                            <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === 'all'
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            الكل ({orders.length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            قيد الانتظار ({orders.filter(o => o.status === 'pending').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('processing')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === 'processing'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            قيد المعالجة ({orders.filter(o => o.status === 'processing').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('shipped')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === 'shipped'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            تم الشحن ({orders.filter(o => o.status === 'shipped').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('delivered')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === 'delivered'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            تم التسليم ({orders.filter(o => o.status === 'delivered').length})
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                                        المنتجات
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        المبلغ
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        التاريخ
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        إجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => {
                                    const statusInfo = getStatusInfo(order.status)
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm font-medium text-gray-900">
                                                    #{order.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                                    <p className="text-xs text-gray-500">{order.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{order.items} منتج</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {order.total} ريال
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                                    {React.createElement(statusInfo.icon as any, { className: "w-3.5 h-3.5" })}
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                >
                                                    <option value="pending">قيد الانتظار</option>
                                                    <option value="processing">قيد المعالجة</option>
                                                    <option value="shipped">تم الشحن</option>
                                                    <option value="delivered">تم التسليم</option>
                                                </select>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 text-lg">لا توجد طلبات</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
