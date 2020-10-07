import axios from 'axios';
import store from './store';

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token && (config.url !== '/auth/login' || config.url !== '/auth/signup')) {
        config.headers.authorization = `Bearer ${token}`
    }
    console.log(`%c${JSON.stringify(config, null, "\t")}`, `background:black; font-weight:bold; font-size:15px; color:white;`);
    return config;
})

export const auth = {
    signUpAPI: (payload) => {
        return instance.post('/auth/register', payload);
    },

    loginAPI: (payload) => {
        return instance.post('/auth/login', payload);
    },

    getUserAPI: () => {
        return instance.get('/auth/user');
    }
}

export const question = {
    saveQuestion: (payload) => {
        return instance.post('/question', payload);
    },

    getQuestionsByOffset: (pageNo) => {
        return instance.get('/question', {
            params: {
                pageNo:pageNo,
                offSet:3
            }
        });
    },

    toggleState : (params) => {
        return instance.put('/question/toggle',{ params});
    }
}