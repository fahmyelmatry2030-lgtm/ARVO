import Link from 'next/link'

const categories = [
  { id: 1, name: 'قمصان', slug: 'shirts' },
  { id: 2, name: 'بناطيل', slug: 'pants' },
  { id: 3, name: 'أحذية', slug: 'shoes' },
  { id: 4, name: 'إكسسوارات', slug: 'accessories' }
]

export default function Categories() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">التصنيفات</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
