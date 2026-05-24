import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import heroImg from '../assets/NoxFrame.jpeg'
import api from '../lib/api'

export default function Home() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    api.get('/api/portfolio').then(res => setPhotos(res.data.slice(0, 3)))
  }, [])

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">

        {/* Kiri: Text */}
        <div className="w-full md:w-1/2 z-10 px-6 md:px-24 pt-24 md:pt-0">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6">Capture Beyond Vision</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-none mb-6">
            Nox<br/>Frame
          </h1>
          <p className="text-white/50 text-base md:text-lg mb-10">
            Fotografer profesional berbasis di Banda Aceh
          </p>
          <div className="flex gap-4">
            <Link to="/portfolio"
              className="px-6 md:px-8 py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors">
              Lihat Portofolio
            </Link>
            <Link to="/booking"
              className="px-6 md:px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
              Pesan Sekarang
            </Link>
          </div>
        </div>

        {/* Kanan: Logo - hidden di mobile */}
        <div className="hidden md:block w-1/2 h-full absolute right-0 top-0">
          <img src={heroImg} alt="NoxFrame" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/30 to-transparent" />
        </div>

      </section>

      {/* Featured Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Karya Terpilih</p>
          <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Portfolio</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.caption || 'NoxFrame'}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/portfolio"
            className="px-10 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
            Lihat Semua Karya
          </Link>
        </div>
      </section>

    </div>
  )
}