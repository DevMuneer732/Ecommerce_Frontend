import React from 'react';
import { useFormik } from 'formik';
import { User, Home, Phone, Mail } from 'lucide-react';
import { CheckoutFormValues, checkoutValidationSchema } from '../../validation/checkoutSchema';

interface CheckoutFormProps {
    onSubmit: (values: CheckoutFormValues) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {

    const formik = useFormik<CheckoutFormValues>({
        initialValues: {
            fullName: '',
            streetAddress: '',
            phone: '',
            email: '',
        },
        validationSchema: checkoutValidationSchema,
        onSubmit: (values) => {
            onSubmit(values);
            console.log("personal details of user:", values);
            
        },
    });

    // Helper function for input styling
    const getInputClasses = (field: keyof CheckoutFormValues) => {
        const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
        if (formik.touched[field] && formik.errors[field]) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    return (
        <form id="checkout-form" onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        {...formik.getFieldProps('fullName')}
                        className={getInputClasses('fullName')}
                    />
                </div>
                {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-xs text-red-500 mt-1">{formik.errors.fullName}</div>
                ) : null}
            </div>

            {/* Street Address Field */}
            <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                </label>
                <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        id="streetAddress"
                        type="text"
                        placeholder="123 Main Street"
                        {...formik.getFieldProps('streetAddress')}
                        className={getInputClasses('streetAddress')}
                    />
                </div>
                {formik.touched.streetAddress && formik.errors.streetAddress ? (
                    <div className="text-xs text-red-500 mt-1">{formik.errors.streetAddress}</div>
                ) : null}
            </div>

            {/* Phone Number Field */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        id="phone"
                        type="tel"
                        placeholder="(+92) 300-1234567"
                        {...formik.getFieldProps('phone')}
                        className={getInputClasses('phone')}
                    />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-xs text-red-500 mt-1">{formik.errors.phone}</div>
                ) : null}
            </div>

            {/* Email Field (Optional) */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...formik.getFieldProps('email')}
                        className={getInputClasses('email')}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
                ) : null}
            </div>
        </form>
    );
};