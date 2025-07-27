import axios from 'axios';
import React from 'react';

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL:'https://united-pets-server.vercel.app/'
    })
    return  axiosInstance;
};

export default useAxios;