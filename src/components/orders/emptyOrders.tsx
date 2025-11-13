import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyOrders: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
      <ShoppingBag className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">No Orders Yet</h2>
      <p className="mt-2">You haven't placed any orders.</p>
      <Link
        to="/shop"
        className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Start Shopping
      </Link>
    </div>
  );
};