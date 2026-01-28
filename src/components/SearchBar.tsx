import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/products?search=${query}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن المنتجات..."
        className="flex-1 p-2 border rounded-r"
      />
      <button 
        type="submit"
        className="px-6 bg-black text-white rounded-l"
      >
        بحث
      </button>
    </form>
  )
}
