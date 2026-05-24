export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-gold font-bold tracking-widest uppercase text-sm">NoxFrame</p>
        <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} NoxFrame. All rights reserved.</p>
      </div>
    </footer>
  )
}
