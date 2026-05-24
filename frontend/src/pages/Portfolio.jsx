import { useState, useEffect } from 'react'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Portfolio() {
  const [photos, setPhotos] = useState([])
  const [categories, setCategories] = useState([])
  const [activeSlug, setActiveSlug] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/categories').then(res => setCategories(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    const url = activeSlug 
      ? `/api/portfolio?category_slug=${activeSlug}` 
      : '/api/portfolio'
    api.get(url)
      .then(res => setPhotos(res.data))
      .finally(() => setLoading(false))
  }, [activeSlug])

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      <div className="px-6 py-12">
      {/* Header */}
      <div className="pt-28 pb-8 text-center">
        <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Galeri Karya</p>
        <h1 className="text-4xl font-bold text-white uppercase tracking-widest">Portfolio</h1>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 justify-center flex-wrap mb-10">
        <button
          onClick={() => setActiveSlug(null)}
          className={`px-4 py-1 border text-sm tracking-wider uppercase transition-all ${
            !activeSlug 
              ? 'bg-gold text-black border-gold' 
              : 'text-gold border-gold/40 hover:border-gold'
          }`}
        >
          Semua
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveSlug(cat.slug)}
            className={`px-4 py-1 border text-sm tracking-wider uppercase transition-all ${
              activeSlug === cat.slug 
                ? 'bg-gold text-black border-gold' 
                : 'text-gold border-gold/40 hover:border-gold'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <p className="text-center text-gold/60">Memuat...</p>
      ) : (
        <div className="columns-2 md:columns-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="mb-4 break-inside-avoid group relative overflow-hidden cursor-pointer">
              <img
                src={photo.image_url}
                alt={photo.caption || 'NoxFrame'}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {photo.caption && (
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs tracking-wider">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer />
    </div>
  )
}