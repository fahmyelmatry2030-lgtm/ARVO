import { motion } from 'framer-motion'

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`relative ${className}`}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d="M20 30 L50 10 L80 30 V80 C80 85.5228 75.5228 90 70 90 H30 C24.4772 90 20 85.5228 20 80 V30 Z"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-600"
                    />
                    <motion.path
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        d="M40 45 L50 55 L60 45"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-secondary-500"
                    />
                </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 hidden sm:block">
                براند
            </span>
        </div>
    )
}
