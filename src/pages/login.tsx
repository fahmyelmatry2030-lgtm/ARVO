import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { FiMail, FiLock, FiAlertCircle, FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { loginWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)

      if (!auth) {
        // Mock Login
        await new Promise(resolve => setTimeout(resolve, 1500))
        const mockUser = {
          id: 'mock-user-1',
          email: email,
          name: 'عميل براند',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        }
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        window.location.href = '/'
        return
      }

      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err: any) {
      console.error(err)
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <SEO title="تسجيل الدخول" description="سجل دخولك إلى حسابك في براند الملابس للوصول إلى طلباتك وقائمة أمنياتك." />

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
                WELCOME BACK
              </motion.div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                تسجيل الدخول
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center mr-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">كلمة المرور</label>
                    <a href="#" className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:text-amber-700">نسيت كلمة المرور؟</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                      {React.createElement(FiLock as any)}
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pr-14 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 font-bold placeholder:text-gray-300 transition-all"
                      placeholder="••••••••"
                    />
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
                    دخول
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
                ليس لديك حساب؟{' '}
                <Link href="/register" className="text-amber-600 hover:text-amber-700 underline underline-offset-8 decoration-amber-600/30">
                  أنشئ حساباً جديداً
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
