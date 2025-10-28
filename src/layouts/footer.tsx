import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Example icons for Contact section

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black mt-8 border-black border-t">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              E-commerce
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Curated collection of premium products, designed for a stylish and functional lifestyle.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Shop All</a></li>
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Collections</a></li>
            </ul>
          </div>

          {/* 3. Customer Service Column */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-900 transition duration-150">Track Order</a></li>
            </ul>
          </div>

          {/* 4. Contact Us Column (New for professional touch) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>support@ecommerce.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <span>123 Main St, Suite 400, City, Country</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-black">
          <p >© {new Date().getFullYear()} Ecommerce. All Rights Reserved.</p>
        </div>
      </div>

    </footer>
  );
};