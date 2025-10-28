import React, { useState } from 'react';
import { Tag } from 'lucide-react'; // Icon for coupon

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shipping, tax }) => {
    const [couponInput, setCouponInput] = useState('');
    const [discount, setDiscount] = useState(0); // State to hold applied discount amount
    const [couponError, setCouponError] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    // Calculate the total, subtracting the discount
    const orderTotal = Math.max(0, subtotal + shipping + tax - discount);
    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    const handleApplyCoupon = () => {
        setCouponError('');
        setDiscount(0);
        setCouponApplied(false);
        
        const code = couponInput.trim().toUpperCase();

        // --- Dummy Coupon Logic ---
        if (code === 'SAVE20') {
            const calculatedDiscount = subtotal * 0.20; // 20% off subtotal
            setDiscount(calculatedDiscount);
            setCouponApplied(true);
            setCouponInput('');
        } else if (code === 'FREE5') {
            const fixedDiscount = 5.00; // $5 fixed discount
            setDiscount(fixedDiscount);
            setCouponApplied(true);
            setCouponInput('');
        } else if (code) {
            setCouponError('Invalid coupon code. Try SAVE20 or FREE5.');
        }
    };

    // Helper function for input styling based on error state
    const getInputClasses = (error: string) => {
        const base = "w-full py-2 px-3 border rounded-l-lg text-sm focus:outline-none focus:ring-1 transition";
        if (error) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    return (
        <div className="w-full lg:w-[35%] p-6 bg-white rounded-lg shadow-xl sticky top-4 lg:mt-14">
            
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Coupon Code Input Area */}
            <div className="mb-4">
                <label className="text-xs font-semibold text-gray-700 block mb-1">Have a coupon?</label>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className={getInputClasses(couponError)}
                        disabled={couponApplied}
                    />
                    <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput.trim() || couponApplied}
                        className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-r-lg hover:bg-gray-300 transition duration-200 disabled:opacity-50"
                    >
                        <Tag size={16} className="mr-1" />
                        Apply
                    </button>
                </div>
                {couponError && (
                    <p className="text-xs text-red-500 mt-1">{couponError}</p>
                )}
                {couponApplied && (
                    <p className="text-xs text-green-600 mt-1 font-medium">Coupon applied successfully!</p>
                )}
            </div>

            {/* Price Details */}
            <div className="space-y-1 text-gray-700 text-sm border-t pt-3">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                {/* Discount Line Item */}
                <div className="flex justify-between font-semibold text-green-600 border-b border-gray-200 pb-3">
                    <span>Discount</span>
                    <span>- {formatPrice(discount)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-gray-900">Order Total</span>
                <span className="text-xl font-extrabold text-gray-900">{formatPrice(orderTotal)}</span>
            </div>
            
            {/* Checkout Button */}
            <button
                className="w-full mt-4 py-3 px-4 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => console.log('Proceed to Checkout')}
            >
                Proceed to Checkout
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
