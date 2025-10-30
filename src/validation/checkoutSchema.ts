import * as yup from 'yup';

// Define the shape of the checkout form values
export interface CheckoutFormValues {
    fullName: string;
    streetAddress: string;
    phone: string;
    email?: string; // Optional field
}

// Define the validation schema
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
        .email('Enter a valid email')
    // Email is optional, so no .required()
});