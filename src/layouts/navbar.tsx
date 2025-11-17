/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { User, Heart, ShoppingCart, Search, Menu, X, LogOut, Lock, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useProductStore } from '../store/useProductStore';
import { useUserStore } from '../store/user';

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const setFilters = useProductStore((state) => state.setFilters);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isLoggedIn, logout, user } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm, page: 1 });
    navigate('/shop');
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const cartCount = useCartStore(state => state.items.length);
  const wishlistCount = useWishlistStore(state => state.wishlistIds.length);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 flex-shrink-0">
                <img src="/images/logo.png" alt="logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 transition-colors">
                ECOMMERCE
              </h1>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all text-sm"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>
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

            {/* User Icon & Dropdown (Desktop) */}
            <div className="hidden sm:block relative" ref={dropdownRef}>
              <button
                className={`transition-colors ${isLoggedIn ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`}
                aria-label="User account"
                onClick={() => {
                  if (isLoggedIn) {
                    setProfileDropdownOpen(!profileDropdownOpen);
                  } else {
                    navigate('/login');
                  }
                }}
              >
                <User className="w-5 h-5" />
              </button>

              {/* Desktop Dropdown Menu */}
              {isLoggedIn && profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Logged in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/change-password"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>

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
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">

            {/* Mobile Links */}
            <div className="border-t border-gray-200 pt-3 space-y-3">

              {/* Conditional Rendering for Mobile User Actions */}
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-500">
                    Hi, {user?.name}
                  </div>

                  <Link
                    to="/change-password"
                    className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center text-base font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login / Register
                </Link>
              )}

              <Link
                to="/wish"
                className="flex items-center text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;