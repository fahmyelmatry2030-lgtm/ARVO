// بيانات العروض الخاصة الفاخرة 2026
export const offers: any[] = [
    {
        id: 1,
        title: 'عرض الشتاء الحصري',
        description: 'خصم 25% على جميع المعاطف والجاكيتات الصوفية لفترة محدودة.',
        discount: 25,
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        isActive: true
    },
    {
        id: 2,
        title: 'باقة العرسان',
        description: 'اشترِ قطعتين واحصل على الثالثة مجاناً من قسم الملابس الرسمية.',
        discount: 33,
        startDate: '2025-01-15',
        endDate: '2025-03-15',
        isActive: true
    }
]

export type Offer = any

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
