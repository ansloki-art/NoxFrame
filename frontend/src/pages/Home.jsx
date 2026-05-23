import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import heroImg from '../assets/NoxFrame.jpeg'
import api from '../lib/api'

export default function Home() {
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-dark overflow-hidden">

        {/* Kiri: Text */}
        <div className="w-1/2 z-10 px-16 md:px-24">
          <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6">
            Abadikan Melampaui Pandangan
          </p>
          <h1 className="text-7xl md:text-8xl font-bold text-white uppercase leading-none mb-6">
            Nox<br/>Frame
          </h1>
          <p className="text-white/50 text-lg mb-10">
            Fotografer profesional berbasis di Banda Aceh
          </p>
          <div className="flex gap-4">
            <Link to="/portfolio"
              className="px-8 py-3 bg-gold text-black text-sm tracking-wider uppercase font-bold hover:bg-gold-light transition-colors">
              Lihat Portfolio
            </Link>
            <Link to="/booking"
              className="px-8 py-3 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
              Pesan Sekarang
            </Link>
          </div>
        </div>

        {/* Kanan: Logo */}
        <div className="w-1/2 h-full relative">
          <img
            src={heroImg}
            alt="NoxFrame"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/30 to-transparent" />
        </div>

      </section>
    </div>
  )
}