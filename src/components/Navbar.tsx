import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart } from 'react-icons/fi'
import Logo from './Logo'
import SearchOverlay from './SearchOverlay'
import { useRouter } from 'next/router'

interface Props {
  onOpenCart?: () => void
}

const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المنتجات', href: '/products' },
  { name: 'التصنيفات', href: '/categories' },
  { name: 'عروض خاصة', href: '/offers' },
  { name: 'من نحن', href: '/about' }
]

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart()
  const { wishlist } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-900 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? React.createElement(FiX as any, { className: "w-5 h-5" }) : React.createElement(FiMenu as any, { className: "w-5 h-5" })}
            </button>

            {/* Logo */}
            <Link href="/" className="transition-transform active:scale-95">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-black uppercase tracking-widest transition-all hover:text-amber-600 relative group ${router.pathname === link.href ? 'text-amber-600' : 'text-gray-900'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 right-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full ${router.pathname === link.href ? 'w-full' : ''}`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex w-11 h-11 items-center justify-center text-gray-900 hover:text-amber-600 transition-colors"
                title="بحث"
              >
                {React.createElement(FiSearch as any, { className: "w-5 h-5" })}
              </button>

              <Link
                href="/login"
                className="w-11 h-11 flex items-center justify-center text-gray-900 hover:text-amber-600 transition-colors"
                title="حسابي"
              >
                {React.createElement(FiUser as any, { className: "w-5 h-5" })}
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:flex w-11 h-11 items-center justify-center text-gray-900 hover:text-amber-600 transition-colors relative"
                title="المفضلة"
              >
                {React.createElement(FiHeart as any, { className: "w-5 h-5" })}
                {wishlist.length > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-black text-white items-center justify-center">
                      {wishlist.length}
                    </span>
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="group w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-600 transition-all shadow-lg shadow-gray-900/10 active:scale-95"
                aria-label="سلة التسوق"
              >
                {React.createElement(FiShoppingCart as any, { className: "w-4 h-4" })}
                {cartCount > 0 && (
                  <span className="text-xs font-black bg-white text-gray-900 w-5 h-5 rounded-lg flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Area */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full max-w-[280px] bg-white z-[60] shadow-2xl p-6"
              >
                <div className="flex justify-between items-center mb-10">
                  <Logo />
                  <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full">
                    {React.createElement(FiX as any)}
                  </button>
                </div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between py-4 border-b border-gray-50 text-gray-900 font-bold hover:text-amber-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-10 pt-10 border-t border-gray-100 space-y-4">
                  <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium">
                    {React.createElement(FiHeart as any)} المفضلة ({wishlist.length})
                  </Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium">
                    {React.createElement(FiUser as any)} تسجيل الدخول
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
