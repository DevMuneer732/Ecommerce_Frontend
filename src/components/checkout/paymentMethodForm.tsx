import React from 'react';
import { Banknote, Landmark, CreditCard, Check, Lock,User } from 'lucide-react';

// Define the available payment methods
export type PaymentMethod = 'cod' | 'bank' | 'card';

interface PaymentMethodFormProps {
    // Props to control the component from the parent (CheckoutPage)
    selectedMethod: PaymentMethod;
    setSelectedMethod: (method: PaymentMethod) => void;
}

// Helper component for the selection buttons
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

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ selectedMethod, setSelectedMethod }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                2. Payment Method
            </h2>

            {/* Payment Method Selector (As required by documentation) */}
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
            
            {/* 1. Cash on Delivery Instructions */}
            {selectedMethod === 'cod' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                    You will pay the courier in cash upon delivery of your order.
                </div>
            )}

            {/* 2. Bank Transfer Instructions */}
            {selectedMethod === 'bank' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2">
                    <p className="font-semibold">Please transfer the total amount to the following bank account:</p>
                    <p><strong>Bank:</strong> HBL Pakistan</p>
                    <p><strong>Account Name:</strong> ECOMMERCE PVT LTD</p>
                    <p><strong>IBAN:</strong> PK36 HABB 0012 3456 7890 1234</p>
                    <p className="text-xs text-red-600">Your order will be shipped after payment confirmation.</p>
                </div>
            )}

            {/* 3. Credit Card Form (Your original form, now styled) */}
            {selectedMethod === 'card' && (
                <div className="mt-6 space-y-4 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Enter Card Details</h3>
                    {/* NOTE: This is a DUMMY form. 
                      In a real app, you would use Stripe Elements or another secure payment gateway.
                      DO NOT handle raw credit card numbers directly.
                    */}
                    <div>
                        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" id="cardHolderName" placeholder="Full Name on Card" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input type="text" id="expiry" placeholder="MM / YY" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" id="cvc" placeholder="123" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

