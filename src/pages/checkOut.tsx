// src/pages/CheckOut.tsx

import * as yup from 'yup';
import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUserStore } from '../store/user';
import { useCartStore, CartItem } from '../store/useCartStore';
import { PaymentMethodForm, PaymentMethod } from '../components/checkout/paymentMethodForm';
import {
    CheckoutFormValues, checkoutValidationSchema,
} from '../validation/checkoutSchema';
import { CheckoutForm } from '../components/checkout/checkOutForm';
import { CheckOutSummary } from '../components/checkout/checkOutSummary';
import { orderService } from '../services/orderService';
import { isAxiosError } from 'axios';
// --- 1. Naya shadcn dialog import karein ---
import { OrderSuccessDialog } from '../components/checkout/OrderSucessDialog';

export type CheckoutPageValues = CheckoutFormValues;

export const CheckOut: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- 2. Dialog ke liye state add karein ---
    const [isProcessing, setIsProcessing] = useState(false);
    const [formError, setFormError] = useState('');
    const [isOrderSuccess, setIsOrderSuccess] = useState(false); // <-- YEH LINE ADD KAREIN

    // ... (Baaki saara code (user, login check, cart logic, totals, formik) wesa hi rahega ...)
    const user = useUserStore((state) => state.user);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    // --- Login Check ---
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // --- Data Handling ---
    const locationBuyNowItem = (location.state as { buyNowItem: CartItem | null })?.buyNowItem || null;
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const couponCode = useCartStore((state) => state.couponCode);
    const discountAmount = useCartStore((state) => state.discountAmount);
    const taxRate = useCartStore((state) => state.taxRate);

    const isBuyNowFlow = !!locationBuyNowItem;
    const itemsToSubmit = useMemo(() =>
        isBuyNowFlow ? [locationBuyNowItem!] : items,
        [isBuyNowFlow, locationBuyNowItem, items]
    );

    const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, orderTotal: 0 });

    useEffect(() => {
        const sub = itemsToSubmit.reduce((total, item) => total + (item.price * item.quantity), 0);
        const ship = sub >= 100 ? 0.00 : 5.00;
        const tax = sub * taxRate;
        const total = Math.max(0, sub + ship + tax - discountAmount);
        setTotals({ subtotal: sub, shipping: ship, tax: tax, orderTotal: total });
    }, [itemsToSubmit, taxRate, discountAmount]);

    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    const formik = useFormik<CheckoutPageValues>({
        initialValues: {
            fullName: user?.name || '',
            streetAddress: '',
            phone: '',
            email: user?.email || '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            ...checkoutValidationSchema.fields,
        }),
        onSubmit: (values) => {
            handlePlaceOrder(values);
        },
    });

    // --- 3. handlePlaceOrder ko update karein ---
    const handlePlaceOrder = async (formData: CheckoutPageValues) => {
        setIsProcessing(true);
        setFormError('');

        try {
            await orderService.placeOrder(
                formData,
                itemsToSubmit,
                couponCode,
                isBuyNowFlow
            );

            console.log("--- ORDER SUCCESSFUL ---");

            if (!isBuyNowFlow) {
                clearCart();
            }

            setIsProcessing(false);

            // --- YEH HAIN CHANGES ---
            // alert("Order placed successfully!"); // <-- Isay hatayein
            // navigate('/');                    // <-- Isay hatayein

            setIsOrderSuccess(true); // <-- Modal ko trigger karein
            // --- END CHANGES ---

        } catch (error) {
            console.error("Place Order Error:", error);
            if (isAxiosError(error)) {
                setFormError(error.response?.data?.message || 'Failed to place order.');
            } else {
                setFormError('An unknown error occurred.');
            }
            setIsProcessing(false);
        }
    };

    // ... (Empty Cart Logic wesa hi rahega) ...
    if (items.length === 0 && !locationBuyNowItem && !isProcessing) {
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

            {/* --- 4. Modal ko render karein --- */}
            <OrderSuccessDialog
                isOpen={isOrderSuccess}
                onOpenChange={setIsOrderSuccess}
            />

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

                    {/* API Error Message */}
                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mt-8">
                            <p>{formError}</p>
                        </div>
                    )}

                    {/* Place Order button */}
                    <button
                        type="submit"
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
                    {!formik.isValid && !isProcessing && (
                        <p className="text-xs text-red-500 text-center mt-2">
                            Please fill in all required fields.
                        </p>
                    )}
                </form>

                {/* --- Right Column: Summary --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <CheckOutSummary
                        buyNowItem={locationBuyNowItem}
                        totals={totals}
                    />
                </div>
            </div>
        </div>
    );
};