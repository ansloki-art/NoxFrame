import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BookingSuccess() {
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-20 h-20 rounded-full border border-gold/60 flex items-center justify-center mb-8">
          <span className="text-gold text-3xl">✓</span>
        </div>
        <p className="text-gold text-xs tracking-[0.5em] uppercase mb-4">Berhasil</p>
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-4">Booking Terkirim!</h1>
        <p className="text-white/50 mb-2">Permintaan booking kamu sudah kami terima.</p>
        <p className="text-white/50 mb-10">Fotografer akan menghubungi kamu via WhatsApp segera.</p>
        <Link to="/" className="px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </div>
  )
}