import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { LoginSchema, LoginValues } from '../../validation/authSchemas';

interface LoginFormValues extends LoginValues { }

export const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitForm = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        console.log("Login PAYLOAD:", JSON.stringify(values, null, 2));
        setIsSubmitting(false);
    };

    const formik = useFormik<LoginFormValues>({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: handleSubmitForm,
    });


    const getInputClasses = (field: keyof LoginFormValues) => {
        const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
        if (formik.touched[field] && formik.errors[field]) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 flex-shrink-0">
                            <img src="/images/logo.png" alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            ECOMMERCE
                        </h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                    <p className="text-sm text-gray-500 mt-1">Your secure gateway to the DoorBix experience</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

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

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                                className={`${getInputClasses('password')} pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !formik.isValid}
                        className="w-full mt-6 flex items-center justify-center space-x-2 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Processing...' : 'Sign In'}
                    </button>
                </form>

                <div className='flex justify-between mt-5'>
                    <p className="text-sm text-gray-600">
                        Not have an account?{' '}
                        <a href="/register" className="font-semibold  transition duration-150">
                            Create Account
                        </a>
                    </p>
                    <p className='text-sm text-gray-600 font-semibold '>
                        <a href="/forgot-password" className="transition duration-150">
                            Forgot Password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
