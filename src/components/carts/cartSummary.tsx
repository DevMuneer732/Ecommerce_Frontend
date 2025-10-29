import React, { useState } from 'react';
import { Tag } from 'lucide-react'; // Icon for coupon
import { useCartStore } from '../../store/useCartStore'; 

export const CartSummary: React.FC = () => {
    const {
        subtotal,
        shipping,
        orderTotal,
        taxRate,
        discountAmount,
        isCouponValid,
        couponCode,
        applyCoupon,
    } = useCartStore();

    const tax = subtotal * taxRate;

    // Local UI state for coupon input
    // Initialize input with current code if one exists
    const [couponInput, setCouponInput] = useState(couponCode || '');
    const [isApplying, setIsApplying] = useState(false);
    const [couponError, setCouponError] = useState('');

    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    const handleApplyCoupon = async () => {
        const code = couponInput.trim();
        if (!code) {
            setCouponError('Please enter a coupon code.');
            return;
        }

        setIsApplying(true);
        setCouponError('');

        // Call the store action which handles the mock API logic
        await applyCoupon(code);

        // After applying, check the updated store state for success/failure
        const storeState = useCartStore.getState();

        if (!storeState.isCouponValid && storeState.couponCode === code.toUpperCase()) {
            // This handles a failed validation attempt (API returned invalid)
            setCouponError('Invalid, expired, or already used coupon code.');
        } else {
            // Clear input on success
            setCouponInput('');
        }

        setIsApplying(false);
    };

    // Helper function for input styling based on error state
    const getInputClasses = (error: string) => {
        const base = "w-full py-2 px-3 border rounded-l-lg text-sm focus:outline-none focus:ring-1 transition";
        if (error) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    // If the coupon is valid, we want to show the code in the display area, not the input.
    const displayCode = isCouponValid ? couponCode : null;

    return (
        <div className="w-full lg:w-[35%] p-6 bg-white rounded-lg shadow-xl sticky top-4 lg:mt-14">

            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Coupon Code Input Area */}
            <div className="mb-4">
                <label className="text-xs font-semibold text-gray-700 block mb-1">Have a coupon?</label>
                <div className="flex">
                    <input
                        type="text"
                        placeholder={displayCode ? `Applied: ${displayCode}` : "Enter code"}
                        value={couponInput}
                        onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError(''); // Clear error on change
                        }}
                        className={getInputClasses(couponError)}
                        disabled={!!displayCode || isApplying} // Disable if code is already successfully applied
                    />
                    <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput.trim() || isApplying || !!displayCode}
                        className="flex items-center justify-center px-4 py-2 bg-blue text-white text-sm font-semibold rounded-r-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isApplying ? 'Applying...' : (
                            <>
                                <Tag size={16} className="mr-1" />
                                Apply
                            </>
                        )}
                    </button>
                </div>
                {couponError && (
                    <p className="text-xs text-red-500 mt-1">{couponError}</p>
                )}
                {isCouponValid && (
                    <p className="text-xs text-green-600 mt-1 font-medium flex justify-between">
                        <span>Coupon applied: **{couponCode}**</span>
                        <span className='font-bold'>- {formatPrice(discountAmount)}</span>
                    </p>
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
                    <span>Estimated Tax ({taxRate * 100}%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                </div>

                {/* Discount Line Item (Only visible if a discount is applied) */}
                {discountAmount > 0 && (
                    <div className="flex justify-between font-semibold text-red-600 border-b border-gray-200 pb-3">
                        <span>Discount ({couponCode})</span>
                        <span>- {formatPrice(discountAmount)}</span>
                    </div>
                )}

                {/* Spacer/Separator for consistency */}
                {discountAmount === 0 && <div className='border-b border-gray-200 pb-3'></div>}
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
