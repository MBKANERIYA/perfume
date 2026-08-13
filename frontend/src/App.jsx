import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Landing from './pages/landing/Landing'
import Product from './pages/product/Product'
import Collection from './pages/collection/Collection'
import Footer from './components/Footer'
import CartSidebar from './components/cart/CartSidebar'
import ScrollToTop from './components/ScrollToTop'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminDashboard from './pages/admin/AdminDashboard'
import LocomotiveScroll from 'locomotive-scroll'

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <CartSidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Valid Category Routes */}
        <Route path="/shop-all" element={<Collection />} />
        <Route path="/new-arrivals" element={<Collection />} />
        <Route path="/men" element={<Collection />} />
        <Route path="/women" element={<Collection />} />
        <Route path="/unisex" element={<Collection />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
