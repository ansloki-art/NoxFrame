import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import About from './pages/About'
import Booking from './pages/Booking'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminPortfolio from './pages/admin/Portfolio'
import AdminPackages from './pages/admin/Packages'
import AdminProfile from './pages/admin/Profile'
import BookingSuccess from './pages/BookingSuccess'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/portfolio" element={<AdminPortfolio />} />
      <Route path="/admin/packages" element={<AdminPackages />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
    </Routes>
  )
}

export default App