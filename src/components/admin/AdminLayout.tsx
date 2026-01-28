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
    FiX
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

    if (!admin) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        لوحة التحكم
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        {React.createElement(FiX as any, { className: "w-6 h-6" })}
                    </button>
                </div>

                {/* Admin Info */}
                <div className="px-6 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                            {admin.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{admin.name}</p>
                            <p className="text-xs text-gray-400">{admin.email}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="px-3 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = router.pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                {React.createElement(item.icon as any, { className: "w-5 h-5" })}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button
                        onClick={logoutAdmin}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                        {React.createElement(FiLogOut as any, { className: "w-5 h-5" })}
                        <span className="font-medium">تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:mr-64">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        {React.createElement(FiMenu as any, { className: "w-6 h-6" })}
                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            عرض الموقع ←
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
