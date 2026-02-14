import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const photos = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `${process.env.PUBLIC_URL}/photos/photo${i + 1}.jpeg`,
}));

const loveReasons = [
  "Your laugh — it heals everything",
  "The way you call me and my heart skips",
  "How you make me want to be better every day",
  "Your eyes when you're happy — pure magic",
  "How safe I feel when I'm with you",
  "The way you love so deeply and so fearlessly",
  "Your hugs that make the whole world disappear",
  "How you understand me without me saying a word",
  "Your strength even when things get hard",
  "Because you're Joy — and you are my joy",
];

const FinalePage = () => {
  const navigate = useNavigate();
  const [showReasons, setShowReasons] = useState(false);
  const [currentReason, setCurrentReason] = useState(0);
  const [showFinale, setShowFinale] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  useEffect(() => { setTimeout(() => setShowReasons(true), 1500); }, []);

  useEffect(() => {
    if (!showReasons) return;
    const timer = setInterval(() => {
      setCurrentReason(prev => {
        if (prev >= loveReasons.length - 1) {
          clearInterval(timer);
          setTimeout(() => setShowFinale(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [showReasons]);

  const triggerHeartBurst = () => {
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 2000);
  };

  return (
    <div className="finale-page">
      {heartBurst && (
        <div className="heart-burst">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="burst-heart" style={{
              '--angle': `${(i * 360) / 30}deg`,
              '--distance': `${100 + Math.random() * 200}px`,
              '--delay': `${Math.random() * 0.3}s`,
              '--size': `${15 + Math.random() * 25}px`,
            }}>💖</div>
          ))}
        </div>
      )}

      <div className="photo-orbit">
        {photos.map((photo, i) => (
          <div key={photo.id} className="orbit-photo" style={{
            '--angle': `${(i * 360) / photos.length}deg`,
            '--delay': `${i * 0.15}s`,
          }}>
            <img src={photo.src} alt={`Memory ${photo.id}`} />
          </div>
        ))}
        <div className="orbit-center" onClick={triggerHeartBurst}>
          <span className="center-heart">💖</span>
          <p className="center-text">Us</p>
        </div>
      </div>

      {showReasons && (
        <div className="reasons-section">
          <h2 className="reasons-title">Why I Love You, Bunny</h2>
          <div className="reasons-list">
            {loveReasons.map((reason, i) => (
              <div key={i} className={`reason-item ${i <= currentReason ? 'visible' : ''}`}>
                <span className="reason-heart">💗</span>
                <span className="reason-text">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFinale && (
        <div className="finale-message">
          <h1 className="finale-text">I Love You, Joy</h1>
          <p className="finale-sub">Today, tomorrow, forever and then some more.</p>
          <p className="finale-sub small">You're my everything, bunny. Never forget that. 🐰💖</p>

          <div className="finale-photo-collage">
            {photos.slice(0, 6).map((photo, i) => (
              <div key={photo.id} className="collage-item" style={{
                '--rotation': `${-12 + i * 5}deg`,
                animationDelay: `${i * 0.15}s`,
              }}>
                <img src={photo.src} alt={`Memory ${photo.id}`} />
              </div>
            ))}
          </div>

          <div className="forever-badge" onClick={triggerHeartBurst}>
            <span>🐰</span>
            <span className="badge-text">Forever & Always</span>
            <span>💖</span>
          </div>

          <button className="valentine-btn restart-btn" onClick={() => navigate('/')}>
            From The Top 💕
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalePage;
