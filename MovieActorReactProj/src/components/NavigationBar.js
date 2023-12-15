// NavigationBar.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthorizationService from './AuthorizationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../css/navigationBar.css'; // Update the import path

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authService = AuthorizationService();

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsLoggedIn(authService.isAuthenticated());
    };

    // Set initial authStatus
    updateAuthStatus();

    // Subscribe to authStatus changes
    const intervalId = setInterval(updateAuthStatus, 1000);

    // Cleanup subscription on unmount
    return () => clearInterval(intervalId);
  }, [authService]);

  const handleLogout = () => {
    console.log('Logged out successfully. Displaying toast...');
    toast.error('You have successfully logged out. Login to access content', {
      position: toast.POSITION.TOP_CENTER,
    });
    authService.logout();
  };


  return (
    <div>
      <div className="project-name-bar">
        <h1>Movie Actor Project</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/actorList" className="nav-link" activeClassName="active">
              Actor Details
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/searchItem" className="nav-link" activeClassName="active">
              Search Your Content
            </NavLink>
          </li>
          
          </ul>
          <div className="login-section">
            <ToastContainer/>
          {isLoggedIn ? (
            // If authenticated, display Logout button
            <NavLink to="/login" onClick={handleLogout} className="nav-link">
              Logout
            </NavLink>
          ) : (
            // If not authenticated, display Login link
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );

};
export default NavigationBar;


// NavigationBar.js

/*import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from './AuthService'; // Import the AuthService
import '../css/navigationBar.css'; // Update the import path

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authService = AuthService();

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsLoggedIn(authService.isAuthenticated());
    };

    // Set initial authStatus
    updateAuthStatus();

    // Subscribe to authStatus changes
    const intervalId = setInterval(updateAuthStatus, 1000);

    // Cleanup subscription on unmount
    return () => clearInterval(intervalId);
  }, [authService]);

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div>
      <div className="project-name-bar">
        <h1>Movie Actor Project</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" activeClassName="active">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/actorList" className="nav-link" activeClassName="active">
              Actor Details
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/searchItem" className="nav-link" activeClassName="active">
              Search Your Content
            </NavLink>
          </li>
        </ul>

       
        <div className="login-section">
          {isLoggedIn ? (
            // If authenticated, display Logout button
            <NavLink to="/login" onClick={handleLogout} className="nav-link">
              Logout
            </NavLink>
          ) : (
            // If not authenticated, display Login link
            <NavLink to="/login" className="nav-link" activeClassName="active">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
*/