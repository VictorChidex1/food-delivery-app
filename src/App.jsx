import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { Toaster } from "sonner";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Restaurant from "./pages/Restaurant";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Safety from "./pages/Safety";
import OrderTracking from "./pages/OrderTracking";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Toaster position="top-center" richColors />

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/tracking/:id" element={<OrderTracking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />

            {/* 2. ADD ROUTE */}
            <Route path="/help" element={<HelpCenter />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
