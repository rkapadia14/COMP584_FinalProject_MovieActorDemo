import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/actorDetails.css';
import AuthorizationService from './AuthorizationService'; // Import the AuthService
import config from '../config';

const ActorDetails = () => {
  const { actorName } = useParams();
  const [actorDetails, setActorDetails] = useState(null);
  const authService = AuthorizationService();
  const apiUrl = config.apiUrl;

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const token = authService.getToken('comp584-auth-token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Fetch actor details from your API endpoint with authorization header
        const actorResponse = await fetch(`${apiUrl}/Actor/actor-details/${actorName}`, {
          headers: headers,
        });
        const actorData = await actorResponse.json();

        // Fetch Wikipedia information for the actor
        const wikipediaResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(actorName)}&prop=pageimages|extracts&format=json&pithumbsize=300&exintro=true&origin=*`);
        const wikipediaData = await wikipediaResponse.json();

        // Extract the image URL and summary from the Wikipedia API response
        const pages = wikipediaData.query.pages;
        const pageId = Object.keys(pages)[0];
        const imageUrl = pages[pageId].thumbnail?.source || null;
        const summaryWithTags = pages[pageId].extract || '';
        const summary = stripHtmlTags(summaryWithTags);

        // Merge actor details with Wikipedia image and summary
        const actorWithDetails = {
          ...actorData,
          image: imageUrl,
          summary: summary,
        };

        setActorDetails(actorWithDetails);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    fetchActorDetails();
  }, [actorName, authService]);

  return (
    <div className="actor-details">
      {actorDetails ? (
        <>
          <h2>{actorDetails.name}</h2>
          <p>Born: {new Date(actorDetails.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Total Movies: {actorDetails.totalMovies}</p>
          <p>Age: {actorDetails.age}</p>
          <br></br>
          {actorDetails.image && <img src={actorDetails.image} alt={`${actorDetails.name} Thumbnail`} />}
          <br></br>
          <br></br>
          <p className="summary">Summary: {actorDetails.summary}</p>
          {/* Add more details based on your API response */}
        </>
      ) : (
        <p>Loading actor details...</p>
      )}
    </div>
  );
};

export default ActorDetails;
