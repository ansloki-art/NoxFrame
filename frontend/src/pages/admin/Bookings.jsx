import { useState, useEffect } from 'react'
import api from '../../lib/api'
import AdminSidebar from '../../components/AdminSidebar'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  function fetchBookings() {
    api.get('/api/bookings').then(res => setBookings(res.data))
  }

  async function updateStatus(id, status) {
    await api.put(`/api/bookings/${id}/status`, { status })
    fetchBookings()
  }

  const statusColor = {
    pending: 'text-yellow-400 border-yellow-400/40',
    confirmed: 'text-green-400 border-green-400/40',
    cancelled: 'text-red-400 border-red-400/40',
    done: 'text-white/40 border-white/20',
  }

  return (
    <div className="min-h-screen bg-dark flex">

      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-8">Kelola Booking</h2>

        {bookings.length === 0 ? (
          <p className="text-white/40">Belum ada booking masuk.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="border border-gold/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold text-lg">{b.client_name}</p>
                    <p className="text-white/50 text-sm">WA: {b.client_phone}</p>
                    {b.client_email && <p className="text-white/50 text-sm">Email: {b.client_email}</p>}
                  </div>
                  <span className={`text-xs border px-3 py-1 uppercase tracking-wider ${statusColor[b.status]}`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
                  <p className="text-white/60">📅 {b.event_date}</p>
                  <p className="text-white/60">📍 {b.event_location}</p>
                  {b.notes && <p className="text-white/50 col-span-2">💬 {b.notes}</p>}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {b.status === 'pending' && <>
                    <button onClick={() => updateStatus(b.id, 'confirmed')}
                      className="px-4 py-2 border border-green-400/40 text-green-400 text-xs uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all">
                      Konfirmasi
                    </button>
                    <button onClick={() => updateStatus(b.id, 'cancelled')}
                      className="px-4 py-2 border border-red-400/40 text-red-400 text-xs uppercase tracking-wider hover:bg-red-400 hover:text-black transition-all">
                      Tolak
                    </button>
                  </>}
                  {b.status === 'confirmed' && (
                    <button onClick={() => updateStatus(b.id, 'done')}
                      className="px-4 py-2 border border-white/20 text-white/50 text-xs uppercase tracking-wider hover:bg-white/10 transition-all">
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}