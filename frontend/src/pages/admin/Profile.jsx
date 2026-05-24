import { useState, useEffect } from 'react'
import api from '../../lib/api'
import AdminSidebar from '../../components/AdminSidebar'

export default function AdminProfile() {
  const [form, setForm] = useState({
    display_name: '',
    tagline: '',
    bio: '',
    whatsapp_number: '',
    email_public: '',
    instagram_url: '',
    tiktok_url: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/api/profile').then(res => {
      if (res.data) setForm(res.data)
    })
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave() {
    setLoading(true)
    try {
      await api.put('/api/profile', form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert('Gagal menyimpan profil.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'display_name', label: 'Nama Display *', placeholder: 'Contoh: Wany Photography' },
    { name: 'tagline', label: 'Tagline', placeholder: 'Contoh: Abadikan momenmu bersama kami' },
    { name: 'whatsapp_number', label: 'Nomor WhatsApp *', placeholder: '628xxxxxxxxxx' },
    { name: 'email_public', label: 'Email Publik', placeholder: 'foto@email.com' },
    { name: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/username' },
    { name: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://tiktok.com/@username' },
    { name: 'city', label: 'Kota', placeholder: 'Aceh Utara' },
  ]

  return (
    <div className="min-h-screen bg-dark flex">

      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-8">Edit Profil</h2>

        <div className="border border-gold/20 p-8 max-w-2xl flex flex-col gap-5">
          {fields.map(f => (
            <div key={f.name}>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">{f.label}</label>
              <input name={f.name} value={form[f.name] || ''} onChange={handleChange}
                placeholder={f.placeholder}
                className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none" />
            </div>
          ))}

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Bio</label>
            <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={4}
              placeholder="Ceritain tentang fotografer..."
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none resize-none" />
          </div>

          <button onClick={handleSave} disabled={loading}
            className="w-full py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-40">
            {saved ? '✓ Tersimpan!' : loading ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </div>
      </main>
    </div>
  )
}