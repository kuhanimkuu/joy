import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setShowContent(true), 800);
  };

  return (
    <div className="landing-page">
      <div className="landing-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bg-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      <div className={`landing-content ${loaded ? 'visible' : ''}`}>
        <p className="landing-pretext">a little something for</p>
        <h1 className="landing-name">Joy❤️</h1>
        <p className="landing-subtitle">my bunny 🐰</p>

        <div
          className={`envelope ${envelopeOpen ? 'open' : ''}`}
          onClick={!envelopeOpen ? handleEnvelopeClick : undefined}
        >
          <div className="envelope-flap" />
          <div className="envelope-body">
            <div className="envelope-heart">💌</div>
          </div>
          {!envelopeOpen && (
            <p className="envelope-hint">tap to open</p>
          )}
        </div>

        {showContent && (
          <div className="reveal-content">
            <p className="reveal-text">
              I made this just for you, bunny. Every page is a piece of my heart...
            </p>
            <button className="valentine-btn" onClick={() => navigate('/letter')}>
              Read My Letter 💌
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
