import React, { useEffect } from 'react'; // <-- useEffect import karein
import { FormikProps } from 'formik';
import { User, Home, Phone, Mail } from 'lucide-react';
import { CheckoutPageValues } from '../../pages/checkOut';
import { useUserStore } from '../../store/user'; // <-- User store import karein

interface CheckoutFormProps {
    // Parent se Formik instance receive karein
    formik: FormikProps<CheckoutPageValues>;
}

// Helper function for input styling
const getInputClasses = (formik: FormikProps<CheckoutPageValues>, field: keyof CheckoutPageValues) => {
    const base = "w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 text-sm";
    if (formik.touched[field] && formik.errors[field]) {
        return `${base} border-red-500 focus:border-red-500 focus:ring-red-100`;
    }
    return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-100`;
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ formik }) => {

    // --- (FIX 1) ---
    // Store se 'user' object hasil karein
    const user = useUserStore((state) => state.user);

    // (FIX 2) Navigation logic yahan se hata dein.
    // Woh CheckoutPage.tsx mein chala gaya hai.

    // --- (FIX 3) ---
    // useEffect ka istemaal karein taake jab 'user' load ho, form update ho jaye
    useEffect(() => {
        // 'enableReinitialize' (jo parent mein set hai) 
        // ki wajah se initialValues update honay par Formik auto-update ho jayega.
        // Lekin hum yahan manually bhi kar saktay hain (zyada safe hai).
        if (user) {
            formik.setValues((values) => ({
                ...values, // Puranay values (like streetAddress) ko barqarar rakhein
                fullName: user.name || '', // Store se fullName set karein
                email: user.email || '',       // Store se email set karein
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Yeh effect tab chalay ga jab 'user' object load ya change hoga

    return (
        // The <form> tag ab parent (CheckoutPage) mein hai
        <div className="space-y-5">
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
                        className={getInputClasses(formik, 'fullName')}
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
                        className={getInputClasses(formik, 'streetAddress')}
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
                        className={getInputClasses(formik, 'phone')}
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
                        className={getInputClasses(formik, 'email')}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
                ) : null}
            </div>
        </div>
    );
};