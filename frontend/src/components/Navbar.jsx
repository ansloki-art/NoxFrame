import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">

        {/* Logo */}
        <div className="w-1/4">
          <Link to="/" className="text-gold font-bold text-xl tracking-widest uppercase">
            NoxFrame
          </Link>
        </div>

        {/* Desktop Links - tengah */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link to="/portfolio" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Portofolio</Link>
          <Link to="/services" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Layanan</Link>
          <Link to="/about" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Tentang</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex w-1/4 justify-end">
          <Link to="/booking" className="px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setOpen(!open)} className="text-white/70 hover:text-gold">
            {open ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-dark border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          <Link to="/portfolio" onClick={() => setOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-wider uppercase">Portofolio</Link>
          <Link to="/services" onClick={() => setOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-wider uppercase">Layanan</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-wider uppercase">Tentang</Link>
          <Link to="/booking" onClick={() => setOpen(false)} className="px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase text-center hover:bg-gold hover:text-black transition-all">
            Pesan Sekarang
          </Link>
        </div>
      )}
    </nav>
  )
}