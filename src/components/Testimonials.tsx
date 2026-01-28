import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'عميل دائم',
    content: 'تجربة تسوق رائعة، المنتجات ذات جودة عالية والتوصيل سريع جداً. أنصح الجميع بالتسوق من هنا!',
    rating: 5
  },
  {
    id: 2,
    name: 'سارة أحمد',
    role: 'مشترية لأول مرة',
    content: 'أول مرة أطلب من الموقع وكانت تجربة ممتازة. خدمة العملاء كانت سريعة الاستجابة ومفيدة جداً.',
    rating: 4
  },
  {
    id: 3,
    name: 'خالد عبدالله',
    role: 'عميل متميز',
    content: 'أفضل موقع تسوق للملابس على الإطلاق. التنوع رائع والأسعار منافسة جداً.',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">آراء عملائنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">اكتشف ما يقوله عملاؤنا عن تجربتهم معنا</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold mr-3">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
