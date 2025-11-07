import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUserStore } from '../store/user';
import { useCartStore, CartItem } from '../store/useCartStore';
import { PaymentFormValues } from '../validation/checkoutSchema';
import { PaymentMethodForm, PaymentMethod } from '../components/checkout/paymentMethodForm';
import {
    CheckoutFormValues, checkoutValidationSchema,
} from '../validation/checkoutSchema';
import { CheckoutForm } from '../components/checkout/checkOutForm';
import { CheckOutSummary } from '../components/checkout/checkOutSummary';
import { orderService } from '../services/orderService';
import { isAxiosError } from 'axios';
import { paymentValidationSchema } from '../validation/checkoutSchema';
export type CheckoutPageValues = CheckoutFormValues & PaymentFormValues

export const CheckOut: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- Data Handling ---
    const locationBuyNowItem = (location.state as { buyNowItem: CartItem | null })?.buyNowItem || null;
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod'); // Default to COD
    const [formError, setFormError] = useState(''); // Naya state error k liye

    // --- Store Data ---
    const {
        items,
        clearCart,
        couponCode, // Coupon code bhi get karein
        discountAmount, // Discount amount bhi get karein
        taxRate
    } = useCartStore((state) => ({
        items: state.items,
        clearCart: state.clearCart,
        couponCode: state.couponCode,
        discountAmount: state.discountAmount,
        taxRate: state.taxRate,
    }));

    // --- Flow & Totals Calculation ---
    const isBuyNowFlow = !!locationBuyNowItem;
    const itemsToSubmit = isBuyNowFlow ? [locationBuyNowItem] : items;

    const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, orderTotal: 0 });

    useEffect(() => {
        const sub = itemsToSubmit.reduce((total, item) => total + (item.price * item.quantity), 0);
        const ship = sub >= 100 ? 0.00 : 5.00;
        const tax = sub * taxRate;
        // (FIX 2) Totals calculate kartay waqt 'discountAmount' ko store se lein
        const total = Math.max(0, sub + ship + tax - discountAmount);
        setTotals({ subtotal: sub, shipping: ship, tax: tax, orderTotal: total });

    }, [itemsToSubmit, taxRate, discountAmount]); // 'discountAmount' par depend karein


    const formatPrice = (p: number) => `$${p.toFixed(2)}`;

    // --- Formik Initialization ---
    const formik = useFormik<CheckoutPageValues>({
        initialValues: {
            fullName: useUserStore.getState().user?.name || '',
            streetAddress: '',
            phone: '',
            email: useUserStore.getState().user?.email || '',
            cardHolderName: '', cardNumber: '', expiryDate: '', cvc: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            ...checkoutValidationSchema.fields,
            ...(paymentMethod === 'cod' && paymentValidationSchema.fields),
        }),
        onSubmit: (values) => {
            handlePlaceOrder(values);
        },
    });

    // --- (FIX 3) Updated handlePlaceOrder ---
    const handlePlaceOrder = async (formData: CheckoutPageValues) => {
        setIsProcessing(true);
        setFormError(''); // Error reset karein

        try {
            // Order service ko call karein
            await orderService.placeOrder(
                formData,
                itemsToSubmit,
                couponCode, // Coupon code pass karein
                isBuyNowFlow
            );

            console.log("--- ORDER SUCCESSFUL ---");

            // Sirf regular cart flow mein cart clear karein
            if (!isBuyNowFlow) {
                clearCart();
            }

            setIsProcessing(false);
            alert("Order placed successfully!");
            navigate('/'); // Home page par redirect karein

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

    // --- Empty Cart Logic ---
    if (items.length === 0 && !locationBuyNowItem && !isProcessing) {
        // ... (Empty cart JSX) ...
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
                </form>

                {/* --- Right Column: Summary --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <CheckOutSummary
                        buyNowItem={locationBuyNowItem}
                        totals={totals}
                    />

                    {/* API Error Message */}
                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mt-4">
                            <p>{formError}</p>
                        </div>
                    )}


                    {!formik.isValid && !isProcessing && (
                        <p className="text-xs text-red-500 text-center mt-2">
                            Please fill in all required fields.
                        </p>
                    )}
                </div>
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
            </div>
        </div>
    );
};