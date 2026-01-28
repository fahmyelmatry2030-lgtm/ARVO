import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../types'

interface WishlistContextType {
    wishlist: Product[]
    addToWishlist: (product: Product) => void
    removeFromWishlist: (productId: number) => void
    isInWishlist: (productId: number) => boolean
    toggleWishlist: (product: Product) => void
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    isInWishlist: () => false,
    toggleWishlist: () => { }
})

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>(() => {
        if (typeof window === 'undefined') return []
        try {
            const stored = localStorage.getItem('wishlist')
            return stored ? JSON.parse(stored) : []
        } catch (e) {
            return []
        }
    })

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.some(p => p.id === product.id)) return prev
            return [...prev, product]
        })
    }

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => prev.filter(p => p.id !== productId))
    }

    const isInWishlist = (productId: number) => {
        return wishlist.some(p => p.id === productId)
    }

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
        }
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext)
