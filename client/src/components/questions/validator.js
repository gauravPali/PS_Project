import * as yup from 'yup';

export const validator = yup.object().shape({
    body: yup.string().trim().required('Question is required.').min(5, 'Minimum 5 characters required.').max(250, 'Questions length exceeded.'),
    options: yup.array().of(yup.string().trim()).required('Four Options are required'),
    answers: yup.array().of(yup.string()).required('Answer(s) are required.')
})