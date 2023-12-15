import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';
import MovieDetails from './components/MovieDetails';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import AuthInterceptor from './components/AuthInterceptor';
import AuthorizationService from './components/AuthorizationService';

const App = () => {
  const authService = AuthorizationService();
  return (
    <Router>
      <div>
      

        <NavigationBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actorList" element={<ActorList />} />
          <Route path="/actor/:actorName" element={<ActorDetails />} />
          <Route path="/movie/:movieName" element={<MovieDetails />} />
          <Route path="/searchItem" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes for other components/pages */}
        </Routes>
        <AuthInterceptor authService={authService} />
      </div>
    </Router>
  );
};

export default App;
