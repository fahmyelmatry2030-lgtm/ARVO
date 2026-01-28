import { motion } from 'framer-motion'

const features = [
  {
    title: 'شحن سريع',
    description: 'شحن سريع لجميع أنحاء المملكة خلال 2-5 أيام عمل',
    icon: '🚚'
  },
  {
    title: 'دفع آمن',
    description: 'مدفوعات آمنة عبر البطاقات الائتمانية والدفع عند الاستلام',
    icon: '💳'
  },
  {
    title: 'جودة عالية',
    description: 'منتجات عالية الجودة مختارة بعناية لضمان راحتك ورضاك',
    icon: '✨'
  },
  {
    title: 'دعم فني',
    description: 'فريق دعم فني متاح على مدار الساعة لمساعدتك في أي استفسار',
    icon: '💬'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">لماذا تختارنا؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نقدم لك تجربة تسوق فريدة بمعايير عالمية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
