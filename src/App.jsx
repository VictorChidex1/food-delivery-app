import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { Toaster } from "sonner";

// Components
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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

            {/* Public Routes - Restricted if logged in */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />

            {/* Protected Routes - Restricted if NOT logged in */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking/:id"
              element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              }
            />

            {/* Public Pages */}
            <Route path="/support" element={<Support />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpCenter />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
