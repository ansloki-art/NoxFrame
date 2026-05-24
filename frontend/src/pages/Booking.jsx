import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../lib/api'

export default function Booking() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
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
      alert('Nama, nomor WA, tanggal, dan lokasi wajib diisi.')
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
    } catch {
      alert('Gagal mengirim booking. Coba lagi.')
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
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Tanggal Acara *</label>
            <input name="event_date" value={form.event_date} onChange={handleChange}
              type="date"
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none" />
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