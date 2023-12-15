// ActorList.js

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthorizationService from './AuthorizationService'; // Import the AuthService
import config from '../config';
import '../css/actorList.css'; // Import the CSS file

const ActorList = () => {
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();
  const authService = AuthorizationService();
  const apiUrl = config.apiUrl;

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        // Fetch actor data from your API endpoint
        if (!authService.isAuthenticated()) {
          // Redirect to login page or show a message
          console.error('Unauthorized: Redirecting to login page');
          
          navigate('/login');
          return;
        }

        const token = authService.getToken('comp584-auth-token');
        console.log('Token from ActorList'+token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}/ActorMovieList`, { headers });

        const data = await response.json();
        
        setActors(data);
      } catch (error) {
        console.error('Error fetching actor data:', error);
      }
    };

    fetchActorData();
  }, [authService, navigate]); // Dependency array includes authService to trigger the effect when authService changes

  return (
    <div className="actor-list">
      <h2>Actor List</h2>
      <table className="actor-table">
        <thead>
          <tr>
            <th>Actor Name</th>
            <th>Movies</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor) => (
            <tr key={actor.actorId}>
              <td>
                <NavLink to={`/actor/${actor.actorName}`}>{actor.actorName}</NavLink>
              </td>
              <td>
                {actor.movieTitles.map((movie, index) => (
                  <div key={index}>
                    <NavLink to={`/movie/${encodeURIComponent(movie)}`}>
                      {movie}
                    </NavLink>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActorList;
