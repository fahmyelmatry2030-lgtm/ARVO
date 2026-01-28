import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { FiUser, FiMail, FiLock, FiAlertCircle, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { loginWithGoogle } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return setError('كلمات المرور غير متطابقة')
        }

        if (password.length < 6) {
            return setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
        }

        try {
            setError('')
            setLoading(true)

            if (!auth) {
                // Mock Registration
                await new Promise(resolve => setTimeout(resolve, 1500))
                const mockUser = {
                    id: 'mock-user-' + Date.now(),
                    email: email,
                    name: name,
                    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name
                }
                localStorage.setItem('mockUser', JSON.stringify(mockUser))
                window.location.href = '/'
                return
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, {
                displayName: name
            })
            router.push('/')
        } catch (err: any) {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                setError('البريد الإلكتروني مستخدم بالفعل')
            } else {
                setError('حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <SEO title="إنشاء حساب جديد" description="انضم إلى عائلة AROVA اليوم واستمتع بتجربة تسوق فريدة وخصومات خاصة للأعضاء." />

            <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-500/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-900/5 blur-[120px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-gray-100 relative">
                        <div className="absolute top-0 right-10 w-1 h-20 bg-amber-600" />

                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] font-black tracking-[0.4em] text-amber-600 mb-4 uppercase"
                            >
                                START YOUR JOURNEY
                            </motion.div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                                إنشاء حساب
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 text-red-600 p-5 rounded-3xl text-sm font-bold flex items-center gap-3 border border-red-100"
                                >
                                    {React.createElement(FiAlertCircle as any, { className: "flex-shrink-0" })}
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">الاسم الكامل</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                                            {React.createElement(FiUser as any)}
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full pr-14 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 font-bold placeholder:text-gray-300 transition-all"
                                            placeholder="أدخل اسمك الكريم"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">البريد الإلكتروني</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                                            {React.createElement(FiMail as any)}
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pr-14 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 font-bold placeholder:text-gray-300 transition-all"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">كلمة المرور</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                                                {React.createElement(FiLock as any)}
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full pr-14 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 font-bold placeholder:text-gray-300 transition-all text-sm"
                                                placeholder="••••••"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">التأكيد</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                                                {React.createElement(FiLock as any)}
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="block w-full pr-14 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 font-bold placeholder:text-gray-300 transition-all text-sm"
                                                placeholder="••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-amber-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 text-sm"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        إنشاء الحساب
                                        {React.createElement(FiArrowRight as any)}
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-[10px] font-black text-gray-300 uppercase tracking-widest">أو عبر المنصات</span>
                                </div>
                            </div>

                            <button
                                onClick={loginWithGoogle}
                                className="w-full flex items-center justify-center gap-4 py-5 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all font-bold text-gray-600 active:scale-95"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                <span className="text-sm">Google</span>
                            </button>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-gray-400 font-bold text-sm">
                                لديك حساب بالفعل؟{' '}
                                <Link href="/login" className="text-amber-600 hover:text-amber-700 underline underline-offset-8 decoration-amber-600/30">
                                    سجل دخولك هنا
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}
