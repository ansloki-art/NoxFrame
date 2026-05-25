import { useState, useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ portfolio: 0, packages: 0, bookings: 0 })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [portfolio, packages, bookings] = await Promise.all([
          api.get('/api/portfolio'),
          api.get('/api/packages'),
          api.get('/api/bookings'),
        ])
        setStats({
          portfolio: portfolio.data.length,
          packages: packages.data.filter(p => p.is_active).length,
          bookings: bookings.data.length,
        })
      } catch (err) {
        console.error('Gagal fetch stats', err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-dark flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang</h2>
        <p className="text-white/40 mb-8">Kelola konten NoxFrame dari sini.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gold/20 p-6 hover:border-gold/50 transition-all">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Portofolio</p>
            <p className="text-3xl font-bold text-gold">{stats.portfolio}</p>
          </div>
          <div className="border border-gold/20 p-6 hover:border-gold/50 transition-all">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Paket Aktif</p>
            <p className="text-3xl font-bold text-gold">{stats.packages}</p>
          </div>
          <div className="border border-gold/20 p-6 hover:border-gold/50 transition-all">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Booking</p>
            <p className="text-3xl font-bold text-gold">{stats.bookings}</p>
          </div>
        </div>
      </main>
    </div>
  )
}