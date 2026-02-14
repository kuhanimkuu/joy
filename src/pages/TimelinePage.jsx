import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const timelineEvents = [
  { photo: 1, title: "First Spark", text: "The moment I saw you and knew my life was about to change..." },
  { photo: 3, title: "Falling Hard", text: "Every text, every call — I was falling deeper without even trying..." },
  { photo: 5, title: "Our Adventures", text: "With you, even doing nothing feels like the best adventure..." },
  { photo: 8, title: "You & Me", text: "Building something real, something beautiful, together..." },
  { photo: 10, title: "Growing Closer", text: "Every day with you, the love just keeps getting deeper..." },
  { photo: 13, title: "Right Now", text: "Still the same butterflies, still the same love — only stronger..." },
];

const TimelinePage = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h2 className="timeline-title">Our Story</h2>
        <p className="timeline-subtitle">how we got here, bunny 🐰</p>
        <div className="timeline-heart-divider">
          <span className="divider-line" />
          <span className="divider-heart">💖</span>
          <span className="divider-line" />
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            data-index={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${visibleItems.has(index) ? 'visible' : ''}`}
          >
            <div className="timeline-dot"><span>💗</span></div>
            <div className="timeline-card">
              <div className="timeline-card-image">
                <img src={`${process.env.PUBLIC_URL}/photos/photo${event.photo}.jpeg`} alt={event.title} />
              </div>
              <div className="timeline-card-content">
                <h3 className="card-title">{event.title}</h3>
                <p className="card-text">{event.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-end">
        <span className="big-heart">💖</span>
        <p className="end-text">and the best is yet to come...</p>
        <button className="valentine-btn" onClick={() => navigate('/forever')}>
          One Last Thing ✨
        </button>
      </div>
    </div>
  );
};

export default TimelinePage;
