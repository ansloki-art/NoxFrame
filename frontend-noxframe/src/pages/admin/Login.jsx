import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.access_token)
      navigate('/admin')
    } catch {
      setError('Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gold tracking-widest uppercase">NoxFrame</h1>
          <p className="text-white/40 text-sm mt-2 tracking-wider">Admin Panel</p>
        </div>

        {/* Form */}
        <div className="border border-gold/20 p-8">
          <div className="mb-6">
            <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="admin@noxframe.com"
            />
          </div>
          <div className="mb-8">
            <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-surface border border-white/10 text-white px-4 py-3 focus:border-gold focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors disabled:opacity-50">
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </div>

      </div>
    </div>
  )
}