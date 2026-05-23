import { useState, useEffect } from 'react'
import api from '../../lib/api'

export default function AdminPortfolio() {
  const [photos, setPhotos] = useState([])
  const [categories, setCategories] = useState([])
  const [file, setFile] = useState(null)
  const [categoryId, setCategoryId] = useState('')
  const [caption, setCaption] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchPhotos()
    api.get('/api/categories').then(res => setCategories(res.data))
  }, [])

  function fetchPhotos() {
    api.get('/api/portfolio').then(res => setPhotos(res.data))
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    if (categoryId) formData.append('category_id', categoryId)
    if (caption) formData.append('caption', caption)
    formData.append('is_featured', isFeatured)
    try {
      await api.post('/api/portfolio/upload', formData)
      setFile(null)
      setCategoryId('')
      setCaption('')
      setIsFeatured(false)
      fetchPhotos()
      alert('Foto berhasil diupload!')
    } catch {
      alert('Gagal upload foto.')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus foto ini?')) return
    await api.delete(`/api/portfolio/${id}`)
    fetchPhotos()
  }

  return (
    <div className="min-h-screen bg-dark flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-gold/20 p-6 flex flex-col gap-2 shrink-0">
        <h1 className="text-gold font-bold tracking-widest uppercase mb-4">NoxFrame</h1>
        {[
          { to: '/admin', label: 'Dashboard' },
          { to: '/admin/portfolio', label: 'Portofolio' },
          { to: '/admin/packages', label: 'Paket' },
          { to: '/admin/profile', label: 'Profil' },
        ].map(item => (
          <a key={item.to} href={item.to}
            className="px-4 py-3 text-white/70 hover:text-gold hover:bg-surface text-sm tracking-wider uppercase transition-all">
            {item.label}
          </a>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Kelola Portofolio</h2>

        {/* Upload Form */}
        <div className="border border-gold/20 p-6 mb-10">
          <h3 className="text-gold text-sm tracking-widest uppercase mb-6">Upload Foto Baru</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Pilih Foto</label>
              <input type="file" accept="image/*"
                onChange={e => setFile(e.target.files[0])}
                className="w-full text-white/70 text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-gold/40 file:bg-transparent file:text-gold file:text-xs file:uppercase file:tracking-wider" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Kategori</label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none">
                <option value="">-- Pilih Kategori --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Caption</label>
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)}
                placeholder="Opsional"
                className="w-full bg-surface border border-white/10 text-white px-4 py-2 focus:border-gold focus:outline-none" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)}
                  className="accent-gold w-4 h-4" />
                <span className="text-white/60 text-sm">Tampilkan di Home</span>
              </label>
            </div>
          </div>
          <button onClick={handleUpload} disabled={!file || uploading}
            className="px-8 py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-40">
            {uploading ? 'Mengupload...' : 'Upload Foto'}
          </button>
        </div>

        {/* Photos Grid */}
        <div className="gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {photos.map(photo => (
            <div key={photo.id} className="relative group">
              <img src={photo.thumbnail_url} alt={photo.caption || 'foto'}
                className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(photo.id)}
                  className="px-4 py-2 border border-red-400 text-red-400 text-xs uppercase tracking-wider hover:bg-red-400 hover:text-black transition-all">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}