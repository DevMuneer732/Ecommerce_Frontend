import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Mail } from 'lucide-react';

import { ForgotPasswordSchema, EmailOnlyValues } from '../../validation/authSchemas'; 

export const ForgotPasswordForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitForm = async (values: EmailOnlyValues) => {
        setIsSubmitting(true);
        console.log("Forgot Password PAYLOAD:", JSON.stringify(values, null, 2));   
    };

    // Using the imported schema and type
    const formik = useFormik<EmailOnlyValues>({
        initialValues: { email: '' },
        validationSchema: ForgotPasswordSchema,
        onSubmit: handleSubmitForm,
    });

    const getInputClasses = (field: keyof EmailOnlyValues) => {
        const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
        if (formik.touched[field] && formik.errors[field]) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

                {/* Header/Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 flex-shrink-0">
                            <img src="/images/logo.png" alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            ECOMMERCE
                        </h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-sm text-gray-500 mt-1">We’ll send you a reset link.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter Your Email"
                                {...formik.getFieldProps('email')}
                                className={getInputClasses('email')}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !formik.isValid}
                        className="w-full mt-6 flex items-center justify-center space-x-2 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Processing...' : 'Send Reset Link'}
                    </button>
                </form>
                
                <p className="mt-4 text-center text-sm text-gray-600">
                    <a href="/login" className="font-semibold  transition duration-150">
                        Back to Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};
