import { useState, useEffect } from 'react'
import { Product } from '../types'
import staticProducts from '../data/products'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load from localStorage
        const stored = localStorage.getItem('custom_products')
        const customProducts: Product[] = stored ? JSON.parse(stored) : []

        // Merge static and custom products
        // We put custom products first so they appear at the top
        setProducts([...customProducts, ...staticProducts])
        setLoading(false)
    }, [])

    const addProduct = (productData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...productData,
            id: Date.now(), // Simple ID generation
        }

        // Update state
        setProducts(prev => [newProduct, ...prev])

        // Update localStorage
        const stored = localStorage.getItem('custom_products')
        const customProducts: Product[] = stored ? JSON.parse(stored) : []
        const updatedCustomProducts = [newProduct, ...customProducts]
        localStorage.setItem('custom_products', JSON.stringify(updatedCustomProducts))

        return newProduct
    }

    const deleteProduct = (id: number) => {
        // We can only delete custom products in this simple implementation
        // For static products, we might need a "hidden" list in localStorage if we wanted to support hiding them

        const isStatic = staticProducts.some(p => p.id === id)
        if (isStatic) {
            alert('لا يمكن حذف المنتجات الأساسية في هذا الإصدار التجريبي')
            return
        }

        setProducts(prev => prev.filter(p => p.id !== id))

        const stored = localStorage.getItem('custom_products')
        if (stored) {
            const customProducts: Product[] = JSON.parse(stored)
            const updated = customProducts.filter(p => p.id !== id)
            localStorage.setItem('custom_products', JSON.stringify(updated))
        }
    }

    return {
        products,
        loading,
        addProduct,
        deleteProduct
    }
}
