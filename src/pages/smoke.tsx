import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

const demoProduct = { id: 999, name: 'منتج عرض تجريبي', price: 150, image: 'https://via.placeholder.com/600x600?text=Demo' }

export default function Smoke() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">عرض سريع للتصميم</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">ألوان وخطوط</h2>
          <div className="flex gap-4 items-center">
            <div className="w-20 h-12 rounded-md" style={{ background: 'linear-gradient(90deg, #F59E0B, #F97316)' }} />
            <div className="text-base">الخط: Tajawal / Inter</div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">بطاقة المنتج</h2>
          <div style={{ width: 300 }}>
            <ProductCard product={demoProduct as any} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">الأزرار</h2>
          <div className="flex gap-4">
            <button className="btn-brand">AROVA</button>
            <button className="btn-ghost">زر ثانوي</button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
