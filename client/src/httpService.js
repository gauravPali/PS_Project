import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'http://localhost:8081',
})

export const signUpAPI = (payload) => {
    return axiosService.post('/auth/register', payload);
}

export const loginAPI = (payload) => {
    return axiosService.post('/auth/login', payload);
}