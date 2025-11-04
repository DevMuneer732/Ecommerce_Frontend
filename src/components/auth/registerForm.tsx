import React, { useState } from 'react';
// Assuming these libraries are available
import { useFormik } from 'formik';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { RegisterSchema, RegisterValues } from '../../validation/authSchemas';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';


export const RegisterForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const registerAction = useUserStore(state => state.register)
    const navigate = useNavigate();


    const handleSubmitForm = async (values: RegisterValues) => {
        setIsSubmitting(true);
        setFormError('');
        setSuccessMessage('');

        try {
            await registerAction(values);

            setSuccessMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login', {
                    state: {
                        email: values.email,
                        password: values.password
                    }
                });
            }, 1500);

        } catch (error) {
            if (isAxiosError(error)) {
                setFormError(error.response?.data?.message || 'Registration failed. Please try again.');
            } else {
                setFormError('An unknown error occurred.');
                console.error(error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik<RegisterValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: handleSubmitForm,
    });


    const getInputClasses = (field: keyof RegisterValues) => {
        const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
        if (formik.touched[field] && formik.errors[field]) {
            return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
        }
        return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

                {/* Header/Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    {/* Logo (Ensured correct alignment and size) */}
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 flex-shrink-0">
                            <img src="/images/logo.png" alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            ECOMMERCE
                        </h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
                    <p className="text-sm text-gray-500 mt-1">Where your shopping journey begins</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Full Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Your Name"
                                {...formik.getFieldProps('name')}
                                className={getInputClasses('name')}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.name}</div>
                        ) : null}
                    </div>

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

                    {/* Password Field with Toggle */}
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

                    {/* Confirm Password Field with Toggle */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Enter your confirm password"
                                {...formik.getFieldProps('confirmPassword')}
                                className={`${getInputClasses('confirmPassword')} pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-xs text-red-500 mt-1">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    {/* Error and Success Messages */}
                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                            <p>{formError}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg text-sm">
                            <p>{successMessage}</p>
                            <p className="mt-1 font-medium">Check your browser console for the JSON payload.</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !formik.isValid}
                        className="w-full mt-6 flex items-center justify-center space-x-2 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            'Processing...'
                        ) : (
                            <>
                                <span>Create Account</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition duration-150">
                        LogIn
                    </a>
                </p>
            </div>
        </div>
    );
};
