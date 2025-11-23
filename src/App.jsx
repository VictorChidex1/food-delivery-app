import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header'; // New Header
// import Navbar from './components/Navbar'; // <--- Optional: Comment out if Header replaces Navbar

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Restaurant from './pages/Restaurant';
import Checkout from './pages/Checkout';
import Terms from './pages/Terms';
import Safety from './pages/Safety'; 

// Placeholders
const OrderTracking = () => <div className="p-10 text-2xl text-gray-800">Live Order Tracking</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        
        {/* The Header sits outside Routes so it appears on every page */}
        <Header /> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;