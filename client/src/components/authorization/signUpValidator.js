import * as yup from 'yup';

export default yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    password: yup.string().required('Password is required').min(6, 'Must be 6 character'),
    email: yup.string().email('Invalid Email Address').required('Email is required'),
})
