import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Box,
  Heart,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Logo from "./Logo";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[#FF5200] text-white hover:bg-orange-600 shadow-sm",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      icon: "h-10 w-10",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5200] disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5200] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

// --- MAIN HEADER COMPONENT ---

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. USE CONTEXT
  // This connects the input to the global "Brain"
  const { searchQuery, setSearchQuery } = useSearch();
  const { currentUser, logout } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Menu States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const userMenuItems = [
    { icon: Box, label: "My Orders", link: "/orders" },
    { icon: Heart, label: "Favorites", link: "/favorites" },
    { icon: CreditCard, label: "Wallet", link: "/wallet" },
    { icon: Settings, label: "Settings", link: "/settings" },
    { icon: HelpCircle, label: "Support", link: "/support" },
  ];

  // Check Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Data
  useEffect(() => {
    const checkData = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
      const count = Object.values(storedCart).reduce((a, b) => a + b, 0);
      setCartCount(count);
    };

    checkData();
    window.addEventListener("storage", checkData);
    const interval = setInterval(checkData, 1000);
    return () => {
      window.removeEventListener("storage", checkData);
      clearInterval(interval);
    };
  }, [location]);

  // Click Outside Listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownRef]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // If user searches while on another page, redirect to Home
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-sm"
          : "bg-white border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 md:px-6 gap-4">
        {/* LOGO */}
        <Link to="/" className="shrink-0 hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* SEARCH BAR (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full group flex items-center"
          >
            <div className="absolute left-1 bg-white rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1 text-xs font-bold text-gray-700 border border-gray-100">
              <MapPin size={14} className="text-[#FF5200]" />
              <span>Lagos</span>
            </div>

            <Input
              placeholder="Search for 'Jollof', 'Suya'..."
              className="pl-24 pr-12 h-12 bg-gray-50 focus:bg-white border-transparent transition-all"
              // 3. BIND INPUT TO CONTEXT
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-1.5 bg-[#FF5200] hover:bg-orange-600 text-white p-2 rounded-full transition-all shadow-md hover:scale-105"
            >
              <Search size={16} strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                  {currentUser.displayName
                    ? currentUser.displayName.substring(0, 2).toUpperCase()
                    : "US"}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                    Hello,
                  </p>
                  <p className="text-sm font-bold text-gray-900 leading-none truncate max-w-[80px]">
                    {currentUser.displayName
                      ? currentUser.displayName.split(" ")[0]
                      : "User"}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-14 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                  >
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                      >
                        <item.icon size={18} />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-bold">Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="font-bold text-gray-700 hover:text-[#FF5200]"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full font-bold px-6 shadow-lg shadow-orange-200 transition-transform hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Link to="/checkout">
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full h-12 w-12"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-[#FF5200] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Link>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/checkout"
            className="relative text-gray-900 bg-gray-100 p-2.5 rounded-full"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5200] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-900"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search food..."
                  className="pl-9 bg-gray-50"
                  // 4. BIND MOBILE INPUT TOO
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {currentUser ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-xl mb-2 border border-orange-100">
                    <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold">
                      {currentUser.displayName
                        ? currentUser.displayName.substring(0, 2).toUpperCase()
                        : "US"}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Logged in as
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {currentUser.displayName || "User"}
                      </p>
                    </div>
                  </div>
                  {userMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FF5200] rounded-lg transition-colors"
                    >
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg mt-2 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-bold">Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 border border-gray-200 rounded-xl font-bold text-gray-700 text-center hover:bg-gray-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 bg-[#FF5200] text-white rounded-xl font-bold shadow-md text-center hover:bg-orange-600"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
