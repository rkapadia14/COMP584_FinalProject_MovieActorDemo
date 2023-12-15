import React from 'react';
import '../css/homePage.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">Welcome to the Movie Actor Project</h1>

      <section className="project-description">
        <p>
          Dive into the captivating world of cinema with our Movie Actor Project. Discover a vast collection of movies and their talented cast members. Whether you're a movie enthusiast or just curious about the actors behind the scenes, this project is your gateway to cinematic exploration.
        </p>
      </section>

      <section className="key-features">
        <h2>Key Features:</h2>

        <div className="feature">
          <h3>1. Actor Details</h3>
          <p>Explore in-depth details about your favorite actors, including their filmography, birthdate, and more. Click on an actor's name to unravel the fascinating journey of their career.</p>
        </div>

        <div className="feature">
          <h3>2. Movie Insights</h3>
          <p>Get insights into various movies, their titles, and the actors who brought the characters to life. Follow the links to explore movie details and trivia.</p>
        </div>

        <div className="feature">
          <h3>3. Search Your Content</h3>
          <p>Looking for a specific actor or movie? Use our search functionality to quickly find the content you're interested in. The search results provide a convenient way to navigate to your favorite movies or actors.</p>
        </div>

        <div className="feature">
          <h3>4. User Authentication</h3>
          <p>Log in to access to all this information with your username and password</p>
        </div>
      </section>

      <section className="get-started">
        <h2>How to Get Started?</h2>
        <ol>
        <li>
            <strong>Login to Access All The Movie and Actor Related Content</strong> 
          </li>
          <li>
            <strong>Explore Actors:</strong> Navigate to the "Actor Details" menu to discover a comprehensive list of actors and movies. Click on an actor's or movie's name to explore their details.
          </li>
          <li>
            <strong>Discover Movies:</strong> Head to the "Search Your Content" page to search for any movie or actor information. The results will help you find what you're looking for.
          </li>
          
        </ol>
      </section>
    </div>
  );
};

export default Home;
