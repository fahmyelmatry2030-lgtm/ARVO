import React, { useRef } from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiAward, FiTruck, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import SafeImage from '../components/SafeImage'

export default function About() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])

    const values = [
        {
            icon: FiAward,
            title: 'الإتقان الحرفي',
            description: 'قطع تُصمم لتدوم، مختارة من أجود الخامات العالمية لتناسب ذائقتكم الرفيعة.'
        },
        {
            icon: FiShield,
            title: 'خصوصية التجربة',
            description: 'نتعامل مع كل عميل كفرد في عائلتنا الخاصة، نضمن لكم السرية والأمان المطلق.'
        },
        {
            icon: FiHeart,
            title: 'شغف التميز',
            description: 'لا نبيع مجرد ملابس، بل نقدم هوية بصرية تعبر عن نجاحكم وطموحكم.'
        }
    ]

    const milestones = [
        { year: '2020', title: 'البداية', description: 'انطلاق الرؤية في قلب القاهرة لنعيد تعريف الفخامة.' },
        { year: '2022', title: 'الانتشار', description: 'وصول تصاميمنا لنخبة المجتمع.' },
        { year: '2024', title: 'العالمية', description: 'عقد شراكات عالمية لتطوير خاماتنا.' }
    ]

    return (
        <Layout>
            <SEO
                title="قصتنا | الفخامة والجوهر"
                description="تعرف على الإرث والقصة وراء AROVA. نسيج من الجودة، الفن، والشغف بالتميز."
            />

            {/* Cinematic Hero */}
            <div className="relative h-[80vh] overflow-hidden bg-black flex items-center justify-center">
                <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80"
                        alt="Heritage"
                        className="w-full h-full object-cover opacity-60 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
                </motion.div>

                {/* Back Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-[1]">
                    <span className="text-[30vw] font-black text-white uppercase tracking-tighter select-none">
                        LEGACY
                    </span>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-amber-600 text-[10px] font-black tracking-[0.8em] uppercase mb-6 block">OUR ESSENCE</span>
                        <h1 className="text-6xl md:text-[110px] font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
                            الجوهر <br />
                            <span className="text-amber-500 underline decoration-white/10 underline-offset-[20px]">والإرث</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-32">
                    {/* The Narrative */}
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase">THE STORY</div>
                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tighter uppercase">
                                بدأنا حلمًا، <br /> أصبحنا <span className="italic text-amber-600">واقعًا ملموسًا</span>
                            </h2>
                            <p className="text-gray-500 text-lg font-bold leading-loose max-w-xl italic">
                                "لم نكن نبحث عن مجرد قماش، بل كنا نبحث عن الروح التي تسكن بين ثناياه. في عام 2020، قررنا أن نكسر القاعدة ونقدم لمحبي الأناقة قطعاً تحاكي طموحهم وتليق بمقامهم."
                            </p>
                            <p className="text-gray-400 font-medium leading-loose max-w-xl">
                                كل قطعة تخرج من معاملنا هي نتيجة لشهور من البحث في منسوجات ميرينو والحرير الطبيعي. نحن لا نتبع الصيحات، نحن نصنعها لتبقى خالدة في خزانتك لسنوات.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <SafeImage
                                src="https://images.unsplash.com/photo-1550998411-ae930ba52281?w=800&q=80"
                                alt="Craftsmanship"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-amber-600/10 mix-blend-multiply" />
                        </motion.div>
                    </div>

                    {/* Values Grid - Glassmorphism */}
                    <div className="mb-40 relative">
                        {/* Decorative Background Text */}
                        <div className="absolute top-0 right-0 pointer-events-none opacity-[0.02] -z-10 translate-x-1/2 -translate-y-1/2">
                            <span className="text-[25vw] font-black text-gray-900 uppercase tracking-tighter select-none">
                                VALUES
                            </span>
                        </div>

                        <div className="text-center mb-24">
                            <div className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-4">OUR PRINCIPLES</div>
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.8] mb-12">
                                ثوابت <br />
                                <span className="text-amber-600 italic">لا تتغير</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3.5rem] shadow-sm hover:shadow-xl transition-all group"
                                >
                                    <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 transition-colors">
                                        {React.createElement(v.icon as any, { className: "w-6 h-6" })}
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">{v.title}</h3>
                                    <p className="text-gray-500 font-bold leading-relaxed">{v.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline - Editorial Style */}
                    <div className="py-24 border-t border-gray-100 mb-40">
                        <div className="text-center mb-24">
                            <div className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-4">CHRONICLES</div>
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">محطات <br /> <span className="text-amber-600">الفخر</span></h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative pl-12 border-l border-gray-100 group"
                                >
                                    <div className="absolute top-0 -left-[5px] w-[10px] h-[10px] bg-amber-600 rounded-full group-hover:scale-150 transition-transform" />
                                    <div className="text-5xl font-black text-gray-100 group-hover:text-amber-50 transition-colors leading-none mb-4 italic">{m.year}</div>
                                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">{m.title}</h4>
                                    <p className="text-gray-400 font-bold text-sm leading-relaxed">{m.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA - Cinematic Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[4rem] overflow-hidden bg-gray-900 p-20 text-center"
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
                                alt="Next"
                                className="w-full h-full object-cover opacity-20 grayscale"
                            />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-10 leading-tight">
                                كن جزءًا من <br /> <span className="text-amber-500 italic">هذا الإرث</span>
                            </h2>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-6 px-16 py-7 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-amber-600 hover:text-white transition-all shadow-2xl active:scale-95"
                            >
                                اكتشف المجموعة {React.createElement(FiArrowRight as any, { className: "text-xl" })}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    )
}
