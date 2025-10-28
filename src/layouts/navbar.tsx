/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { User, Heart, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useThemeChooser } from '../contexts/theme-chooser';
import { ThemeChooser } from '../components/shared/theme-chooser';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { toggle } = useThemeChooser();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState<number>(3);
  const [wishlistCount] = useState<number>(5);
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 flex-shrink-0">
                <img src="/images/logo.png" alt="logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 transition-colors">
                ECOMMERCE
              </h1>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/shop"
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors relative group"
            >
              Shop Now
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="/collection"
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors relative group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* <a
              href="#new"
              className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors relative group"
            >
              New Arrivals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
            </a> */}
            {/* <a
              href="#sale"
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors relative group"
            >
              Sale
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </a> */}
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">

            <button
              onClick={toggle}
              className='lg:hidden text-gray-700 hover:text-amber-600 transition-colors'
            >
              <ThemeChooser />
            </button>
            {/* Search Icon (Mobile/Tablet) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden text-black hover:text-amber-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Icon */}
            <button
              className="hidden sm:block text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              className="hidden sm:block relative text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Wishlist"
              onClick={() => navigate('/wish')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              className="relative text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Shopping cart"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden py-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#shop"
              className="block text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              Shop Now
            </a>
            <a
              href="#collections"
              className="block text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              Collections
            </a>
            <a
              href="#new"
              className="block text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              New Arrivals
            </a>
            <a
              href="#sale"
              className="block text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              Sale
            </a>
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <a
                href="#account"
                className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <User className="w-5 h-5 mr-2" />
                My Account
              </a>
              <a
                href="#wishlist"
                className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist ({wishlistCount})
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
