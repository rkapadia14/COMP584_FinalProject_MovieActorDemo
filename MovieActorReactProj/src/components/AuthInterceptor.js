import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AuthInterceptor = ({ authService }) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    let isMounted = true;

    //if (!authService.isAuthenticated()) {
      // If not authenticated, redirect to the login page

      //navigate('/login');
      //return;
    //}

    const interceptor = axios.interceptors.request.use(async (config) => {
      if (isMounted && authService && authService.getToken) {
        const token = authService.getToken();
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    const errorInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isMounted && authService && authService.logout && authService.isAuthenticated) {
          if (error.response && error.response.status === 401 && authService.isAuthenticated()) {
            authService.logout();
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      isMounted = false;
      axios.interceptors.request.eject(interceptor);
      axios.interceptors.response.eject(errorInterceptor);
    };
  }, [authService, navigate]);

  // This component doesn't render anything; it just sets up interceptors
  return null;
};

export default AuthInterceptor;
