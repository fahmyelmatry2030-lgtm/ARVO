import Link from 'next/link'
import { motion } from 'framer-motion'
import products from '../data/products'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
	const featured = products.slice(0, 4);

	return (
		<section className="py-24 md:py-40 bg-gray-50 relative overflow-hidden">
			{/* Background Decorative Text */}
			<div className="absolute top-1/2 left-0 w-full text-center -translate-y-1/2 pointer-events-none z-0">
				<span className="text-[25vw] font-black text-gray-100/50 uppercase tracking-tighter select-none">
					ESSENTIALS
				</span>
			</div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
					<div className="max-w-xl">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="text-amber-600 text-[10px] font-black tracking-[0.6em] uppercase mb-4"
						>
							SELECTED PIECES
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							viewport={{ once: true }}
							className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase"
						>
							منتجات <br />
							<span className="text-amber-600">مميزة</span>
						</motion.h2>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						viewport={{ once: true }}
					>
						<Link
							href="/products"
							className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 hover:text-amber-600 transition-colors flex items-center gap-4"
						>
							جميع المنتجات
							<div className="w-12 h-px bg-current"></div>
						</Link>
					</motion.div>
				</div>

				{/* Architectural Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
					{featured.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.8 }}
							viewport={{ once: true }}
							style={{ marginTop: (index % 2 !== 0) ? '4rem' : '0' }}
							className="relative"
						>
							<div className="absolute -top-10 -right-4 text-[120px] font-black text-gray-50 select-none z-0 pointer-events-none">
								0{index + 1}
							</div>
							<ProductCard product={product} />
						</motion.div>
					))}
				</div>

				{/* Decorative bottom banner */}
				<div className="mt-32 pt-20 border-t border-gray-100 flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-20">
					<span className="text-2xl font-black tracking-tighter uppercase italic">VOGUE</span>
					<span className="text-2xl font-black tracking-tighter uppercase">ELLE</span>
					<span className="text-2xl font-black tracking-tighter uppercase italic underline">BAZAAR</span>
					<span className="text-2xl font-black tracking-tighter uppercase">GQ</span>
				</div>
			</div>
		</section>
	)
}
