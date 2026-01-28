import Layout from '../components/Layout'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi'
import SEO from '../components/SEO'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitted(true)
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (error) {
            console.error('Error saving message:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: FiPhone,
            title: 'مركز الاتصال',
            details: ['+966 50 000 0000', '+966 11 000 0000'],
            bg: 'bg-amber-50',
            text: 'text-amber-600'
        },
        {
            icon: FiMail,
            title: 'المراسلات الرسمية',
            details: ['info@brand.com', 'support@brand.com'],
            bg: 'bg-gray-900',
            text: 'text-amber-500'
        },
        {
            icon: FiMapPin,
            title: 'بوتيك الرياض',
            details: ['الرياض، حي العليا، شارع التحلية الرئيسي'],
            bg: 'bg-gray-100',
            text: 'text-gray-900'
        }
    ]

    return (
        <Layout>
            <SEO
                title="اتصل بنا"
                description="نحن هنا للاستماع إليك. تواصل مع فريق خدمة العملاء في براند الملابس لأي استفسار أو طلب خاص."
            />

            {/* Hero Section */}
            <section className="bg-gray-900 py-32 relative overflow-hidden text-white uppercase font-black">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="grid grid-cols-6 h-full border-r border-white/20">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="border-l border-white/20" />)}
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.4em] text-amber-500 mb-8"
                    >
                        GET IN TOUCH
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        تواصل معنا
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        className="h-1.5 bg-amber-600 mx-auto mb-10"
                    />
                </div>
            </section>

            <div className="bg-gray-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-10">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">نحن هنا لراحتك</h2>
                                <p className="text-gray-500 leading-relaxed text-lg font-bold">
                                    فريق خدمة العملاء لدينا جاهز لمساعدتك في أي استفسار حول طلباتك، التوصيل، أو أي تفاصيل تخص منتجاتنا.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl ${info.bg} ${info.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            {React.createElement(info.icon as any, { className: 'w-8 h-8' })}
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{info.title}</h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-lg font-black text-gray-900">{detail}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-2 h-full bg-amber-600" />

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center py-20"
                                        >
                                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500">
                                                {React.createElement(FiMessageSquare as any, { className: "w-12 h-12" })}
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">وصلتنا رسالتك!</h3>
                                            <p className="text-gray-500 mb-12 text-lg">سيقوم فريقنا بالتواصل معك في غضون 24 ساعة عمل.</p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                                            >
                                                إرسال رسالة أخرى
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الاسم الكامل</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                                                        placeholder="أدخل اسمك الكريم"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">البريد الإلكتروني</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الموضوع</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                                                    placeholder="كيف يمكننا مساعدتك؟"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الرسالة</label>
                                                <textarea
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    rows={5}
                                                    className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300 resize-none"
                                                    placeholder="اكتب تفاصيل استفسارك هنا..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-amber-600 hover:-translate-y-1 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-4 text-lg"
                                            >
                                                {isSubmitting ? (
                                                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        إرسال الرسالة الآن
                                                        {React.createElement(FiSend as any, { className: "w-5 h-5" })}
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
