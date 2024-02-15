import React from 'react';
import { Link } from 'react-router-dom';

// import the background image for the landing page
import backgroundImage from '../../src/pages/background.jpg';

const Landing = () => {
  // container of the landing page
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`, // set the background image
    backgroundSize: 'cover', // ensure background image covers entire container
    backgroundPosition: 'center', // centres image
    height: '100vh', // full viewport height
    // adapts for mobile view
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', // ??
    alignItems: 'flex-start', 
    color: 'white', 
    padding: '5vw', 
  };

  // signup button
  const buttonStyle = {
    display: 'inline-block', 
    padding: '0.8rem 1.5rem',
    fontSize: '1rem', 
    fontWeight: 'bold', 
    lineHeight: '1.5',
    color: 'white',
    transition: 'background-color 0.3s ease',
    transform: 'translateY(0)', 
    backgroundColor: '#34D399', 
    borderRadius: '0.5rem', 
    marginTop: '2vw', 
  };

  // heading text
  const headingStyle = {
    fontSize: '3rem', 
    marginBottom: '0.7vw',
  };

  // description
  const descriptionStyle = {
    fontSize: '0.8rem', 
    marginTop: '2vw', // margin based on viewport width
  };

  return (
    <div style={containerStyle}>
      <div className="text-gray-800 text-5xl font-bold cursor" style={headingStyle}>
        Discover <br />Mindful Eating
      </div>

      <div className="text-gray-800 text-1xl font cursor" style={descriptionStyle}>
        SAY GOODBYE TO THE STRESS OF FINDING <br />
        SAFE MEALS ON CAMPUS AND EMBARK ON A <br />
        CULINARY JOURNEY THAT ALIGNS PERFECTLY<br />
        WITH YOUR DIETARY NEEDS
      </div>

      <Link to="/signup" style={buttonStyle}>
        Sign Up
      </Link>
    </div>
  );
};

export default Landing;