import React, { useEffect, useState } from 'react';

const hearts = ['💖', '💕', '✨', '💗', '🩷'];

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticle = () => {
      const id = Date.now() + Math.random();
      const particle = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 8 + 10,
        emoji: hearts[Math.floor(Math.random() * hearts.length)],
      };
      setParticles(prev => [...prev.slice(-12), particle]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, particle.duration * 1000);
    };

    const interval = setInterval(createParticle, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="floating-item"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
