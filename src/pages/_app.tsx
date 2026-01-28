import type { AppProps } from 'next/app'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import { ToastProvider } from '../context/ToastContext'
import { WishlistProvider } from '../context/WishlistContext'
import { cairo, inter } from '../styles/fonts'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <ToastProvider>
            <div className={`${cairo.variable} ${inter.variable} font-sans`}>
              <Component {...pageProps} />
            </div>
          </ToastProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default MyApp
