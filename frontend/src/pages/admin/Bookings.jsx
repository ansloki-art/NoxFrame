import { useState, useEffect } from 'react'
import api from '../../lib/api'
import AdminSidebar from '../../components/AdminSidebar'

const STATUS_COLOR = {
  pending: 'text-yellow-400 border-yellow-400/40',
  confirmed: 'text-blue-400 border-blue-400/40',
  dp_paid: 'text-purple-400 border-purple-400/40',
  fully_paid: 'text-green-400 border-green-400/40',
  cancelled: 'text-red-400 border-red-400/40',
  done: 'text-white/40 border-white/20',
}

const STATUS_LABEL = {
  pending: 'Menunggu',
  confirmed: 'Dikonfirmasi',
  dp_paid: 'DP Lunas',
  fully_paid: 'Lunas',
  cancelled: 'Dibatalkan',
  done: 'Selesai',
}

function ConfirmModal({ booking, onClose, onConfirmed }) {
  const [form, setForm] = useState({
    dp_amount: '',
    full_amount: '',
    dp_link: '',
    full_link: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    await api.put(`/api/bookings/${booking.id}/confirm`, {
      dp_amount: form.dp_amount ? parseInt(form.dp_amount) : null,
      full_amount: form.full_amount ? parseInt(form.full_amount) : null,
      dp_link: form.dp_link || null,
      full_link: form.full_link || null,
    })
    setLoading(false)
    onConfirmed()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-surface border border-gold/20 p-6 w-full max-w-md">
        <h3 className="text-white font-bold text-lg mb-1">Konfirmasi Booking</h3>
        <p className="text-white/40 text-sm mb-6">{booking.client_name} — {booking.event_date}</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">Nominal DP (Rp)</label>
            <input type="number" value={form.dp_amount}
              onChange={e => setForm(f => ({...f, dp_amount: e.target.value}))}
              placeholder="500000"
              className="w-full bg-surface-2 border border-gold/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/60" />
          </div>
          <div>
            <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">Link Pembayaran DP</label>
            <input type="text" value={form.dp_link}
              onChange={e => setForm(f => ({...f, dp_link: e.target.value}))}
              placeholder="https://..."
              className="w-full bg-surface-2 border border-gold/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/60" />
          </div>
          <div>
            <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">Nominal Full (Rp)</label>
            <input type="number" value={form.full_amount}
              onChange={e => setForm(f => ({...f, full_amount: e.target.value}))}
              placeholder="2000000"
              className="w-full bg-surface-2 border border-gold/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/60" />
          </div>
          <div>
            <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">Link Pembayaran Full</label>
            <input type="text" value={form.full_link}
              onChange={e => setForm(f => ({...f, full_link: e.target.value}))}
              placeholder="https://..."
              className="w-full bg-surface-2 border border-gold/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold/60" />
          </div>
        </div>

        {booking.client_email ? (
          <p className="text-white/30 text-xs mb-6">
            Email konfirmasi + link pembayaran akan dikirim ke <span className="text-gold">{booking.client_email}</span>
          </p>
        ) : (
          <p className="text-yellow-400/60 text-xs mb-6">
            Client tidak mencantumkan email — link tidak akan dikirim otomatis.
          </p>
        )}

        <div className="flex gap-3">
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2 bg-gold text-black text-sm font-bold uppercase tracking-wider hover:bg-gold-light transition-all disabled:opacity-50">
            {loading ? 'Mengirim...' : 'Konfirmasi & Kirim Email'}
          </button>
          <button onClick={onClose}
            className="px-4 py-2 border border-white/20 text-white/50 text-sm hover:bg-white/10 transition-all">
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [confirmingBooking, setConfirmingBooking] = useState(null)

  useEffect(() => { fetchBookings() }, [])

  function fetchBookings() {
    api.get('/api/bookings').then(res => setBookings(res.data))
  }

  async function updateStatus(id, status) {
    await api.put(`/api/bookings/${id}/status`, { status })
    fetchBookings()
  }

  async function handleDelete(id) {
    if (!confirm('Hapus booking ini?')) return
    await api.delete(`/api/bookings/${id}`)
    fetchBookings()
  }

  function handleConfirmed() {
    setConfirmingBooking(null)
    fetchBookings()
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <AdminSidebar />

      {confirmingBooking && (
        <ConfirmModal
          booking={confirmingBooking}
          onClose={() => setConfirmingBooking(null)}
          onConfirmed={handleConfirmed}
        />
      )}

      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-8">Kelola Booking</h2>

        {bookings.length === 0 ? (
          <p className="text-white/40">Belum ada booking masuk.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="border border-gold/20 p-6">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <p className="text-white font-bold text-lg">{b.client_name}</p>
                    <p className="text-white/50 text-sm">WA: {b.client_phone}</p>
                    {b.client_email && <p className="text-white/50 text-sm">Email: {b.client_email}</p>}
                  </div>
                  <span className={`text-xs border px-3 py-1 uppercase tracking-wider ${STATUS_COLOR[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
                  <p className="text-white/60">📅 {b.event_date}</p>
                  <p className="text-white/60">📍 {b.event_location}</p>
                  {b.notes && <p className="text-white/50 col-span-2">💬 {b.notes}</p>}
                </div>

                {b.dp_link && (
                  <div className="mb-4 p-3 bg-surface-2 border border-gold/10 text-xs space-y-1">
                    {b.dp_amount && <p className="text-white/40">DP: <span className="text-gold">Rp {b.dp_amount.toLocaleString('id-ID')}</span></p>}
                    {b.full_amount && <p className="text-white/40">Full: <span className="text-gold">Rp {b.full_amount.toLocaleString('id-ID')}</span></p>}
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {b.status === 'pending' && (
                    <>
                      <button onClick={() => setConfirmingBooking(b)}
                        className="px-4 py-2 border border-green-400/40 text-green-400 text-xs uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all">
                        Konfirmasi
                      </button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')}
                        className="px-4 py-2 border border-red-400/40 text-red-400 text-xs uppercase tracking-wider hover:bg-red-400 hover:text-black transition-all">
                        Tolak
                      </button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                    <button onClick={() => updateStatus(b.id, 'dp_paid')}
                      className="px-4 py-2 border border-purple-400/40 text-purple-400 text-xs uppercase tracking-wider hover:bg-purple-400 hover:text-black transition-all">
                      Tandai DP Lunas
                    </button>
                  )}
                  {b.status === 'dp_paid' && (
                    <button onClick={() => updateStatus(b.id, 'fully_paid')}
                      className="px-4 py-2 border border-green-400/40 text-green-400 text-xs uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all">
                      Tandai Lunas
                    </button>
                  )}
                  {b.status === 'fully_paid' && (
                    <button onClick={() => updateStatus(b.id, 'done')}
                      className="px-4 py-2 border border-white/20 text-white/50 text-xs uppercase tracking-wider hover:bg-white/10 transition-all">
                      Tandai Selesai
                    </button>
                  )}
                  <button onClick={() => handleDelete(b.id)}
                    className="px-4 py-2 border border-red-400/20 text-red-400/50 text-xs uppercase tracking-wider hover:bg-red-400/10 transition-all">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}