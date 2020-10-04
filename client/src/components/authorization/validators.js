import * as yup from 'yup';

export const signUpValidator = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    password: yup.string().required('Password is required'),
})


export const loginValidator = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    password: yup.string().required('Password is required'),
})
