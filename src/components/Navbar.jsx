import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ShoppingBag, Menu, X, User, ChevronDown, Box, Heart, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Ref for the profile dropdown container
  const profileDropdownRef = useRef(null);
  
  const [user, setUser] = useState(null);
  const location = useLocation();

  // 1. Load User Data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  // 2. CLICK OUTSIDE LISTENER
  useEffect(() => {
    function handleClickOutside(event) {
      // If the dropdown is open AND the click happened OUTSIDE the dropdown container
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Unbind the event listener on cleanup (when component unmounts)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const userMenuItems = [
    { icon: Box, label: "My Orders", link: "/orders" },
    { icon: Heart, label: "Favorites", link: "/favorites" },
    { icon: CreditCard, label: "Payment Methods", link: "/wallet" },
    { icon: Settings, label: "Account Settings", link: "/settings" },
    { icon: HelpCircle, label: "Help & Support", link: "/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center gap-4">
        
        <div className="cursor-pointer hover:opacity-90 transition-opacity shrink-0">
          <Link to="/">
            <Logo /> 
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="flex w-full bg-gray-100/80 hover:bg-white rounded-full p-1.5 border border-transparent hover:border-orange-200 transition-all shadow-sm">
            <button className="flex items-center gap-2 px-4 text-sm font-bold text-gray-700 border-r border-gray-300 hover:text-orange-600 transition-colors">
              <MapPin size={16} className="text-orange-500" />
              <span>Lagos</span>
            </button>
            <div className="flex-1 flex items-center px-3">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search 'Jollof', 'Suya'..." 
                className="bg-transparent w-full outline-none text-sm ml-2 text-gray-700 placeholder-gray-400 font-medium"
              />
            </div>
            <button className="bg-[#FF5200] text-white rounded-full p-2.5 hover:bg-orange-600 transition-transform hover:scale-105 shadow-md">
              <Search size={16} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            // ATTACH THE REF HERE: This 'div' wraps both the button and the dropdown menu
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold uppercase">
                  {user.fullName ? user.fullName.substring(0, 2) : 'US'}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium">Hello,</p>
                  <p className="text-sm font-bold text-gray-800 leading-none truncate max-w-[100px]">
                    {user.fullName ? user.fullName.split(' ')[0] : 'User'}
                  </p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                  {userMenuItems.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.link} 
                      // Close menu when an item is clicked
                      onClick={() => setIsProfileOpen(false)} 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
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
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-700 font-bold hover:text-[#FF5200] transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="bg-[#FF5200] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 shadow-lg shadow-orange-200 transition-transform hover:-translate-y-0.5">
                Sign Up
              </Link>
            </div>
          )}

          <button className="relative bg-gray-900 text-white p-2.5 rounded-full hover:bg-gray-800 transition-transform hover:scale-105">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              0
            </span>
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
           <button className="relative text-gray-800">
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">0</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <div className="flex w-full bg-gray-100 rounded-lg p-2">
            <Search size={20} className="text-gray-400 ml-2" />
            <input type="text" placeholder="Search for food..." className="bg-transparent w-full outline-none ml-2 text-sm" />
          </div>

          {user ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg mb-2">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold">
                  {user.fullName ? user.fullName.substring(0, 2) : 'US'}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="text-sm font-bold text-gray-900">{user.fullName || 'User'}</p>
                </div>
              </div>
              {userMenuItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.link} 
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
                  className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg mt-2">
                <LogOut size={18} />
                <span className="text-sm font-bold">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link to="/login" className="w-full py-3 border border-gray-200 rounded-xl font-bold text-gray-700 text-center">
                Log In
              </Link>
              <Link to="/signup" className="w-full py-3 bg-[#FF5200] text-white rounded-xl font-bold shadow-md text-center">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;