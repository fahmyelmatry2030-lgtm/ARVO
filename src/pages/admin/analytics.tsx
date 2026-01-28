import React, { useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiUsers, FiClock, FiMapPin, FiMonitor, FiActivity } from 'react-icons/fi'
import AdminLayout, { useAdminTheme } from '../../components/admin/AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminAnalytics() {
    const { admin, requireAdmin, loading } = useAdmin()
    const { theme } = useAdminTheme()

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

    // Mock data for user login history
    const loginHistory = [
        { id: 1, user: 'أحمد محمود', email: 'ahmed@example.com', time: '2025-01-28 10:15', status: 'نجاح', device: 'Windows / Chrome', location: 'القاهرة، مصر' },
        { id: 2, user: 'سارة علي', email: 'sara@example.com', time: '2025-01-28 09:42', status: 'نجاح', device: 'iPhone / Safari', location: 'الجيزة، مصر' },
        { id: 3, user: 'مجهول', email: 'admin@arova.com', time: '2025-01-28 08:30', status: 'نجاح', device: 'MacBook / Firefox', location: 'القاهرة، مصر' },
        { id: 4, user: 'خالد حسن', email: 'khaled@example.com', time: '2025-01-27 22:15', status: 'نجاح', device: 'Android / Chrome', location: 'الإسكندرية، مصر' },
        { id: 5, user: 'أحمد محمود', email: 'ahmed@example.com', time: '2025-01-27 20:05', status: 'نجاح', device: 'Windows / Chrome', location: 'القاهرة، مصر' },
    ]

    const stats = [
        { icon: FiUsers, label: 'نشطون الآن', value: '12' },
        { icon: FiActivity, label: 'عمليات الدخول اليوم', value: '148' },
        { icon: FiClock, label: 'متوسط وقت الجلسة', value: '8.4 د' },
    ]

    return (
        <AdminLayout>
            <Head>
                <title>سجلات الدخول والتحليلات | ARVO COMMAND</title>
            </Head>

            <div className="space-y-12">
                {/* Header Section */}
                <div>
                    <span className="text-[10px] font-black text-amber-500 tracking-[0.6em] uppercase mb-4 block">SECURITY & AUDIT</span>
                    <h1 className={`text-4xl md:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} leading-none tracking-tighter uppercase italic`}>
                        سجلات <span className="text-amber-500">الدخول</span>
                    </h1>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} border p-8 rounded-[2.5rem] group hover:border-amber-500/30 transition-all`}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-amber-50'} flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all`}>
                                {React.createElement(stat.icon as any, { className: "w-5 h-5" })}
                            </div>
                            <p className={`text-[10px] font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-[0.2em] mb-2`}>{stat.label}</p>
                            <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} italic`}>{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'} border rounded-[3rem] overflow-hidden`}
                >
                    <div className={`p-10 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-50'}`}>
                        <h2 className="text-2xl font-black uppercase tracking-tight italic">سجلات الدخول الحديثة</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-inherit">
                            <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>USER</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>TIME</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>STATUS</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>DEVICE</th>
                                    <th className={`px-10 py-6 text-xs font-black ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} uppercase tracking-widest leading-none`}>LOCATION</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-50'}`}>
                                {loginHistory.map((log) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`${theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-gray-50'} transition-colors group`}
                                    >
                                        <td className="px-10 py-8">
                                            <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} uppercase italic group-hover:text-amber-500 transition-colors`}>{log.user}</p>
                                            <p className={`text-[10px] ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} font-bold lowercase tracking-wider`}>{log.email}</p>
                                        </td>
                                        <td className={`px-10 py-8 text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'} font-black uppercase tracking-widest`}>
                                            {log.time}
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                                                {React.createElement(FiMonitor as any, { className: "w-4 h-4" })}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{log.device}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                                                {React.createElement(FiMapPin as any, { className: "w-4 h-4 text-amber-500" })}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{log.location}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    )
}
