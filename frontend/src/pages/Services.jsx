import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import foto1 from '../assets/profile1.png'
import foto2 from '../assets/profile2.png'

// ── GANTI DATA INI SESUAI KONTEN FOTOGRAFER ──────────────────────────────
const PHOTOGRAPHERS = [
  {
    id: 1,
    name: 'Nama Fotografer 1',
    role: 'Lead Photographer',
    tagline: 'Capturing stories through light and shadow',
    bio: 'Ganti dengan bio singkat fotografer. Latar belakang, pengalaman, dan keahlian utama. Sekitar 2-3 kalimat cukup.',
    photoSrc: foto1,
    instagram: '',              // ganti: https://instagram.com/username
    whatsapp: '',               // ganti: 628xxxxxxxxxx
    city: 'Kota',
    specialties: ['Wedding', 'Prewedding', 'Portrait'],
  },
  {
    id: 2,
    name: 'Nama Fotografer 2',
    role: 'Photographer & Videographer',
    tagline: 'Every frame tells a thousand words',
    bio: 'Ganti dengan bio singkat fotografer ke-2. Cerita personal, passion, atau approach unik mereka dalam mendokumentasikan momen.',
    photoSrc: foto2,
    instagram: '',              // ganti: https://instagram.com/username
    whatsapp: '',               // ganti: 628xxxxxxxxxx
    city: 'Kota',
    specialties: ['Event', 'Portrait', 'Dokumentasi'],
  },
]
// ─────────────────────────────────────────────────────────────────────────

function PhotographerCard({ p, reversed }) {
  return (
    <section className="py-16 md:py-24 border-b border-gold/10 last:border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">

        {/* Foto */}
        <div className={reversed ? 'md:order-2' : ''}>
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img
              src={p.photoSrc}
              alt={p.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-gold" />
          </div>
        </div>

        {/* Info */}
        <div className={`flex flex-col justify-center ${reversed ? 'md:order-1' : ''}`}>
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">{p.role}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4">{p.name}</h2>
          <p className="text-white/40 text-sm tracking-wider italic mb-8">"{p.tagline}"</p>
          <p className="text-white/60 leading-relaxed mb-10">{p.bio}</p>

          {/* Spesialisasi */}
          <div className="mb-10">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Spesialisasi</p>
            <div className="flex flex-wrap gap-2">
              {p.specialties.map(s => (
                <span key={s} className="px-3 py-1 border border-gold/30 text-gold text-xs tracking-wider uppercase">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-3 text-sm border-t border-gold/10 pt-8 mb-10">
            {p.city && <p className="text-white/40">{p.city}</p>}
            {p.whatsapp && (
              <a href={`https://wa.me/${p.whatsapp.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors tracking-wider">
                WhatsApp
              </a>
            )}
            {p.instagram && (
              <a href={p.instagram}
                target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors tracking-wider">
                Instagram
              </a>
            )}
          </div>

          <Link to="/booking"
            className="inline-block self-start px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
            Booking Sekarang
          </Link>
        </div>

      </div>
    </section>
  )
}

export default function About() {
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex-1">

        <div className="text-center mb-16 pt-8">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Tim Kami</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-6">
            Di Balik Lensa
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Dua fotografer, satu visi — mengabadikan setiap momen berharga dengan sentuhan artistik dan profesional.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-0">
          <div className="flex-1 h-px bg-gold/20" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 h-px bg-gold/20" />
        </div>

        {PHOTOGRAPHERS.map((p, i) => (
          <PhotographerCard key={p.id} p={p} reversed={i % 2 !== 0} />
        ))}

      </div>

      <Footer />
    </div>
  )
}