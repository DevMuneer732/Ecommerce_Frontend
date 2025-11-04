import * as yup from 'yup';

export interface EmailOnlyValues {
    email: string;
}

export interface LoginValues extends EmailOnlyValues {
    password: string;
}

export interface RegisterValues extends LoginValues {
    name: string;
    confirmPassword: string;
}


const emailValidation = yup
    .string()
    .email('Enter a valid email')
    .required('Email is required');

const passwordValidation = yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .required('Password is required');


/** 1. Schema for Forgot Password Form */
export const ForgotPasswordSchema = yup.object<EmailOnlyValues>().shape({
    email: emailValidation,
});


/** 2. Schema for Login Form */
export const LoginSchema = yup.object<LoginValues>().shape({
    email: emailValidation,
    password: passwordValidation,
});


/** 3. Schema for Registration Form */
export const RegisterSchema = yup.object<RegisterValues>().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});
