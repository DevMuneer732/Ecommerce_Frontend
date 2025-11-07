import React from 'react';
import { Banknote, Check, } from 'lucide-react';
import { FormikProps } from 'formik'; // Import FormikProps
import { CheckoutPageValues } from '../../pages/checkOut';

// Define the available payment methods
export type PaymentMethod = 'cod';

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



export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ selectedMethod, setSelectedMethod }) => {
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
            </div>

            {/* --- Conditional Content Based on Selection --- */}
            
            {selectedMethod === 'cod' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                    You will pay the courier in cash upon delivery of your order.
                </div>
            )}

        </div>
    );
};