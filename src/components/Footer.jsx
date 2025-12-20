import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo textColor="text-white" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering authentic Naija flavors to your doorstep. Fast, fresh,
              and reliable.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FF5200] cursor-pointer transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#FF5200] cursor-pointer transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  to="/help" // <--- CHANGED FROM STATIC TEXT TO LINK
                  className="hover:text-[#FF5200] cursor-pointer transition-colors"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/safety"
                  className="hover:text-[#FF5200] cursor-pointer transition-colors"
                >
                  Safety Center
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#FF5200] cursor-pointer transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Follow Us</h3>
            <div className="flex gap-4">
              <div className="bg-gray-800 p-2.5 rounded-full hover:bg-[#FF5200] transition-all cursor-pointer hover:scale-110">
                <Facebook size={18} />
              </div>
              <div className="bg-gray-800 p-2.5 rounded-full hover:bg-[#FF5200] transition-all cursor-pointer hover:scale-110">
                <Twitter size={18} />
              </div>
              <div className="bg-gray-800 p-2.5 rounded-full hover:bg-[#FF5200] transition-all cursor-pointer hover:scale-110">
                <Instagram size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FoodFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
