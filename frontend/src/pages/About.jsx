import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import foto1 from '../assets/profile1.jpeg'
import foto2 from '../assets/profile2.PNG'

// ── GANTI DATA INI SESUAI KONTEN FOTOGRAFER ──────────────────────────────
const PHOTOGRAPHERS = [
  {
    id: 1,
    name: 'Tafwani',
    role: 'Fotographer Utama',
    tagline: 'Bukan sekadar foto, namun warisan momen yang tak lekang oleh waktu.',
    bio: 'Halo, saya Tafwani atau biasa dipanggil Wany.Saya seorang fotografer yang fokus mengabadikan momen dengan sentuhan natural, emosional, dan estetik. Bagi saya, setiap foto memiliki cerita yang layak dikenang selamanya.Saya terbiasa menangani sesi prewedding, wedding, portrait, wisuda, hingga event dengan konsep yang nyaman dan hasil yang berkelas.',
    photoSrc: foto1,
    instagram: 'https://instagram.com/wany_film_making',
    tiktok: 'https://www.tiktok.com/@tafwani',              
    whatsapp: '082267451998',               
    city: 'Lhokseumawe',
    specialties: ['Wedding', 'Prewedding', 'Wisuda', 'Engagement', 'Dokumentasi'],
  },
  {
    id: 2,
    name: 'Mizwar Anas',
    role: 'Fotographer & Videographer',
    tagline: 'Visual yang dibuat dengan rasa dan cerita.',
    bio: 'Mizwar films adalah fotografer dan cinematography profesional yang berfokus pada cinematic visual, portrait, wedding, fashion, dan commercial photography. Menggabungkan teknik visual modern dengan storytelling emosional sehingga menghasilkan karya yang elegan, timeless, dan berkelas internasional.',
    photoSrc: foto2,
    instagram: 'https://instagram.com/mizwar_films',
    tiktok: 'https://www.tiktok.com/@mizwarfilms',             
    whatsapp: '+62 812-3085-1823',               
    city: 'Lhoksemauwe',
    specialties: ['Weeding', 'Videografi', 'Prewedding'],
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
            {p.tiktok && (
              <a href={p.tiktok}
                target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors tracking-wider">
                Tiktok
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