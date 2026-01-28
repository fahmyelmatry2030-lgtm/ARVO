import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface AdminUser {
    id: string
    email: string
    name: string
    role: 'admin'
}

export function useAdmin() {
    const [admin, setAdmin] = useState<AdminUser | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if admin is logged in
        const adminData = localStorage.getItem('adminUser')
        if (adminData) {
            try {
                setAdmin(JSON.parse(adminData))
            } catch (error) {
                console.error('Error parsing admin data:', error)
                localStorage.removeItem('adminUser')
            }
        }
        setLoading(false)
    }, [])

    const loginAdmin = async (email: string, password: string) => {
        // Mock admin login - في المستقبل سيتم ربطه بـ Firebase
        // البيانات الافتراضية للمدير
        const ADMIN_EMAIL = 'admin@brand.com'
        const ADMIN_PASSWORD = 'admin123'

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser: AdminUser = {
                id: 'admin-1',
                email: ADMIN_EMAIL,
                name: 'المدير',
                role: 'admin'
            }

            localStorage.setItem('adminUser', JSON.stringify(adminUser))
            setAdmin(adminUser)
            return { success: true }
        } else {
            return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
        }
    }

    const logoutAdmin = () => {
        localStorage.removeItem('adminUser')
        setAdmin(null)
        router.push('/admin/login')
    }

    const requireAdmin = () => {
        if (!loading && !admin) {
            router.push('/admin/login')
        }
    }

    return {
        admin,
        loading,
        isAdmin: !!admin,
        loginAdmin,
        logoutAdmin,
        requireAdmin
    }
}
