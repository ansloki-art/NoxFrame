import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../lib/api'

export default function Services() {
  const [packages, setPackages] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    api.get('/api/categories').then(res => setCategories(res.data))
    api.get('/api/packages').then(res => setPackages(res.data))
  }, [])

  const filtered = activeCategory
    ? packages.filter(pkg => pkg.category_id === activeCategory)
    : packages

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Harga & Paket</p>
          <h1 className="text-4xl font-bold text-white uppercase tracking-widest">Layanan</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          <button onClick={() => setActiveCategory(null)}
            className={`px-4 py-1 border text-sm tracking-wider uppercase transition-all ${!activeCategory ? 'bg-gold text-black border-gold' : 'text-gold border-gold/40 hover:border-gold'}`}>
            Semua
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1 border text-sm tracking-wider uppercase transition-all ${activeCategory === cat.id ? 'bg-gold text-black border-gold' : 'text-gold border-gold/40 hover:border-gold'}`}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-white/40">Belum ada paket tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg.id} className="border border-gold/20 p-8 hover:border-gold/60 transition-all">
                <p className="text-gold text-xs tracking-widest uppercase mb-2">Paket</p>
                <h3 className="text-xl font-bold text-white mb-4">{pkg.name}</h3>
                <p className="text-3xl font-bold text-gold mb-6">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </p>
                <p className="text-white/50 text-sm mb-4">{pkg.duration_hours} jam sesi</p>
                {pkg.includes && (
                  <p className="text-white/60 text-sm mb-8 border-t border-gold/20 pt-4">
                    {pkg.includes}
                  </p>
                )}
                <Link to="/booking"
                  className="block text-center px-6 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                  Pesan Sekarang
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}