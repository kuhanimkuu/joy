import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const letterLines = [
  "Hey Bunny,",
  "",
  "I know I don't always say it enough,",
  "but you mean the whole world to me.",
  "You're the first thing on my mind",
  "when I wake up and the last before I sleep.",
  "",
  "You bring color into my life —",
  "the kind that makes everything brighter,",
  "warmer, and worth waking up for.",
  "",
  "I love the way you laugh,",
  "the way you look at me,",
  "the way you make even the smallest",
  "moments feel like the biggest adventures.",
  "",
  "You're not just my girlfriend, Joy.",
  "You're my best friend, my peace,",
  "my favorite person in the entire universe.",
  "",
  "I don't know what I did",
  "to deserve someone like you,",
  "but I thank God for you every single day.",
  "",
  "Happy Valentine's Day, my bunny.",
  "I love you more than words could ever say.",
  "",
  "Forever yours,",
  "Your person 💖"
];

const LetterPage = () => {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= letterLines.length) {
          clearInterval(timer);
          setTimeout(() => setShowButton(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const skipAnimation = () => {
    setVisibleLines(letterLines.length);
    setShowButton(true);
  };

  return (
    <div className="letter-page">
      <div className="letter-container">
        <div className="letter-paper">
          <div className="letter-stamp">💖</div>
          <div className="letter-content">
            {letterLines.map((line, index) => (
              <p
                key={index}
                className={`letter-line ${index < visibleLines ? 'visible' : ''} ${index === 0 ? 'greeting' : ''} ${line === '' ? 'spacer' : ''}`}
              >
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        </div>

        {visibleLines < letterLines.length && (
          <button className="skip-btn" onClick={skipAnimation}>
            Skip Animation
          </button>
        )}

        {showButton && (
          <div className="letter-nav">
            <button className="valentine-btn" onClick={() => navigate('/gallery')}>
              See Our Photos 📸
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterPage;
