import React from 'react';

export const Home = () => {
  // Inline styles for the home page layout
  const containerStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#F4F8FB', // Light background color for a soothing feel
    fontFamily: "'Arial', sans-serif",
    minHeight: '100vh', // Full height of the page
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#1976D2', // Light blue color
    marginBottom: '30px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    paddingBottom: '15px',
    borderBottom: '5px solid #1976D2', // Light blue border below the heading
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: '#555555', // Dark gray text for readability
    maxWidth: '800px',
    lineHeight: '1.8',
    marginBottom: '40px',
    paddingBottom: '30px',
    borderBottom: '2px solid #B3D9FF', // Soft light blue border to separate sections
  };

  const featureCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    width: '80%',
    maxWidth: '600px',
    textAlign: 'left',
    marginBottom: '30px',
    transition: 'transform 0.3s ease',
  };

  const featureCardHoverStyle = {
    transform: 'scale(1.05)', // Enlarge the card on hover for a dynamic effect
  };

  const featureTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1976D2', // Light blue title color
    marginBottom: '15px',
    textAlign: 'left',
  };

  const featureListStyle = {
    listStyleType: 'none',
    padding: '0',
    color: '#333',
    textAlign: 'left',
    fontSize: '1rem',
    lineHeight: '1.6',
  };

  const featureItemStyle = {
    marginBottom: '10px',
  };

  const circleIconStyle = {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#1976D2', // Light blue circle
    color: '#fff',
    textAlign: 'center',
    lineHeight: '30px',
    marginRight: '10px',
    fontWeight: 'bold',
  };

  const footerStyle = {
    marginTop: '50px',
    padding: '20px 0',
    fontSize: '1.1rem',
    color: '#636e8a',
    backgroundColor: '#f4f6f9',
    width: '100%',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      {/* Heading */}
      <h1 style={headingStyle}>MINDHAVEN</h1>

      {/* Description */}
      <p style={descriptionStyle}>
        Welcome to <strong>MINDHAVEN</strong>—a mental health app dedicated to providing users with tools, resources, and
        support to relieve stress and improve emotional well-being. Whether you're looking for self-help suggestions, mental
        health advice, or stress reduction techniques, we're here to support your journey to a better mind and body.
      </p>

      {/* Features Section */}
      <div
        style={{ ...featureCardStyle, ...featureCardHoverStyle }} // Hover effect on feature cards
      >
        <h2 style={featureTitleStyle}>
          <span style={circleIconStyle}>1</span> Simple Questionnaire
        </h2>
        <p style={{ fontSize: '1rem', color: '#333' }}>
          Our app begins with a simple questionnaire that helps you understand your current mood. Based on your responses,
          you will receive a score that measures your level of stress or anxiety.
        </p>
      </div>

      <div
        style={{ ...featureCardStyle, ...featureCardHoverStyle }} // Hover effect on feature cards
      >
        <h2 style={featureTitleStyle}>
          <span style={circleIconStyle}>2</span> Self-help Suggestions
        </h2>
        <ul style={featureListStyle}>
          <li style={featureItemStyle}>
            <strong>Music Therapy</strong> - Links to calming and stimulating playlists on Spotify to help you relax or energize.
          </li>
          <li style={featureItemStyle}>
            <strong>Yoga and Meditation</strong> - Access to mindfulness practices and YouTube videos for stress reduction.
          </li>
          <li style={featureItemStyle}>
            <strong>AI Chatbot Origins</strong> - Chat with our AI-powered chatbot for mental health advice and wellness tips.
          </li>
          <li style={featureItemStyle}>
            <strong>Simple Games</strong> - Links to calming and quiet games that you can access through the Google Play Store
            or App Store.
          </li>
        </ul>
      </div>

      <div
        style={{ ...featureCardStyle, ...featureCardHoverStyle }} // Hover effect on feature cards
      >
        <h2 style={featureTitleStyle}>
          <span style={circleIconStyle}>3</span> Access Resources Anytime
        </h2>
        <p style={{ fontSize: '1rem', color: '#333' }}>
          Once you complete the survey, you gain access to personalized mental health tools, resources, and suggestions that
          can help you manage stress, anxiety, and other emotional concerns.
        </p>
      </div>

      {/* Footer Section */}
      <footer style={footerStyle}>
        <p>&copy; 2024 Akindu Kalpana. All rights reserved.</p>
      </footer>
    </div>
  );
};