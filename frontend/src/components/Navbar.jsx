import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <nav className='fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-sm border-b border-[#c9a84c]/20'>
            <div className='max-w-6xl max-auto px-6 py-4 flex items-center justify-between'>
                <Link to="/" className='text-gold font-bold text=xl tracking-widest uppercase'>
                    NoxFrame
                </Link>
            </div>
            {/* Nav Links */}
            <div className="flex items-center gap-8">
            <Link to="/portfolio" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">
                Portfolio
            </Link>
            <Link to="/services" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">
                Services
            </Link>
            <Link to="/about" className="text-white/70 hover:text-gold text-sm tracking-wider uppercase transition-colors">
                About
            </Link>
            <Link to="/booking" className="px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                Book Now
            </Link>
            </div>
        </nav>
    )
}