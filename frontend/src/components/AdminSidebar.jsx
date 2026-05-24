import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/bookings', label: 'Booking' },
  { to: '/admin/portfolio', label: 'Portofolio' },
  { to: '/admin/packages', label: 'Paket' },
  { to: '/admin/profile', label: 'Profil' },
]

export default function AdminSidebar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-dark border-b border-gold/20 px-4 py-3 flex items-center justify-between">
        <span className="text-gold font-bold tracking-widest uppercase text-sm">NoxFrame</span>
        <button onClick={() => setOpen(!open)} className="text-white/70 hover:text-gold text-lg">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-dark pt-14 px-6 flex flex-col gap-1">
          {links.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
              className="block px-4 py-3 text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout}
            className="mt-4 px-4 py-3 text-white/40 hover:text-red-400 text-sm tracking-wider uppercase text-left transition-colors">
            Keluar
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-gold/20 flex-col shrink-0">
        <div className="p-6 border-b border-gold/20">
          <h1 className="text-gold font-bold tracking-widest uppercase">NoxFrame</h1>
          <p className="text-white/40 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {links.map(item => (
            <Link key={item.to} to={item.to}
              className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gold/20">
          <button onClick={handleLogout}
            className="w-full px-4 py-2 text-white/40 hover:text-red-400 text-sm tracking-wider uppercase transition-colors">
            Keluar
          </button>
        </div>
      </aside>
    </>
  )
}
