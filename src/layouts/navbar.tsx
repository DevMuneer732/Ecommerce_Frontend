/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { User, Heart, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import both stores
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';


const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- Zustand Store Integration ---
  // 1. Select the total number of unique items (not total quantity) from the cart store
  const cartCount = useCartStore(state => state.items.length);
  
  // 2. Select the total number of items from the wishlist store
  const wishlistCount = useWishlistStore(state => state.wishlistIds.length);

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
              onClick={() => navigate('/login')} // Added navigation to login
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon (Now dynamic) */}
            <button
              className="hidden sm:block relative text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Wishlist"
              onClick={() => navigate('/wish')}
            >
              <Heart className="w-5 h-5" />
              {/* Renders badge only if count > 0 */}
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon (Now dynamic) */}
            <button
              className="relative text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Shopping cart"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Renders badge only if count > 0 */}
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
            {/* ... other mobile links ... */}
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <a
                href="/login" // Use href for standard link
                className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                onClick={(e) => { e.preventDefault(); navigate('/login'); setMobileMenuOpen(false); }}
              >
                <User className="w-5 h-5 mr-2" />
                My Account
              </a>
              <a
                href="/wish" // Use href for standard link
                className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                onClick={(e) => { e.preventDefault(); navigate('/wish'); setMobileMenuOpen(false); }}
              >
                <Heart className="w-5 h-5 mr-2" />
                {/* Dynamic count in mobile menu */}
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
