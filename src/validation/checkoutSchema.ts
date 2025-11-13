import * as yup from 'yup';

// --- Shipping Details ---
export interface CheckoutFormValues {
    fullName: string;
    streetAddress: string;
    phone: string;
    email?: string; // Optional field
}

export const checkoutValidationSchema = yup.object<CheckoutFormValues>().shape({
    fullName: yup
        .string()
        .min(3, 'Full name must be at least 3 characters')
        .required('Full name is required'),
    streetAddress: yup
        .string()
        .min(10, 'Please enter a valid street address')
        .required('Street address is required'),
    phone: yup
        .string()
        .matches(/^(\+?\d{1,3}[- ]?)?\d{10,12}$/, 'Please enter a valid phone number')
        .required('Phone number is required'),
    email: yup
        .string()
        .transform((value) => (value === '' ? undefined : value))
        .email('Enter a valid email')
        .optional(),
});

// --- Payment Details ---
export interface PaymentFormValues {
    cardHolderName: string;
    cardNumber: string; // Use string for card numbers
    expiryDate: string;
    cvc: string; // Use string for CVC
}

export const paymentValidationSchema = yup.object<PaymentFormValues>().shape({
    cardHolderName: yup
        .string()
        .min(3, 'A valid name is required')
        .required('Card Holder Name is required'),
    cardNumber: yup
        .string()
        .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
        .required('Card Number is required'),
    expiryDate: yup
        .string()
        // Regex for MM/YY format
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Must be in MM/YY format (e.g., 05/28)')
        .required('Expiry Date is Required'),
    cvc: yup
        .string()
        .matches(/^[0-9]{3,4}$/, 'Must be 3 or 4 digits')
        .required('CVC Number is required')
});