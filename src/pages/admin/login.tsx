import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiAlertCircle, FiShield } from 'react-icons/fi'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { admin, loginAdmin } = useAdmin()

    useEffect(() => {
        // إذا كان المدير مسجل دخول، انتقل للوحة التحكم
        if (admin) {
            router.push('/admin/dashboard')
        }
    }, [admin, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await loginAdmin(email, password)

            if (result.success) {
                router.push('/admin/dashboard')
            } else {
                setError(result.error || 'حدث خطأ أثناء تسجيل الدخول')
            }
        } catch (err) {
            setError('حدث خطأ غير متوقع')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>تسجيل دخول الإدارة | AROVA</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full space-y-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 mb-6"
                        >
                            {React.createElement(FiShield as any, { className: "w-10 h-10 text-white" })}
                        </motion.div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">
                            لوحة التحكم الإدارية
                        </h2>
                        <p className="text-gray-400">
                            قم بتسجيل الدخول للوصول إلى لوحة التحكم
                        </p>
                    </div>

                    {/* Login Form */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3"
                                >
                                    {React.createElement(FiAlertCircle as any, { className: "text-red-500 w-5 h-5 flex-shrink-0" })}
                                    <p className="text-sm text-red-400">{error}</p>
                                </motion.div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    البريد الإلكتروني
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {React.createElement(FiMail as any, { className: "text-gray-500" })}
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pr-10 pl-3 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="admin@brand.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {React.createElement(FiLock as any, { className: "text-gray-500" })}
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pr-10 pl-3 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        جاري تسجيل الدخول...
                                    </span>
                                ) : (
                                    'تسجيل الدخول'
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <p className="text-xs text-gray-400 text-center mb-2">
                                بيانات الدخول التجريبية:
                            </p>
                            <div className="bg-gray-900/50 rounded-lg p-3 space-y-1">
                                <p className="text-xs text-gray-300">
                                    <span className="text-gray-500">البريد:</span> admin@brand.com
                                </p>
                                <p className="text-xs text-gray-300">
                                    <span className="text-gray-500">كلمة المرور:</span> admin123
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back to Home */}
                    <div className="text-center">
                        <a
                            href="/"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ← العودة للموقع الرئيسي
                        </a>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
