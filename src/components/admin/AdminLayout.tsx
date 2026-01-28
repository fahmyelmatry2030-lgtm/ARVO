import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
    FiHome,
    FiPackage,
    FiShoppingBag,
    FiTag,
    FiBarChart2,
    FiLogOut,
    FiMenu,
    FiX,
    FiSun,
    FiMoon
} from 'react-icons/fi'
import { useAdmin } from '../../hooks/useAdmin'
import { useState } from 'react'

interface AdminLayoutProps {
    children: ReactNode
}

const menuItems = [
    { icon: FiHome, label: 'لوحة التحكم', href: '/admin/dashboard' },
    { icon: FiPackage, label: 'المنتجات', href: '/admin/products' },
    { icon: FiShoppingBag, label: 'الطلبات', href: '/admin/orders' },
    { icon: FiTag, label: 'العروض', href: '/admin/offers' },
    { icon: FiBarChart2, label: 'الإحصائيات', href: '/admin/analytics' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { admin, logoutAdmin } = useAdmin()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

    if (!admin) {
        return null
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#fcfcfa] text-gray-900'} overflow-x-hidden font-sans transition-colors duration-500`} dir="rtl">
            {/* Architectural Background Text */}
            <div className={`fixed inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.05]'} flex items-center justify-center overflow-hidden z-0 transition-opacity`}>
                <span className={`text-[40vw] font-black tracking-tighter uppercase select-none leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    CONTROL
                </span>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-72 ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white/80 border-gray-100'} backdrop-blur-2xl border-l z-50 transform transition-transform duration-500 ease-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Logo Section */}
                <div className={`h-24 flex items-center justify-between px-8 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter uppercase text-amber-500 italic leading-none">
                            AROVA <br />
                            <span className={`text-[8px] ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} tracking-[0.5em] not-italic`}>COMMAND</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/60 hover:text-white"
                    >
                        {React.createElement(FiX as any, { className: "w-6 h-6" })}
                    </button>
                </div>

                {/* Admin Profile Mini */}
                <div className="px-8 py-8">
                    <div className="flex items-center gap-4 group">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform" />
                            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} border ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'} rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-black`}>
                                {admin.name.charAt(0)}
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-black text-sm uppercase tracking-tight truncate">{admin.name}</p>
                            <p className="text-[10px] text-amber-600/60 font-bold uppercase tracking-widest truncate">{admin.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = router.pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? (theme === 'dark' ? 'bg-white/5 text-white shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)] border border-white/10' : 'bg-amber-500/5 text-amber-600 border border-amber-500/20 shadow-sm')
                                    : (theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50')
                                    }`}
                            >
                                <div className={`${isActive ? 'text-amber-500' : 'group-hover:text-amber-500'} transition-colors`}>
                                    {React.createElement(item.icon as any, { className: "w-5 h-5" })}
                                </div>
                                <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="mr-auto w-1 h-1 bg-amber-500 rounded-full"
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-8 left-0 right-0 px-4">
                    <button
                        onClick={logoutAdmin}
                        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl ${theme === 'dark' ? 'bg-red-500/5 hover:bg-red-500/10' : 'bg-red-50 text-red-600 hover:bg-red-100'} text-red-500 border border-red-500/10 transition-all font-black text-sm uppercase tracking-widest`}
                    >
                        {React.createElement(FiLogOut as any, { className: "w-4 h-4" })}
                        <span>خروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:mr-72 min-h-screen relative z-10 transition-all duration-500">
                {/* Top Header */}
                <header className={`h-24 px-8 flex items-center justify-between sticky top-0 z-30 ${theme === 'dark' ? 'bg-black/50 border-white/5' : 'bg-white/80 border-gray-100'} backdrop-blur-xl border-b`}>
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className={`p-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} rounded-xl transition-colors`}
                        >
                            {React.createElement(FiMenu as any, { className: "w-6 h-6" })}
                        </button>
                    </div>

                    <div className="mr-auto flex items-center gap-6">
                        <button
                            onClick={toggleTheme}
                            className={`p-3 ${theme === 'dark' ? 'bg-white/5 text-amber-500 hover:bg-white/10' : 'bg-gray-100 text-amber-600 hover:bg-gray-200'} rounded-xl transition-all`}
                            title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع المظلم'}
                        >
                            {React.createElement(theme === 'dark' ? FiSun : FiMoon as any, { className: "w-5 h-5" })}
                        </button>

                        <Link
                            href="/"
                            target="_blank"
                            className={`text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] hover:text-amber-600 transition-colors flex items-center gap-2`}
                        >
                            Live Store <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>→</span>
                        </Link>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="p-8 lg:p-12 max-w-[1600px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
