import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const titleWords = "THE NEW STANDARD".split(" ")
  const subtitleWords = "COLLECTION 2025".split(" ")

  const textVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 }
  }

  const textTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background with Ken Burns Effect */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="Luxury Fashion"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </motion.div>

      {/* Background Architectural Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] z-[1]">
        <span className="text-[35vw] font-black text-white uppercase tracking-tighter select-none">
          ESSENCE
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1800px] px-6 md:px-20 text-center">
        <motion.div style={{ opacity }}>
          {/* Multi-layered text reveal */}
          <div className="overflow-hidden mb-4">
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ ...textTransition, delay: 0.5 }}
              variants={textVariants}
              className="text-amber-600 text-[10px] md:text-sm font-black tracking-[0.4em] md:tracking-[0.8em] uppercase"
            >
              التشكيلة الحصرية 2025
            </motion.div>
          </div>

          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h1
              initial="initial"
              animate="animate"
              transition={{ ...textTransition, delay: 0.7 }}
              variants={textVariants}
              className="text-6xl md:text-[110px] font-black text-white leading-[0.8] tracking-tighter uppercase italic"
            >
              فخامة <br />
              <span className="text-amber-500">لا تضاهى</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-12">
            <motion.p
              initial="initial"
              animate="animate"
              transition={{ ...textTransition, delay: 0.9 }}
              variants={textVariants}
              className="text-gray-400 text-sm md:text-lg max-w-xl font-bold leading-relaxed uppercase tracking-widest"
            >
              نجمع بين الحرفية العتيقة والتصاميم العصرية لنقدم لك قطعاً خالدة تتجاوز حدود الزمن.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <Link
              href="/products"
              className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">استعرض الكولكشن</span>
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                className="absolute inset-0 bg-amber-600 z-0"
              />
            </Link>

            <Link
              href="/about"
              className="text-white text-xs font-black uppercase tracking-[0.4em] border-b border-white/20 pb-2 hover:border-amber-600 transition-colors"
            >
              قصتنا
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute left-[-5vh] bottom-[10vh] origin-left rotate-90 text-[15vh] font-black tracking-tighter text-white pointer-events-none select-none uppercase"
      >
        AUTHENTIC
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-black text-gray-500 tracking-[0.5em] uppercase rotate-0">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-amber-600 to-transparent" />
      </motion.div>
    </div>
  )
}
