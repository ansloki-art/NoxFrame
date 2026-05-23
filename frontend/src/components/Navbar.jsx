import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">

        {/* Logo kiri */}
        <div className="w-1/4">
          <Link to="/" className="text-gold font-bold text-xl tracking-widest uppercase">
            NoxFrame
          </Link>
        </div>

        {/* Links tengah */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <Link to="/portfolio" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Portofolio</Link>
          <Link to="/services" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Layanan</Link>
          <Link to="/about" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">Tentang</Link>
        </div>

        {/* CTA kanan */}
        <div className="w-1/4 flex justify-end">
          <Link to="/booking" className="px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
            Pesan Sekarang
          </Link>
        </div>

      </div>
    </nav>
  )
}