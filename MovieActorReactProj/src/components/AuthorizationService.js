import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const AuthorizationService = () => {
    const key = 'comp584-auth-token';
    const [authStatus, setAuthStatus] = useState(false);
    
    const apiUrl = config.apiUrl;
  
    useEffect(() => {
      if (isAuthenticated()) {
        setAuthStatus(true);
      }
    }, []);
  
    const getToken = () => {
      return localStorage.getItem(key);
    };
  
    const isAuthenticated = () => {
      return getToken() !== null;
    };
  
    const login = async (loginItem) => {
      console.log('AuthService - Login - Start');
      console.log('AuthService - Login - Login Item:', loginItem);
      console.log(apiUrl);
      const url = `${apiUrl}/Admin`;
      console.log(url);
  
      try {
        console.log('AuthService - Login - Making Request...');
        const response = await axios.post(url, loginItem);
        console.log('AuthService - Login - Response:', response);
  
        const loginResult = response.data;
        console.log('AuthService - Login - Result:', loginResult);
  
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(key, loginResult.token);
          console.log('AuthService - Login - Token Set:', loginResult.token);
          setAuthStatus(true);
        }
  
        console.log('AuthService - Login - End');
  
        return loginResult;
        
      } catch (error) {
        console.error('AuthService - Login - Error:', error);
        throw error; // Rethrow the error for the caller to handle
      }
    };
  
    const logout = () => {
      localStorage.removeItem(key);
      setAuthStatus(false);
    };
  
    return {
      getToken,
      isAuthenticated,
      login,
      logout,
      authStatus,
    };
  };
  
export default AuthorizationService;
