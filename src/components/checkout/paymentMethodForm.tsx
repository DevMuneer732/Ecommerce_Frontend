import React from 'react';
import { Banknote, Landmark, CreditCard, Check, Lock, User } from 'lucide-react';
import { FormikProps } from 'formik'; // Import FormikProps
import { CheckoutPageValues } from '../../pages/checkOut';

// Define the available payment methods
export type PaymentMethod = 'cod' | 'bank' | 'card';

interface PaymentMethodFormProps {
    // Receive the main Formik instance from the parent
    formik: FormikProps<CheckoutPageValues>; 
    selectedMethod: PaymentMethod;
    setSelectedMethod: (method: PaymentMethod) => void;
}

// Helper component for the selection buttons (no changes)
const PaymentOption: React.FC<{
    title: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
}> = ({ title, icon, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
            isSelected
                ? 'border-blue-600 bg-blue-50 shadow-inner'
                : 'border-gray-200 bg-white hover:bg-gray-50'
        }`}
    >
        <div className="flex items-center space-x-3">
            {icon}
            <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {isSelected && <Check size={20} className="text-blue-600" />}
    </div>
);

// Helper function for input styling
const getInputClasses = (formik: FormikProps<CheckoutPageValues>, field: keyof CheckoutPageValues) => {
    const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
    // Check for nested keys if using a different structure (e.g., formik.touched.payment?.cardHolderName)
    if (formik.touched[field] && formik.errors[field]) {
        return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
    }
    return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
};

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ formik, selectedMethod, setSelectedMethod }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                2. Payment Method
            </h2>

            {/* Payment Method Selector */}
            <div className="space-y-4">
                <PaymentOption
                    title="Cash On Delivery (COD)"
                    icon={<Banknote size={20} className="text-green-600" />}
                    isSelected={selectedMethod === 'cod'}
                    onClick={() => setSelectedMethod('cod')}
                />
                <PaymentOption
                    title="Bank Transfer"
                    icon={<Landmark size={20} className="text-purple-600" />}
                    isSelected={selectedMethod === 'bank'}
                    onClick={() => setSelectedMethod('bank')}
                />
                <PaymentOption
                    title="Credit / Debit Card"
                    icon={<CreditCard size={20} className="text-blue-600" />}
                    isSelected={selectedMethod === 'card'}
                    onClick={() => setSelectedMethod('card')}
                />
            </div>

            {/* --- Conditional Content Based on Selection --- */}
            
            {selectedMethod === 'cod' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                    You will pay the courier in cash upon delivery of your order.
                </div>
            )}

            {selectedMethod === 'bank' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2">
                    <p className="font-semibold">Please transfer the total amount...</p>
                    <p><strong>Bank:</strong> HBL Pakistan</p>
                    <p><strong>IBAN:</strong> PK36 HABB 0012 3456 7890 1234</p>
                </div>
            )}

            {/* 3. Credit Card Form (Now wired to parent Formik) */}
            {selectedMethod === 'card' && (
                <div className="mt-6 space-y-4 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Enter Card Details</h3>
                    
                    {/* Card Holder Name */}
                    <div>
                        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="cardHolderName"
                                type="text"
                                placeholder="Full Name on Card"
                                {...formik.getFieldProps('cardHolderName')}
                                className={getInputClasses(formik, 'cardHolderName')}
                            />
                        </div>
                        {formik.touched.cardHolderName && formik.errors.cardHolderName ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.cardHolderName as string}</div>
                        ) : null}
                    </div>
                    
                    {/* Card Number */}
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="cardNumber"
                                type="text" 
                                placeholder="1234 5678 9012 3456"
                                {...formik.getFieldProps('cardNumber')}
                                className={getInputClasses(formik, 'cardNumber')}
                            />
                        </div>
                        {formik.touched.cardNumber && formik.errors.cardNumber ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.cardNumber as string}</div>
                        ) : null}
                    </div>
                    
                    {/* Expiry and CVC */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                id="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                {...formik.getFieldProps('expiryDate')}
                                className={getInputClasses(formik, 'expiryDate').replace('pl-10', 'pl-4')} // Adjust padding
                            />
                            {formik.touched.expiryDate && formik.errors.expiryDate ? (
                                <div className="text-xs text-red-500 mt-1">{formik.errors.expiryDate as string}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="cvc"
                                    type="text"
                                    placeholder="123"
                                    {...formik.getFieldProps('cvc')}
                                    className={getInputClasses(formik, 'cvc')}
                                />
                            </div>
                            {formik.touched.cvc && formik.errors.cvc ? (
                                <div className="text-xs text-red-500 mt-1">{formik.errors.cvc as string}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};