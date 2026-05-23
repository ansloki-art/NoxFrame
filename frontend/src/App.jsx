import { Routes, Route } from 'react-router-dom'

// Public pages
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import About from './pages/About'
import Booking from './pages/Booking'

// Admin pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App