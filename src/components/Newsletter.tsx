import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة منطق الاشتراك
    console.log('Subscribed with:', email)
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-primary-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">اشترك في نشرتنا البريدية</h2>
          <p className="text-gray-700 mb-8">
            اشترك الآن واحصل على خصم 15% على أول طلب لك، وتابع آخر العروض والأحدث لدينا
          </p>
          
          {isSubscribed ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg">
              شكراً لك! تم الاشتراك بنجاح.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                اشتراك
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
