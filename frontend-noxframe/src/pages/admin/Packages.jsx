import { useState, useEffect } from 'react'
import api from '../../lib/api'
import AdminSidebar from '../../components/AdminSidebar'
import toast from 'react-hot-toast'

export default function AdminPackages() {
  const [packages, setPackages] = useState([])
  const [categories, setCategories] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    category_id: '', name: '', description: '',
    price: '', duration_hours: '', includes: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPackages()
    api.get('/api/categories').then(res => setCategories(res.data))
  }, [])

  function fetchPackages() {
    api.get('/api/packages').then(res => setPackages(res.data))
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleEdit(pkg) {
    setEditingId(pkg.id)
    setForm({
      category_id: pkg.category_id || '',
      name: pkg.name,
      description: pkg.description || '',
      price: pkg.price,
      duration_hours: pkg.duration_hours,
      includes: pkg.includes || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setEditingId(null)
    setForm({ category_id: '', name: '', description: '', price: '', duration_hours: '', includes: '' })
  }

  async function handleSubmit() {
    if (!form.name || !form.price || !form.duration_hours || !form.category_id) {
      toast.error('Nama, kategori, harga, dan durasi wajib diisi.')
      return
    }
    setLoading(true)
    const payload = {
      ...form,
      price: parseInt(form.price),
      duration_hours: form.duration_hours
    }
    try {
      if (editingId) {
        await api.put(`/api/packages/${editingId}`, payload)
      } else {
        await api.post('/api/packages', payload)
      }
      handleCancel()
      fetchPackages()
    } catch {
      toast.error('Gagal menyimpan paket.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Nonaktifkan paket ini?')) return
    await api.delete(`/api/packages/${id}`)
    fetchPackages()
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-8">Kelola Paket</h2>

        <div className="border border-gold/20 p-6 mb-10">
          <h3 className="text-gold text-sm tracking-widest uppercase mb-6">
            {editingId ? 'Edit Paket' : 'Tambah Paket Baru'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Nama Paket</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none"
                placeholder="Paket Wedding Basic" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Kategori</label>
              <select name="category_id" value={form.category_id} onChange={handleChange}
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none">
                <option value="">-- Pilih Kategori --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Harga (Rp)</label>
              <input name="price" value={form.price} onChange={handleChange} type="number"
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none"
                placeholder="1500000" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Durasi (jam)</label>
              <input name="duration_hours" value={form.duration_hours} onChange={handleChange} type="text"
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none"
                placeholder="Durasi" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Termasuk</label>
              <input name="includes" value={form.includes} onChange={handleChange}
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none"
                placeholder="100 foto edit, file RAW, Google Drive link" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={loading}
              className="px-8 py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-40">
              {loading ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Paket'}
            </button>
            {editingId && (
              <button onClick={handleCancel}
                className="px-8 py-3 border border-white/20 text-white/50 text-sm tracking-wider uppercase hover:border-white/40 transition-all">
                Batal
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {packages.length === 0 ? (
            <p className="text-white/40">Belum ada paket.</p>
          ) : packages.map(pkg => (
            <div key={pkg.id} className="border border-gold/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-bold">{pkg.name}</p>
                <p className="text-gold text-sm">Rp {pkg.price.toLocaleString('id-ID')} · {pkg.duration_hours}</p>
                {pkg.includes && <p className="text-white/40 text-xs mt-1">{pkg.includes}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(pkg)}
                  className="px-4 py-2 border border-gold/40 text-gold text-xs uppercase tracking-wider hover:bg-gold hover:text-black transition-all">
                  Edit
                </button>
                <button onClick={() => handleDelete(pkg.id)}
                  className="px-4 py-2 border border-red-400/40 text-red-400 text-xs uppercase tracking-wider hover:bg-red-400 hover:text-black transition-all">
                  Nonaktifkan
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}