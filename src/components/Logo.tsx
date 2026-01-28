import { motion } from 'framer-motion'

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`relative ${className}`}>
                <motion.svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Luxury Monogram 'A' */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M25 85 L50 15 L75 85"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="square"
                        className="text-amber-600"
                    />
                    <motion.path
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        d="M38 65 H62"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-amber-500"
                    />
                </motion.svg>
            </div>
            <span className="text-2xl font-black tracking-tighter italic text-inherit">
                AROVA
            </span>
        </div>
    )
}
