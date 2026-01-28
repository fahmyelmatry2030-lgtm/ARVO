import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye } from 'react-icons/fi'
import AdminLayout, { useAdminTheme } from '../../../components/admin/AdminLayout'
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
    const { theme } = useAdminTheme()
    const [orders, setOrders] = useState<Order[]>([])

    const [filterStatus, setFilterStatus] = useState<string>('all')

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

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus)

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending':
                return { label: 'PENDING', color: 'bg-yellow-500/10 text-yellow-500', icon: FiClock as any }
            case 'processing':
                return { label: 'PROCESSING', color: 'bg-blue-500/10 text-blue-500', icon: FiPackage as any }
            case 'shipped':
                return { label: 'SHIPPED', color: 'bg-purple-500/10 text-purple-500', icon: FiTruck as any }
            case 'delivered':
                return { label: 'DELIVERED', color: 'bg-green-500/10 text-green-500', icon: FiCheckCircle as any }
            default:
                return { label: status, color: theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500', icon: FiPackage as any }
        }
    }

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const stats = [
        { label: 'ORDERS', value: orders.length, color: 'from-amber-500/20 to-transparent' },
        { label: 'PENDING', value: orders.filter(o => o.status === 'pending').length, color: 'from-yellow-500/20 to-transparent' },
        { label: 'SHIPPED', value: orders.filter(o => o.status === 'shipped').length, color: 'from-purple-500/20 to-transparent' },
        { label: 'COMPLETED', value: orders.filter(o => o.status === 'delivered').length, color: 'from-green-500/20 to-transparent' },
    ]

    return (
        <AdminLayout>
            <Head>
                <title>إدارة الطلبات | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12">
                {/* Header */}
                <div className={`border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'} pb-12`}>
                    <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">LOGISTICS</span>
                    <h1 className={`text-4xl md:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} leading-none tracking-tighter uppercase italic`}>إدارة الطلبات</h1>
                </div>

                {/* Perspective Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group ${theme === 'dark' ? 'bg-white/[0.03] border-white/5' : 'bg-white border-gray-100 shadow-sm'} backdrop-blur-md border p-8 rounded-[2rem] hover:border-amber-500/30 transition-all duration-500 overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-2xl opacity-40`} />
                            <p className={`relative z-10 text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-2`}>{stat.label}</p>
                            <h3 className={`relative z-10 text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} tracking-tighter italic`}>{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${filterStatus === status
                                ? theme === 'dark'
                                    ? 'bg-white text-black scale-105 border-transparent shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]'
                                    : 'bg-gray-900 text-white scale-105 border-transparent shadow-lg'
                                : theme === 'dark'
                                    ? 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white'
                                    : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {status === 'all' ? `الكل (${orders.length})` : status}
                        </button>
                    ))}
                </div>

                {/* Orders Content - Editorial Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className={theme === 'dark' ? 'bg-white/[0.02]' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>ID</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>CUSTOMER</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>VALUE</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>STATUS</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>DATE</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-50'}`}>
                                {filteredOrders.map((order) => {
                                    const statusInfo = getStatusInfo(order.status)
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`${theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-gray-50'} transition-colors group`}
                                        >
                                            <td className="px-10 py-8">
                                                <span className="font-mono text-sm text-amber-500 font-bold block mb-1">#{order.id}</span>
                                                <span className={`text-[10px] ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} font-black uppercase tracking-tighter`}>{order.items} ITEMS</span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} uppercase italic group-hover:text-amber-500 transition-colors`}>{order.customer}</p>
                                                <p className={`text-[10px] ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} font-bold lowercase tracking-wider`}>{order.email}</p>
                                            </td>
                                            <td className="px-10 py-8 whitespace-nowrap">
                                                <span className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} tracking-tighter italic`}>
                                                    {order.total} <span className={`text-[10px] not-italic ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`}>ريال</span>
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${statusInfo.color}`}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-[10px] ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} font-black uppercase tracking-widest">
                                                {order.date}
                                            </td>
                                            <td className="px-10 py-8">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                    className={`${theme === 'dark' ? 'bg-black/40 border-white/5 text-white hover:bg-black/60' : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'} border text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className={`text-center py-40 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100 shadow-sm'} rounded-[3rem]`}>
                        <span className={`text-[10px] font-black ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} uppercase tracking-[0.8em]`}>No orders in queue</span>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
