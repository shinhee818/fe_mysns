import React from 'react';
import axios from "axios";

const authInstance = axios.create({
    baseURL: process.env.REACT_APP_IP_ADDRESS
})

authInstance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default authInstance;