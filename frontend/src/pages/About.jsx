import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../lib/api'

export default function About() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    api.get('/api/profile').then(res => setProfile(res.data)).catch(() => null)
  }, [])

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto w-full flex-1">

        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-3">Siapa Kami</p>
          <h1 className="text-4xl font-bold text-white uppercase tracking-widest">Tentang</h1>
        </div>

        {profile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {profile.avatar_url && (
              <div className="overflow-hidden">
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            <div className={!profile.avatar_url ? 'md:col-span-2 max-w-2xl mx-auto text-center' : ''}>
              <h2 className="text-2xl font-bold text-white mb-2">{profile.display_name}</h2>
              {profile.tagline && (
                <p className="text-gold text-sm tracking-wider uppercase mb-6">{profile.tagline}</p>
              )}
              {profile.bio && (
                <p className="text-white/60 leading-relaxed mb-8">{profile.bio}</p>
              )}

              <div className="flex flex-col gap-3 text-sm">
                {profile.city && (
                  <p className="text-white/40">{profile.city}</p>
                )}
                {profile.whatsapp_number && (
                  <a
                    href={`https://wa.me/${profile.whatsapp_number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-light transition-colors tracking-wider"
                  >
                    WhatsApp: {profile.whatsapp_number}
                  </a>
                )}
                {profile.email_public && (
                  <a href={`mailto:${profile.email_public}`} className="text-white/40 hover:text-gold transition-colors">
                    {profile.email_public}
                  </a>
                )}
                {profile.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                    Instagram
                  </a>
                )}
                {profile.tiktok_url && (
                  <a href={profile.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                    TikTok
                  </a>
                )}
              </div>

              <div className="mt-10">
                <Link to="/booking" className="px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                  Pesan Sekarang
                </Link>
              </div>
            </div>

          </div>
        ) : (
          <p className="text-center text-white/30">Memuat profil...</p>
        )}

      </div>

      <Footer />
    </div>
  )
}
