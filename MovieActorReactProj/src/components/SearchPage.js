// SearchPage.js

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthorizationService  from './AuthorizationService';
import config from '../config';
import '../css/searchPage.css'; // Make sure to import your CSS file

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('movie');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const authService = AuthorizationService();
  const apiUrl = config.apiUrl;

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [authService, navigate]);


  const navigateToDetailsPage = (id) => {
    // Navigate to the details page based on the search type
    const route = searchType === 'movie' ? `/movie/${id}` : `/actor/${id}`;
    navigate(route);
  };

  const handleSearch = async () => {
    try {
      const token = authService.getToken('comp584-auth-token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
      const response = await fetch(
        searchType === 'movie'
          ? `${apiUrl}/Movie/movie-actors/${searchText}`
          : `${apiUrl}/Actor/search-actor?actorName=${searchText}`,{
            headers: headers}
      );

      const data = await response.json();

      if (response.ok) {
        if (data.length === 0) {
          // No matching results found
          setSearchResults([]);
          setNoResultsMessage(`No matching ${searchType === 'movie' ? 'movies' : 'actors'} found.`);
        } else {
          // Update the search results
          const results = data.map((result) => ({
            id: searchType === 'movie' ? result.movieId : result.actorId,
            name: searchType === 'movie' ? result.title : result.name,
          }));
          setSearchResults(results);
          setNoResultsMessage('');
        }
      } else {
        // Handle other HTTP status codes
        if (response.status === 404) {
          setSearchResults([]);
          setNoResultsMessage(`No matching ${searchType === 'movie' ? 'movies' : 'actors'} found.`);
        } 
        else if (response.status === 401) {
          setSearchResults([]);
          setNoResultsMessage(`You are currently not authorized. Kindly login to proceed.`);
        }
        else {
          console.error(`Error searching for ${searchType}s: ${data.message}`);
          setNoResultsMessage(`Error searching for ${searchType === 'movie' ? 'movies' : 'actors'}.`);
        }
      }
    } catch (error) {
      console.error(`Error searching for ${searchType}s:`, error);
      setNoResultsMessage(`Error searching for ${searchType === 'movie' ? 'movies' : 'actors'}.`);
    }
  };

  const handleSearchTypeChange = (newSearchType) => {
    // Clear search results, reset search input text, and message when changing search type
    setSearchResults([]);
    setSearchText('');
    setNoResultsMessage('');
    setSearchType(newSearchType);
  };

  return (
    <div className="search-page">
      <h1 className="search-title">Search Page</h1>
      <div className="search-type-container">
        <label className="search-type-label">
          <input
            type="radio"
            value="movie"
            checked={searchType === 'movie'}
            onChange={() => handleSearchTypeChange('movie')}
            className="search-type-radio"
          />
          Search Movie
        </label>
        <label className="search-type-label">
          <input
            type="radio"
            value="actor"
            checked={searchType === 'actor'}
            onChange={() => handleSearchTypeChange('actor')}
            className="search-type-radio"
          />
          Search Actor
        </label>
      </div>
      <label className="search-input-label">
        <input
          type="text"
          placeholder={`Enter ${searchType === 'movie' ? 'movie' : 'actor'} name`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </label>
      <button onClick={handleSearch} className="search-button">Search</button>

      {/* Display search results as cards, show actor images, and navigate to details page on click */}
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2 className="results-title">Search Results</h2>
          <br />
          <div className="results-row">
            {searchResults.map((result) => (
              <div key={result.id} className="result-card" onClick={() => navigateToDetailsPage(result.name)}>
                <p className="result-title">{result.name}</p>
                {/* Add more details if needed */}
                <img
                  src={`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(result.name)}.jpg`}
                  alt={`${result.name} Thumbnail`}
                  className="result-thumbnail"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-results-message">{noResultsMessage}</p>
      )}
    </div>
  );
};

export default SearchPage;
