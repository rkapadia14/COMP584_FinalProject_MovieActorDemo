// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthorizationService from './AuthorizationService'; // Import the AuthService
import '../css/loginPage.css';

const Login = () => {
  const navigate = useNavigate();
  const authService = AuthorizationService(); // Note: use function invocation to create an instance
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResult = await authService.login({ username, password });

      if (loginResult.success) {
        toast.success('You have successfully logged in', {
          position: toast.POSITION.TOP_CENTER,
        });
        // Redirect to another route (replace '/dashboard' with your desired route)
        navigate('/actorList');
      } else {
        // Authentication failed, display the error message
        setErrorMessage(loginResult.message);
      }
    } catch (error) {
      // Handle other errors
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  // Rest of the component remains the same


  const handleLogout = () => {
    // Clear the token from local storage on logout
    
    authService.logout();
    console.log('Logged out successfully. Displaying toast...');
    toast.error('You have successfully logged out. Login to access content', {
      position: toast.POSITION.TOP_CENTER,
    });
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>
      <form className = "login-form" onSubmit={handleLogin}>
        <label className = "login-label" htmlFor="username">Username:</label>
        <input className='login-input'
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className = "login-label" htmlFor="password">Password:</label>
        <input className='login-input'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className = "login-button" type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      
        
    </div>
  );
};

export default Login;
