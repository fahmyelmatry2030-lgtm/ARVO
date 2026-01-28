import { motion } from 'framer-motion'
import Link from 'next/link'
import { offers, isOfferValid } from '../data/offers'
import SafeImage from './SafeImage'

export default function SpecialOffers() {
  const activeOffers = offers.filter(isOfferValid).slice(0, 3)

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-6"
            >
              Limited Opportunities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[90px] font-black text-gray-900 tracking-tighter uppercase leading-[0.8]"
            >
              الامتياز <br />
              <span className="text-amber-600 italic">الحصري</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs max-w-xs text-right"
          >
            اكتشف عروضنا المختارة بعناية لتناسب ذائقتك الرفيعة. قطع استثنائية بفرص لا تتكرر.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative group aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-100"
            >
              <div className="absolute inset-0">
                <SafeImage
                  src={offer.image}
                  alt={offer.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              <div className="relative h-full flex flex-col justify-between p-10 text-white">
                <div className="flex justify-between items-start">
                  <span className="bg-amber-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                    {offer.badge}
                  </span>
                  <span className="text-4xl font-black text-white/10 group-hover:text-amber-500/20 transition-colors uppercase italic">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-tight group-hover:text-amber-500 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-300 text-xs font-bold mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 leading-relaxed uppercase tracking-widest">
                    {offer.description}
                  </p>
                  <Link
                    href={`/products?offer=${offer.category}`}
                    className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
                  >
                    Explore Offer
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
