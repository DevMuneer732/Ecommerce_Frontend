import React, { useState } from 'react';
import { Tag, Loader2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

/**
 * This component is the FULL summary for the /checkout page.
 * It dynamically displays ALL items in the cart (for both "Buy Now" and "Full Cart" flows)
 * and includes the coupon code section.
 */
export const CheckOutSummary: React.FC = () => {
    // --- Get ALL data from the Zustand Store ---
    const {
        items, // The list of products in the cart
        buyNowItem, // Single item for buy now flow
        subtotal,
        shipping,
        orderTotal,
        taxRate,
        discountAmount,
        isCouponValid,
        couponCode,
        applyCoupon,
    } = useCartStore();

    // Calculate tax based on current subtotal
    const tax = subtotal * taxRate;
    
    // Local UI state for coupon input
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
        
        await applyCoupon(code); 
        
        const storeState = useCartStore.getState();
        if (!storeState.isCouponValid && storeState.couponCode === code.toUpperCase()) {
            setCouponError('Invalid, expired, or already used coupon code.');
        } else {
             setCouponInput(''); // Clear input on success
        }
        
        setIsApplying(false);
    };
    
    // Helper for input styling
    const getInputClasses = (error: string) => {
        const base = "w-full py-2 px-3 border rounded-l-lg text-sm focus:outline-none focus:ring-1 transition";
        if (error) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    const displayCode = isCouponValid ? couponCode : null;

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-xl sticky top-24">
            
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                {buyNowItem ? 'Quick Checkout' : 'Order Summary'}
            </h2>

            {/* --- 1. ITEM LIST SECTION --- */}
            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {/* This max-h makes the list scrollable if it's too long */}
                <div className="max-h-64 overflow-y-auto pr-2">
                    {buyNowItem ? (
                        <div className="flex items-center py-4">
                            <img 
                                src={buyNowItem.imageUrl} 
                                alt={buyNowItem.title}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                            />
                            <div className="ml-4 flex-grow">
                                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{buyNowItem.title}</p>
                                <p className="text-xs text-gray-500">Size: {buyNowItem.selectedSize}</p>
                                <p className="text-xs text-gray-500">Qty: {buyNowItem.quantity || 1}</p>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                {formatPrice(buyNowItem.price * (buyNowItem.quantity || 1))}
                            </div>
                        </div>
                    ) : items && items.length > 0 ? (
                        items.map(item => (
                            <div key={item.variantId} className="flex items-center py-4">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                                />
                                <div className="ml-4 flex-grow">
                                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</p>
                                    <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-500 text-sm">Your cart is empty</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- 2. COUPON CODE INPUT --- */}
            <div className="mt-4 mb-4">
                <label className="text-sm font-semibold text-gray-700 block mb-2">Have a coupon?</label>
                <div className="flex">
                    <input
                        type="text"
                        placeholder={displayCode ? `Applied: ${displayCode}` : "Enter code"}
                        value={couponInput}
                        onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError(''); 
                        }}
                        className={getInputClasses(couponError)}
                        disabled={!!displayCode || isApplying}
                    />
                    <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput.trim() || isApplying || !!displayCode}
                        className="flex items-center justify-center px-4 py-2 bg-blue text-white text-sm font-semibold rounded-r-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isApplying ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
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
                    <p className="text-xs text-green-600 mt-1 font-medium">
                        Coupon applied successfully!
                    </p>
                )}
            </div>

            {/* --- 3. FINANCIAL TOTALS --- */}
            <div className="space-y-2 text-gray-700 text-sm border-t pt-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax ({taxRate * 100}%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                {discountAmount > 0 && (
                    <div className="flex justify-between font-semibold text-red-600 border-t border-gray-200 pt-2">
                        <span>Discount ({couponCode})</span>
                        <span>- {formatPrice(discountAmount)}</span>
                    </div>
                )}
            </div>

            {/* --- Order Total --- */}
            <div className="flex justify-between items-center mt-4 border-t border-gray-300 pt-4">
                <span className="text-lg font-bold text-gray-900">Order Total</span>
                <span className="text-xl font-extrabold text-gray-900">{formatPrice(orderTotal)}</span>
            </div>
            
        </div>
    );
};

