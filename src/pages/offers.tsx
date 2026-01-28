import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { offers, getDaysRemaining, isOfferValid } from '../data/offers'
import SafeImage from '../components/SafeImage'
import { FiClock, FiTag, FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export default function Offers() {
    const activeOffers = offers.filter(isOfferValid)

    return (
        <Layout>
            <SEO
                title="العروض الحصرية | امتيازات النخبة"
                description="اكتشف الفرص الاستثنائية لامتلاك أرقى القطع بأسعار تفضيلية لفترة محدودة."
            />

            {/* Cinematic Hero */}
            <div className="relative h-[60vh] overflow-hidden bg-black flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
                        alt="Offers"
                        className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent" />
                </div>

                {/* Back Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-[1]">
                    <span className="text-[35vw] font-black text-white uppercase tracking-tighter select-none">
                        SELECT
                    </span>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-amber-600 text-[10px] font-black tracking-[0.8em] uppercase mb-6 block">PRIVATE SELECTION</span>
                        <h1 className="text-6xl md:text-[110px] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                            عروض <br />
                            <span className="text-amber-500">حصرية</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="bg-gray-50 pb-32">
                <div className="max-w-[1600px] mx-auto px-6">
                    {/* Active Count Floating Bar */}
                    <div className="flex justify-center -translate-y-1/2 relative z-20">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white/80 backdrop-blur-3xl border border-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-6"
                        >
                            <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-black text-sm">
                                {activeOffers.length}
                            </div>
                            <span className="text-xs font-black text-gray-900 uppercase tracking-widest">عرض نشط حالياً</span>
                        </motion.div>
                    </div>

                    {/* Architectural Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                        {offers.map((offer, index) => {
                            const daysRemaining = getDaysRemaining(offer.endDate)
                            const isValid = isOfferValid(offer)

                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className={`group relative flex flex-col ${!isValid ? 'opacity-40 grayscale' : ''}`}
                                >
                                    {/* Numbering */}
                                    <div className="absolute -top-10 -right-4 text-[120px] font-black text-gray-100 group-hover:text-amber-50 select-none z-0 pointer-events-none transition-colors">
                                        0{index + 1}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden bg-gray-200 shadow-2xl z-10">
                                        <SafeImage
                                            src={offer.image}
                                            alt={offer.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />

                                        {/* Overlay & Badges */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="absolute top-8 right-8 flex flex-col items-end gap-3 z-20">
                                            <span className="bg-white text-black text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-widest shadow-xl">
                                                {offer.badge}
                                            </span>
                                            {isValid && (
                                                <div className="bg-amber-600 text-white text-[10px] font-black px-6 py-3 rounded-full flex items-center gap-2 shadow-xl animate-pulse">
                                                    {React.createElement(FiClock as any, { className: "text-xs" })}
                                                    {daysRemaining > 0 ? `متبقي ${daysRemaining} يوم` : 'ينتهي اليوم'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Action (Visible on hover) */}
                                        <div className="absolute inset-x-0 bottom-0 p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20">
                                            <Link
                                                href={`/products?offer=${offer.category}`}
                                                className="w-full bg-white text-black py-6 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-amber-600 hover:text-white transition-all shadow-2xl"
                                            >
                                                استفد من العرض {React.createElement(FiArrowLeft as any, { className: "text-xl" })}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="mt-12 space-y-4 px-2 relative z-10">
                                        <div className="flex items-center gap-4 text-amber-600 text-[10px] font-black tracking-[0.4em] uppercase">
                                            {React.createElement(FiTag as any)} {offer.category || 'EXECUTIVE'}
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-tight group-hover:text-amber-600 transition-colors">
                                            {offer.title}
                                        </h3>
                                        <p className="text-gray-500 font-bold leading-relaxed line-clamp-2">
                                            {offer.description}
                                        </p>

                                        <div className="pt-6 flex items-baseline gap-4">
                                            <span className="text-4xl font-black text-gray-900 tracking-tighter">-{offer.discount}%</span>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">VIP REDUCTION</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Empty State */}
                    {activeOffers.length === 0 && (
                        <div className="py-40 text-center">
                            <h2 className="text-4xl font-black text-gray-300 uppercase tracking-widest">نعمل على تجهيز امتيازات جديدة</h2>
                        </div>
                    )}

                    {/* Elite Membership Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-40 relative rounded-[4rem] overflow-hidden bg-gray-900 p-20 text-center"
                    >
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                            <div className="inline-block px-8 py-2 border border-amber-600/30 rounded-full text-amber-500 text-[10px] font-black tracking-[0.6em] uppercase">
                                MEMBERS ONLY
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                                لا تفوت <br /> <span className="text-amber-600 italic">فرص النخبة</span>
                            </h2>
                            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">سجل بريدك لتصلك دعوات العروض الخاصة قبل إطلاقها للعامة</p>
                            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-xs font-black text-white focus:outline-none focus:border-amber-600 transition-colors"
                                />
                                <button className="bg-white text-black px-10 py-6 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-amber-600 hover:text-white transition-all">
                                    JOIN US
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    )
}
