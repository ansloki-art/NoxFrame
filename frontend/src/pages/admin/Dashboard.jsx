import { Link, useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-gold/20 flex flex-col">
        <div className="p-6 border-b border-gold/20">
          <h1 className="text-gold font-bold tracking-widest uppercase">NoxFrame</h1>
          <p className="text-white/40 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <Link to="/admin" className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
            Dashboard
          </Link>
          <Link to="/admin/portfolio" className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
            Portofolio
          </Link>
          <Link to="/admin/packages" className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
            Paket
          </Link>
          <Link to="/admin/profile" className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
            Profil
          </Link>
        </nav>
        <div className="p-4 border-t border-gold/20">
          <button onClick={handleLogout}
            className="w-full px-4 py-2 text-white/40 hover:text-red-400 text-sm tracking-wider uppercase transition-colors">
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang</h2>
        <p className="text-white/40 mb-8">Kelola konten NoxFrame dari sini.</p>

        <div className="grid grid-cols-3 gap-4">
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