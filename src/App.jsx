import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LetterPage from './pages/LetterPage';
import GalleryPage from './pages/GalleryPage';
import TimelinePage from './pages/TimelinePage';
import FinalePage from './pages/FinalePage';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

function Navigation() {
  return (
    <nav className="site-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/letter" className={({ isActive }) => isActive ? 'active' : ''}>Letter</NavLink>
      <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>Gallery</NavLink>
      <NavLink to="/timeline" className={({ isActive }) => isActive ? 'active' : ''}>Timeline</NavLink>
      <NavLink to="/forever" className={({ isActive }) => isActive ? 'active' : ''}>Forever</NavLink>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <FloatingHearts />
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/forever" element={<FinalePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
