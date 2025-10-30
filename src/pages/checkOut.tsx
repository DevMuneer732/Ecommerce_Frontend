import React, { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
// Import the form and summary components
import { CheckoutFormValues } from '../validation/checkoutSchema';
import { useCartStore } from '../store/useCartStore'; // To check if cart is empty
import { CheckoutForm } from '../components/checkout/checkOutForm';
import { CheckOutSummary } from '../components/checkout/checkOutSummary';
// --- Import the type and component ---
import { PaymentMethodForm, PaymentMethod } from '../components/checkout/PaymentMethodForm';

export const CheckOut: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    // --- NEW: State for selected payment method ---
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card'); // Default to 'card'

    // Get the items array and clearCart action from the store
    const { items, clearCart, orderTotal } = useCartStore((state) => ({
        items: state.items,
        clearCart: state.clearCart,
        orderTotal: state.orderTotal,
    }));

    // --- NEW: Helper function for formatting price ---
    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    // This handler receives the validated data from the Formik form
    const handlePlaceOrder = async (formData: CheckoutFormValues) => {
        setIsProcessing(true);
        console.log("--- PLACING ORDER ---");
        console.log("FORM DATA:", JSON.stringify(formData, null, 2));
        console.log("CART ITEMS:", JSON.stringify(items, null, 2));
        console.log("PAYMENT METHOD:", paymentMethod); // <-- Logs the selected method
        console.log("FINAL TOTAL:", orderTotal);

        // --- Mock API Call ---
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("--- ORDER SUCCESSFUL ---");
        clearCart();
        setIsProcessing(false);

        alert("Order placed successfully!");
    };

    // If cart is empty, don't show checkout form
    if (items.length === 0 && !isProcessing) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen text-center">
                <div className="p-10 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-6">You can't proceed to checkout without any items in your cart.</p>
                    <a
                        href="/shop"
                        className="inline-block py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Return to Shop
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
                Secure Checkout
            </h1>

            {/* Two-Column Layout */}
            <div className="flex flex-col lg:flex-row lg:space-x-10">

                {/* --- Left Column: Form --- */}
                <div className="lg:w-2/3">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            1. Shipping Details
                        </h2>
                        <CheckoutForm onSubmit={handlePlaceOrder} />
                    </div>

                    {/* Payment Section */}
                    {/* UPDATED: Pass state and setter to the component */}
                    <PaymentMethodForm
                        selectedMethod={paymentMethod}
                        setSelectedMethod={setPaymentMethod}
                    />
                </div>

                {/* --- Right Column: Summary --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <CheckOutSummary />

                    {/* The "Place Order" button */}
                    {/* UPDATED: Un-commented the button */}
                    <button
                        type="submit"
                        form="checkout-form" // This links to the <form> in CheckoutForm.tsx
                        disabled={isProcessing}
                        className="w-full mt-6 py-4 px-4 bg-blue text-white text-lg font-bold rounded-lg hover:bg-green-700 transition duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <Loader2 className="animate-spin mr-2" />
                        ) : (
                            <Lock size={20} className="mr-2" />
                        )}
                        {isProcessing ? 'Processing Order...' : `Place Order (${formatPrice(orderTotal)})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

