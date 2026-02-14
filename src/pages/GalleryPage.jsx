import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const photos = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `${process.env.PUBLIC_URL}/photos/photo${i + 1}.jpeg`,
  caption: [
    "The moment I knew you were special",
    "My favorite smile in the world",
    "Us being us 💖",
    "Can't stop looking at you",
    "Making memories with my bunny",
    "You make everything better",
    "This is happiness",
    "My whole heart",
    "Forever isn't long enough",
    "You + Me = Everything",
    "My favorite place is next to you",
    "You light up my world",
    "Always and forever, bunny",
  ][i],
}));

const GalleryPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState('slideshow');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  useEffect(() => {
    if (viewMode !== 'slideshow') return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [viewMode, nextSlide]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  const touchStart = useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    touchStart.current = null;
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h2 className="gallery-title">Us 💕</h2>
        <p className="gallery-subtitle">every picture is a piece of us, bunny</p>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === 'slideshow' ? 'active' : ''}`} onClick={() => setViewMode('slideshow')}>Slideshow</button>
          <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>Gallery</button>
        </div>
      </div>

      {viewMode === 'slideshow' ? (
        <div className="slideshow-container">
          <button className="slide-arrow left" onClick={prevSlide}>‹</button>
          <div className="slide-frame" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="slide-inner">
              <img
                src={photos[currentSlide].src}
                alt={photos[currentSlide].caption}
                className={`slide-image ${isTransitioning ? 'transitioning' : ''}`}
              />
              <div className="slide-overlay">
                <p className="slide-caption">{photos[currentSlide].caption}</p>
                <p className="slide-count">{currentSlide + 1} / {photos.length}</p>
              </div>
            </div>
          </div>
          <button className="slide-arrow right" onClick={nextSlide}>›</button>

          <div className="slide-dots">
            {photos.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => { setIsTransitioning(true); setCurrentSlide(i); setTimeout(() => setIsTransitioning(false), 600); }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid-container">
          {photos.map((photo, i) => (
            <div key={photo.id} className="grid-item" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => setSelectedPhoto(photo)}>
              <img src={photo.src} alt={photo.caption} />
              <div className="grid-overlay">
                <p>{photo.caption}</p>
                <span className="grid-heart">💖</span>
              </div>
            </div>
          ))}

          <div className="grid-item video-item" style={{ animationDelay: `${13 * 0.08}s` }}>
            <video src={`${process.env.PUBLIC_URL}/photos/video1.mp4`} controls playsInline />
            <div className="grid-overlay">
              <p>Our special moment 💖</p>
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>✕</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            <p className="lightbox-caption">{selectedPhoto.caption}</p>
          </div>
        </div>
      )}

      <div className="gallery-nav">
        <button className="valentine-btn" onClick={() => navigate('/timeline')}>Our Story 💕</button>
      </div>
    </div>
  );
};

export default GalleryPage;
