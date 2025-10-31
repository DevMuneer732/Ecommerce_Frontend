import React, { useState, useEffect } from 'react';
import { Loader2, Lock } from 'lucide-react';
// --- IMPORT useLocation ---
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useCartStore, CartItem } from '../store/useCartStore';

import { PaymentMethodForm, PaymentMethod } from '../components/checkout/paymentMethodForm';
import {
    CheckoutFormValues,
    PaymentFormValues,
    checkoutValidationSchema,
    paymentValidationSchema
} from '../validation/checkoutSchema';
import { CheckoutForm } from '../components/checkout/checkOutForm';
import { CheckOutSummary } from '../components/checkout/checkOutSummary';

// This is the combined type for the single Formik instance
export type CheckoutPageValues = CheckoutFormValues & PaymentFormValues;

export const CheckOut: React.FC = () => {
    const navigate = useNavigate();

    // --- 1. Get location state ---
    const location = useLocation();
    // Safely get the buyNowItem from the state passed during navigation
    const locationBuyNowItem = (location.state as { buyNowItem: CartItem | null })?.buyNowItem || null;

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

    // Get data from the cart store
    const { items, clearCart } = useCartStore((state) => ({
        items: state.items,
        clearCart: state.clearCart,
    }));

    // --- 2. Determine which flow is active ---
    const isBuyNowFlow = !!locationBuyNowItem;
    const itemsToSubmit = isBuyNowFlow ? [locationBuyNowItem] : items;

    // --- 3. Local State for Totals ---
    // We must now calculate totals locally because the store won't manage the 'buyNowItem'
    const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, orderTotal: 0 });
    const taxRate = 0.08; // Assuming 8% tax, as defined in your store

    useEffect(() => {
        const itemsToCalculate = isBuyNowFlow ? [locationBuyNowItem!] : items;

        const sub = itemsToCalculate.reduce((total, item) => total + (item.price * item.quantity), 0);
        const ship = sub >= 100 ? 0.00 : 5.00;
        const tax = sub * taxRate;
        // NOTE: Coupon logic will need to be handled here now
        const total = Math.max(0, sub + ship + tax);

        setTotals({ subtotal: sub, shipping: ship, tax: tax, orderTotal: total });

    }, [items, locationBuyNowItem, isBuyNowFlow, taxRate]);


    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    // --- Formik Initialization ---
    const formik = useFormik<CheckoutPageValues>({
        initialValues: {
            fullName: '', streetAddress: '', phone: '', email: '',
            cardHolderName: '', cardNumber: '', expiryDate: '', cvc: '',
        },
        validationSchema: yup.object().shape({
            ...checkoutValidationSchema.fields,
            ...(paymentMethod === 'card' && paymentValidationSchema.fields),
        }),
        onSubmit: (values) => {
            handlePlaceOrder(values);
        },
    });

    const handlePlaceOrder = async (formData: CheckoutPageValues) => {
        setIsProcessing(true);
        console.log("--- PLACING ORDER ---");
        console.log("FORM DATA (Shipping & Payment):", JSON.stringify(formData, null, 2));
        console.log("CART ITEMS:", JSON.stringify(itemsToSubmit, null, 2));
        console.log("PAYMENT METHOD:", paymentMethod);
        console.log("FINAL TOTAL:", totals.orderTotal); // Use local total

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("--- ORDER SUCCESSFUL ---");

        // If it was a regular cart checkout, clear the cart.
        if (!isBuyNowFlow) {
            clearCart();
        }

        setIsProcessing(false);
        alert("Order placed successfully!");
        navigate('/'); // Navigate home after success
    };

    // --- Empty Cart Logic ---
    const isCartEmpty = items.length === 0 && !locationBuyNowItem;
    if (isCartEmpty && !isProcessing) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen text-center">
                <div className="p-10 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <a href="/shop" className="inline-block py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
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

            <div className="flex flex-col lg:flex-row lg:space-x-10">
                {/* --- Left Column: Form --- */}
                <form id="checkout-form" onSubmit={formik.handleSubmit} className="lg:w-2/3">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            1. Shipping Details
                        </h2>
                        <CheckoutForm formik={formik} />
                    </div>

                    <PaymentMethodForm
                        formik={formik}
                        selectedMethod={paymentMethod}
                        setSelectedMethod={setPaymentMethod}
                    />
                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={isProcessing || !formik.isValid}
                        className="w-full mt-6 py-4 px-4 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <Loader2 className="animate-spin mr-2" />
                        ) : (
                            <Lock size={20} className="mr-2" />
                        )}
                        {isProcessing ? 'Processing Order...' : `Place Order (${formatPrice(totals.orderTotal)})`}
                    </button>
                </form>

                {/* --- Right Column: Summary --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    {/* --- 4. Pass the location state item to the summary --- */}
                    <CheckOutSummary
                        buyNowItem={locationBuyNowItem}
                        // Pass local totals down
                        totals={totals}
                    />

                    {!formik.isValid && !isProcessing && (
                        <p className="text-xs text-red-500 text-center mt-2">
                            Please fill in all required fields to place your order.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};