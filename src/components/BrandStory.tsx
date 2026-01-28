import { motion } from 'framer-motion'
import SafeImage from './SafeImage'

export default function BrandStory() {
    return (
        <section id="story" className="py-24 md:py-40 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">

                    {/* Visual Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                                alt="Brand Philosophy"
                                className="w-full h-[600px] object-cover hover:scale-110 transition-transform duration-1000"
                            />
                        </motion.div>

                        {/* Decorative floating card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute bottom-[-40px] right-[-20px] md:right-[-60px] z-20 bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl max-w-xs"
                        >
                            <div className="text-amber-600 text-3xl font-black mb-4 tracking-tighter italic">"</div>
                            <p className="text-sm font-bold leading-relaxed mb-6 uppercase tracking-wider">
                                نحن لا نصنع ملابس فقط، نحن ننسج هوية تعبر عن شخصيتك وتفردك في كل تفصيلة.
                            </p>
                            <div className="h-px w-20 bg-amber-600"></div>
                        </motion.div>

                        {/* Background Decorative Text */}
                        <div className="absolute top-[20%] left-[-10%] text-[20vh] font-black text-gray-50 pointer-events-none -z-10 uppercase tracking-tighter">
                            CORE
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-6"
                        >
                            إرث من الإبداع
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-[100px] font-black text-gray-900 tracking-tighter leading-[0.8] uppercase"
                        >
                            نسجنا القصة <br />
                            <span className="text-amber-600 italic">بكل إتقان</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8 text-gray-500 font-bold leading-loose uppercase tracking-widest text-sm"
                        >
                            <p>
                                بدأت رحلتنا من الشغف بالمنسوجات الطبيعية والحرفية اليدوية التي تكاد تندثر. نحن لا نصنع ملابس فحسب، بل نصيغ قطعاً فنية تعبر عن هويتك وتدوم لأجيال.
                            </p>
                            <p className="text-gray-900 border-l-4 border-amber-600 pl-6 italic">
                                "نحن نؤمن أن الفخامة الحقيقية تكمن في الأشياء التي لا تُرى، في دقة التفاصيل وجودة الجوهر."
                            </p>
                        </motion.div>

                        <div className="mt-16 grid grid-cols-2 gap-12 border-t border-gray-100 pt-16">
                            <div>
                                <span className="block text-4xl font-black text-gray-900 mb-2">100%</span>
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Premium Silk</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-gray-900 mb-2">24h</span>
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Hand Crafted</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
