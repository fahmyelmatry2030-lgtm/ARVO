import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { FiUser, FiPackage, FiLogOut, FiSettings, FiMapPin, FiChevronRight, FiMail } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  const menuItems = [
    { icon: FiPackage, label: 'طلبـاتي', href: '/orders', desc: 'تتبع طلباتك السابقة والحالية', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: FiMapPin, label: 'عناوينـي', href: '#', desc: 'إدارة عناوين الشحن الخاصة بك', color: 'text-gray-900', bg: 'bg-gray-100' },
    { icon: FiSettings, label: 'الإعـدادات', href: '#', desc: 'تعديل بيانات الحساب وكلمة المرور', color: 'text-gray-900', bg: 'bg-gray-100' },
  ]

  return (
    <Layout>
      <SEO title="حسابي" description="إدارة حسابك الشخصي وطلباتك في براند الملابس." />

      <div className="bg-gray-50 min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar / User Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-10 text-center sticky top-32 border border-gray-100">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-8 border-white shadow-xl overflow-hidden ring-1 ring-gray-100">
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-1 uppercase">
                  {user.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-8 font-bold">
                  {React.createElement(FiMail as any, { className: "w-4 h-4" })}
                  {user.email}
                </div>

                <div className="p-1 bg-gray-50 rounded-2xl mb-8">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المستوى</p>
                      <p className="text-sm font-black text-amber-600">عضو بريميوم</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                      {React.createElement(FiUser as any, { className: "text-amber-600" })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95 text-xs"
                >
                  {React.createElement(FiLogOut as any, { className: "w-4 h-4" })}
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-2/3"
            >
              <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-4">لوحة التحكم</h1>
                <p className="text-gray-500 font-bold leading-relaxed">مرحباً بك مجدداً في مساحتك الخاصة. هنا يمكنك تتبع مشترياتك وإدارة تفاصيل حسابك بكل سهولة.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all group border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                        {React.createElement(item.icon as any, { className: "w-8 h-8" })}
                      </div>
                      {React.createElement(FiChevronRight as any, { className: "text-gray-200 group-hover:text-amber-600 group-hover:translate-x-[-10px] transition-all" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{item.label}</h3>
                      <p className="text-sm text-gray-500 font-bold">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-white rounded-[3rem] shadow-sm p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

                <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-8 bg-amber-600 rounded-full"></span>
                  المعلومات الشخصية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">الاسم الكامل</label>
                    <div className="p-5 bg-gray-50 rounded-2xl text-gray-900 font-bold border border-transparent hover:border-amber-100 transition-colors">
                      {user.name}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">البريد الإلكتروني</label>
                    <div className="p-5 bg-gray-50 rounded-2xl text-gray-900 font-bold border border-transparent hover:border-amber-100 transition-colors">
                      {user.email}
                    </div>
                  </div>
                </div>

                <button className="mt-10 text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] hover:text-amber-700 transition-colors flex items-center gap-2">
                  تعديل البيانات الشخصية
                  {React.createElement(FiChevronRight as any)}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
