import AdminSidebar from '../../components/AdminSidebar'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-dark flex">

      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang</h2>
        <p className="text-white/40 mb-8">Kelola konten NoxFrame dari sini.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gold/20 p-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Portofolio</p>
            <p className="text-3xl font-bold text-gold">13</p>
          </div>
          <div className="border border-gold/20 p-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Paket Aktif</p>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
          <div className="border border-gold/20 p-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Booking</p>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
        </div>
      </main>

    </div>
  )
}