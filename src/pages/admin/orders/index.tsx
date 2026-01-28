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
    const [orders, setOrders] = useState<Order[]>([])

    const [filterStatus, setFilterStatus] = useState<string>('all')

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
                return { label: status, color: 'bg-white/10 text-white', icon: FiPackage as any }
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
                <div className="border-b border-white/5 pb-12">
                    <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">LOGISTICS</span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">إدارة الطلبات</h1>
                </div>

                {/* Perspective Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-2xl opacity-40`} />
                            <p className="relative z-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                            <h3 className="relative z-10 text-4xl font-black text-white tracking-tighter italic">{stat.value}</h3>
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
                                ? 'bg-white text-black scale-105 border-transparent shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]'
                                : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white'
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
                    className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-white/[0.02]">
                                <tr>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">ID</th>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">CUSTOMER</th>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">VALUE</th>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">STATUS</th>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">DATE</th>
                                    <th className="px-10 py-6 text-xs font-black text-white/40 uppercase tracking-widest leading-none">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredOrders.map((order) => {
                                    const statusInfo = getStatusInfo(order.status)
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-white/[0.03] transition-colors group"
                                        >
                                            <td className="px-10 py-8">
                                                <span className="font-mono text-sm text-amber-500 font-bold block mb-1">#{order.id}</span>
                                                <span className="text-[10px] text-white/20 font-black uppercase tracking-tighter">{order.items} ITEMS</span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className="text-sm font-black text-white uppercase italic group-hover:text-amber-500 transition-colors">{order.customer}</p>
                                                <p className="text-[10px] text-white/20 font-bold lowercase tracking-wider">{order.email}</p>
                                            </td>
                                            <td className="px-10 py-8 whitespace-nowrap">
                                                <span className="text-xl font-black text-white tracking-tighter italic">
                                                    {order.total} <span className="text-[10px] not-italic text-white/40">ريال</span>
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${statusInfo.color}`}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-[10px] text-white/20 font-black uppercase tracking-widest">
                                                {order.date}
                                            </td>
                                            <td className="px-10 py-8">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                    className="bg-black/40 border border-white/5 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50 transition-all text-white cursor-pointer hover:bg-black/60"
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
                    <div className="text-center py-40 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">No orders in queue</span>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
