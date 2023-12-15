import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthorizationService from './AuthorizationService'; 
import config from '../config';
import '../css/movieDetails.css';

const MovieDetails = () => {
  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const authService = AuthorizationService();
  const apiUrl = config.apiUrl;


  // Function to strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = authService.getToken('comp584-auth-token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };


        // Fetch movie details from your API endpoint
        const movieResponse = await fetch(`${apiUrl}/Movie/movie-actors/${encodeURIComponent(movieName)}`, {
          headers: headers});
        const movieData = await movieResponse.json();
        if(movieResponse.status === '401'){
          
            console.log('You are unauthorized to access this content. Kindly login.');

        }
        // Fetch movie details from the OMDb API
        const omdbResponse = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=db2364cc`);
        const omdbData = await omdbResponse.json();

        console.log('OMDb Data:', omdbData);

        // Extract relevant information from the OMDb API response
        const imageUrl = omdbData.Poster || null; // Use the movie poster as the image
        const summary = omdbData.Plot || '';
        const genre = omdbData.Genre || '';
        const runtime = omdbData.Runtime || '';
        const language = omdbData.Language || '';
        const ratings = omdbData.Ratings || [];

        // Modify the structure of actors if it's an array of strings
        const actors = movieData[0]?.actors?.map((actorName, index) => ({
          actorId: index + 1, // You can use a unique identifier here
          name: actorName,
        })) || [];

        // Merge movie details with OMDb image, summary, genre, runtime, language, and ratings
        const movieWithDetails = {
          ...movieData[0], // Assuming movieData is an array with details from your API
          image: imageUrl,
          summary: stripHtmlTags(summary),
          genre,
          runtime,
          language,
          ratings,
          actors,
        };

        setMovieDetails(movieWithDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieName]);

  return (
    <div className="movie-details">
      {movieDetails ? (
        <>
          <div className="movie-info">
            <h2>{movieDetails.title}</h2>
            <p>Release Year: {movieDetails.releaseYear}</p>
            <p>Genre: {movieDetails.genre}</p>
            <p>Runtime: {movieDetails.runtime}</p>
            <p>Language: {movieDetails.language}</p>
            <p>Ratings:</p>
            <ul>
              {movieDetails.ratings && movieDetails.ratings.length > 0 ? (
                movieDetails.ratings.map((rating, index) => (
                  <li key={index}>{`${rating.Source}: ${rating.Value}`}</li>
                ))
              ) : (
                <li>No ratings available</li>
              )}
            </ul>
            <p className="summary">Summary: {movieDetails.summary}</p>
          </div>

          {/* Movie image */}
          <div className="movie-image">
            {movieDetails.image && <img src={movieDetails.image} alt={`${movieDetails.title} Thumbnail`} />}
          </div>

          {/* Actors in the movie */}
          <h3>Movie Cast</h3>
          <div className="actors-list">
            {movieDetails.actors && movieDetails.actors.length > 0 ? (
              movieDetails.actors.map((actor) => (
                <div key={actor.actorId} className="actor-card">
                  <img
                    src={`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(actor.name)}.jpg`}
                    alt={`${actor.name} Thumbnail`}
                    className="actor-image"
                  />
                  <p className="actor-name">
                    <NavLink to={`/actor/${actor.name}`}>{actor.name}</NavLink>
                  </p>
                </div>
              ))
            ) : (
              <p>No actors available</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
