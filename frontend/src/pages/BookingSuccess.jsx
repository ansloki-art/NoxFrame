import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function BookingSuccess() {
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <div className="pt-24 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold text-5xl mb-6">✓</p>
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-4">Booking Terkirim!</h1>
        <p className="text-white/50 mb-2">Permintaan booking kamu sudah kami terima.</p>
        <p className="text-white/50 mb-10">Fotografer akan menghubungi kamu via WhatsApp segera.</p>
        <Link to="/" className="px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}