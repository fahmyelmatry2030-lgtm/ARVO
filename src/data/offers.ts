// بيانات العروض الخاصة الفاخرة 2026
export const offers = [
    {
        id: 1,
        title: 'باقة السلطان الحصرية',
        description: 'خصم 30% عند اقتناء المجموعة الكاملة من صوف الميرينو مضافاً إليها تغليف هدايا ملكي.',
        discount: 30,
        image: 'https://images.unsplash.com/photo-1594932224491-ef244ca7006d?w=800',
        category: 'men',
        startDate: '2026-01-01',
        endDate: '2026-03-31',
        isActive: true,
        badge: 'عرض ملكي'
    },
    {
        id: 2,
        title: 'أمسية الزمرد النسائية',
        description: 'احصلي على وشاح حريري مجاني عند شراء أي فستان سهرة من تشكيلة الزمرد.',
        discount: 0,
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
        category: 'women',
        startDate: '2026-01-15',
        endDate: '2026-02-28',
        isActive: true,
        badge: 'هدية حصرية'
    },
    {
        id: 3,
        title: 'تخفيضات المواسم الكبرى',
        description: 'خصومات استثنائية تصل إلى 40% على أرقى الأحذية والحقائب الجلدية اليدوية.',
        discount: 40,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
        category: 'sale',
        startDate: '2026-01-20',
        endDate: '2026-12-31',
        isActive: true,
        badge: 'خصم 40%'
    },
    {
        id: 4,
        title: 'مجموعة السحاب الكلاسيكية',
        description: 'اقتنِ حذاء "سحاب" الأبيض واحصل على طقم عناية بالجلد الطبيعي مجاناً.',
        discount: 0,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
        category: 'shoes',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        isActive: true,
        badge: 'قيمة مضافة'
    }
]

export type Offer = typeof offers[0]

export function getDaysRemaining(endDate: string): number {
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function isOfferValid(offer: Offer): boolean {
    const now = new Date()
    const start = new Date(offer.startDate)
    const end = new Date(offer.endDate)
    return now >= start && now <= end && offer.isActive
}
