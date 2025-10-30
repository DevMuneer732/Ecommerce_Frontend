import React from 'react';
import { useCartStore } from '../../store/useCartStore'; // Import the full store
import { useNavigate } from 'react-router-dom';

export const CartSummary: React.FC = () => {
    const subtotal = useCartStore(state => state.subtotal);
    const totalItems = useCartStore(state => state.items.length);
    const navigate = useNavigate();

    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    return (
        <div className="w-full lg:w-[35%] p-6 bg-white rounded-lg shadow-xl sticky top-4 lg:mt-14">

            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-gray-700 text-sm border-t pt-3">
                <div className="flex justify-between text-base">
                    <span className='font-medium'>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-bold text-xl text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-gray-500 pt-2">
                    Shipping, Tax & Discounts calculated at checkout.
                </p>
            </div>

            {/* Checkout Button */}
            <button
                className="w-full mt-4 py-3 px-4 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate('/checkout')} // Navigates to the page with the full summary
            >
                Checkout
            </button>

            {/* Payment Icons Section (Minimal) */}
            <div className="mt-4 text-center border-t pt-3">
                <p className="text-xs text-gray-500 mb-2 font-medium">Secure payments with:</p>
                <div className="flex justify-center space-x-3">
                    <span className="w-10 h-6"><img src="/images/visa.png" alt='Visa' className="object-contain w-full h-full" /></span>
                    <span className="w-10 h-6"><img src="/images/card.png" alt="Credit Card" className="object-contain w-full h-full" /></span>
                    <span className="w-10 h-6"><img src='/images/paypal.png' alt='PayPal' className="object-contain w-full h-full" /></span>
                </div>
            </div>
        </div>
    );
};