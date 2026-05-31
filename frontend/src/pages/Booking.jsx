import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../lib/api'
import toast from 'react-hot-toast'

const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const DAY_NAMES = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']

function localDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function BookingCalendar({ value, onChange, bookedDates }) {
  const today = localDateStr(new Date())
  const initDate = value ? new Date(value + 'T00:00:00') : new Date()
  const [view, setView] = useState({ year: initDate.getFullYear(), month: initDate.getMonth() })

  const { year, month } = view
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function prevMonth() {
    setView(v => {
      if (v.month === 0) return { year: v.year - 1, month: 11 }
      return { year: v.year, month: v.month - 1 }
    })
  }
  function nextMonth() {
    setView(v => {
      if (v.month === 11) return { year: v.year + 1, month: 0 }
      return { year: v.year, month: v.month + 1 }
    })
  }

  const cells = Array(firstDayOfWeek).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="bg-surface border border-white/10 p-4 select-none">
      {/* month nav */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth}
          className="text-white/40 hover:text-gold text-xl px-2 transition-colors">‹</button>
        <span className="text-white text-sm font-semibold tracking-wider">
          {MONTH_NAMES[month]} {year}
        </span>
        <button type="button" onClick={nextMonth}
          className="text-white/40 hover:text-gold text-xl px-2 transition-colors">›</button>
      </div>

      {/* day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-white/25 text-xs py-1">{d}</div>
        ))}
      </div>

      {/* day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const dateStr = localDateStr(new Date(year, month, day))
          const isPast   = dateStr < today
          const isBooked = bookedDates.includes(dateStr)
          const isSelected = value === dateStr
          const isDisabled = isPast || isBooked

          let cls = 'w-full text-sm py-1.5 rounded-sm text-center transition-all '
          if (isSelected) {
            cls += 'bg-gold text-black font-bold cursor-default'
          } else if (isBooked) {
            cls += 'text-red-400/40 line-through cursor-not-allowed'
          } else if (isPast) {
            cls += 'text-white/15 cursor-not-allowed'
          } else {
            cls += 'text-white hover:bg-gold/20 hover:text-gold cursor-pointer'
          }

          return (
            <button key={i} type="button"
              disabled={isDisabled}
              onClick={() => onChange(dateStr)}
              className={cls}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-xs text-white/30">
          <span className="w-3 h-3 rounded-sm bg-gold inline-block" /> Dipilih
        </span>
        <span className="flex items-center gap-1.5 text-xs text-red-400/50">
          <span className="w-3 h-3 rounded-sm bg-red-400/20 inline-block" /> Sudah dipesan
        </span>
      </div>
    </div>
  )
}

export default function Booking() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [bookedDates, setBookedDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    event_date: '',
    event_location: '',
    category_id: '',
    package_id: '',
    notes: ''
  })

  useEffect(() => {
    api.get('/api/categories').then(res => setCategories(res.data))
    api.get('/api/packages').then(res => setPackages(res.data))
    api.get('/api/bookings/booked-dates').then(res => setBookedDates(res.data))
  }, [])

  useEffect(() => {
    if (form.category_id) {
      setFilteredPackages(packages.filter(p => p.category_id === form.category_id))
    } else {
      setFilteredPackages([])
    }
    setForm(prev => ({ ...prev, package_id: '' }))
  }, [form.category_id, packages])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.client_name || !form.client_phone || !form.event_date || !form.event_location) {
      toast.error('Nama, nomor WA, tanggal, dan lokasi wajib diisi.')
      return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        category_id: form.category_id || null,
        package_id: form.package_id || null,
        client_email: form.client_email || null,
        notes: form.notes || null,
      }
      await api.post('/api/bookings', payload)
      navigate('/booking/success')
    } catch (err) {
      const msg = err?.response?.data?.detail
      toast.error(msg || 'Gagal mengirim booking. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Jadwalkan Sesi</p>
          <h1 className="text-4xl font-bold text-white uppercase tracking-widest">Booking</h1>
        </div>

        <div className="border border-gold/20 p-8 flex flex-col gap-5">

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Nama Lengkap *</label>
            <input name="client_name" value={form.client_name} onChange={handleChange}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="Nama kamu" />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Nomor WhatsApp *</label>
            <input name="client_phone" value={form.client_phone} onChange={handleChange}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="08xxxxxxxxxx" />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Email</label>
            <input name="client_email" value={form.client_email} onChange={handleChange}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="Opsional" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Kategori</label>
              <select name="category_id" value={form.category_id} onChange={handleChange}
                className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none">
                <option value="">-- Pilih Kategori --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Paket</label>
              <select name="package_id" value={form.package_id} onChange={handleChange}
                disabled={!form.category_id}
                className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none disabled:opacity-40">
                <option value="">-- Pilih Paket --</option>
                {filteredPackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name} — Rp {pkg.price.toLocaleString('id-ID')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">
              Tanggal Acara *
              {form.event_date && (
                <span className="ml-2 text-gold normal-case tracking-normal">
                  — {new Date(form.event_date + 'T00:00:00').toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
                </span>
              )}
            </label>
            <BookingCalendar
              value={form.event_date}
              onChange={date => setForm(prev => ({ ...prev, event_date: date }))}
              bookedDates={bookedDates}
            />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Lokasi Acara *</label>
            <input name="event_location" value={form.event_location} onChange={handleChange}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="Contoh: Gedung Serbaguna, Lhokseumawe" />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Pesan / Catatan</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none resize-none"
              placeholder="Ceritain detail acaramu..." />
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-4 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-40">
            {loading ? 'Mengirim...' : 'Kirim Permintaan Booking'}
          </button>

        </div>
      </div>
      <Footer />
    </div>
  )
}
