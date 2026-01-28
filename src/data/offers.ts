// بيانات العروض الخاصة الفاخرة 2026
export const offers: any[] = []

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
