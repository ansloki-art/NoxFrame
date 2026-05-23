import { useState, useEffect } from 'react'
import api from '../lib/api'

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
    <div className="min-h-screen bg-dark px-6 py-12">
      <h1 className="text-4xl font-bold text-gold mb-8 text-center tracking-widest uppercase">
        Portfolio
      </h1>

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
          All
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
        <p className="text-center text-gold/60">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {photos.map(photo => (
            <div key={photo.id} className="aspect-square overflow-hidden">
              <img
                src={photo.thumbnail_url}
                alt={photo.caption || 'NoxFrame'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}