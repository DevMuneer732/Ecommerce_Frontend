// src/pages/Cart.tsx (FINAL PAGE LAYOUT)

import { CartSection } from '../components/carts/cartSection';
import { CartSummary } from '../components/carts/cartSummary';


// Dummy data for the summary (derived from the DUMMY_CART_ITEMS for calculation)
const CART_SUBTOTAL = 29.99 + 159.99 + 89.50; // $279.48
const DUMMY_SUMMARY_DATA = {
    subtotal: CART_SUBTOTAL,
    shipping: 5.00,
    tax: 22.36,
};


export const Cart = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">

            {/* Two-Column Layout: Cart Items (Left) and Summary (Right) */}
            <div className="flex flex-col lg:flex-row lg:space-x-10">

                {/* Left Column: Cart Items (Now 65% width on large screens) */}
                <CartSection />

                {/* Right Column: Order Summary (Now 35% width on large screens) */}
                <CartSummary {...DUMMY_SUMMARY_DATA} />
            </div>
        </div>
    );
};