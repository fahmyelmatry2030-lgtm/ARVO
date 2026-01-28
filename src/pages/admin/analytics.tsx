import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiUsers, FiClock, FiGlobe, FiMonitor, FiActivity } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminAnalytics() {
    const { admin, requireAdmin, loading } = useAdmin()

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

    // Mock data for user login history
    const loginHistory = [
        { id: 1, user: 'أحمد محمود', email: 'ahmed@example.com', time: '2025-01-28 10:15', status: 'نجاح', device: 'Windows / Chrome', location: 'القاهرة، مصر' },
        { id: 2, user: 'سارة علي', email: 'sara@example.com', time: '2025-01-28 09:42', status: 'نجاح', device: 'iPhone / Safari', location: 'الجيزة، مصر' },
        { id: 3, user: 'مجهول', email: 'admin@arova.com', time: '2025-01-28 08:30', status: 'نجاح', device: 'MacBook / Firefox', location: 'القاهرة، مصر' },
        { id: 4, user: 'خالد حسن', email: 'khaled@example.com', time: '2025-01-27 22:15', status: 'نجاح', device: 'Android / Chrome', location: 'الإسكندرية، مصر' },
        { id: 5, user: 'أحمد محمود', email: 'ahmed@example.com', time: '2025-01-27 20:05', status: 'نجاح', device: 'Windows / Chrome', location: 'القاهرة، مصر' },
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
                    <h1 className="text-4xl md:text-6xl font-black text-inherit leading-none tracking-tighter uppercase italic">
                        سجلات <span className="text-amber-500">الدخول</span>
                    </h1>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                                {React.createElement(FiUsers as any, { className: "w-5 h-5" })}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-inherit/40">نشطون الآن</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter">12 <span className="text-sm font-bold text-green-500">+2</span></h3>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                                {React.createElement(FiActivity as any, { className: "w-5 h-5" })}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-inherit/40">عمليات الدخول اليوم</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter">148</h3>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                                {React.createElement(FiClock as any, { className: "w-5 h-5" })}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-inherit/40">متوسط وقت الجلسة</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter">8.4 <span className="text-sm font-bold opacity-60">دقائق</span></h3>
                    </div>
                </div>

                {/* Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden"
                >
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-black uppercase tracking-tight italic">تفاصيل الدخول الأخيرة</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">المستخدم</th>
                                    <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الوقت</th>
                                    <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الجهاز</th>
                                    <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الموقع</th>
                                    <th className="px-8 py-5 text-xs font-black opacity-40 uppercase">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loginHistory.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black group-hover:text-amber-500 transition-colors uppercase">{log.user}</span>
                                                <span className="text-[10px] opacity-40 font-bold">{log.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase flex items-center gap-2">
                                                {React.createElement(FiClock as any, { className: "w-3 h-3 text-amber-500" })}
                                                {log.time}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] opacity-60 font-black flex items-center gap-2">
                                                {React.createElement(FiMonitor as any, { className: "w-3 h-3" })}
                                                {log.device}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] opacity-60 font-black flex items-center gap-2">
                                                {React.createElement(FiGlobe as any, { className: "w-3 h-3" })}
                                                {log.location}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-green-500/10 text-green-500">
                                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                                {log.status}
                                            </span>
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
