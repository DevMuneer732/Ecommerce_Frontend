import React from 'react';
import { CartSection } from '../components/carts/cartSection';
import { CartSummary } from '../components/carts/cartSummary';


export const Cart: React.FC = () => {
    // REMOVED: All DUMMY_SUMMARY_DATA is now obsolete.
    // The CartSummary component gets its state (subtotal, shipping, tax)
    // directly from the useCartStore.

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">

            <div className="flex flex-col lg:flex-row lg:space-x-10">

    
                <CartSection />
                <CartSummary />
            </div>
        </div>
    );
};