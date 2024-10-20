import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './App.css';
import Navbar from './components/navbar';
import Base from './pages/base';
import Equipment from './pages/equipment';
import Missions from './pages/missions';
import Squad from './pages/squad';
import Rankings from './pages/rankings';

import ToTopBtn from './components/toTopBtn';

interface HapticFeedback {
  impactOccurred(type: 'light' | 'medium' | 'heavy'): void;
}

// Define types for Telegram and WebApp
interface TelegramWebApp {
  ready(callback: () => void): void;
  expand(): void;
  disableVerticalSwipes(): void;
  platform(): string;
  HapticFeedback: HapticFeedback;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

// Extend the global window object
declare global {
  interface Window {
    Telegram: Telegram;
  }
}


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const webApp = window.Telegram.WebApp;

    if (webApp) {
      webApp.expand(); 
      webApp.disableVerticalSwipes();
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
 
  return (
    <Router>
      {loading ? (
        <div className='loadcol'>
          <svg className='spinner' height="100%" viewBox="0 0 32 32" width="100%">
            <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}></circle>
            <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60 }}></circle>
          </svg>
          v1.2
        </div>
      ) : (
          <div className='container'>
            <div id="main">   
              <div id="mainCon">
                <Routes>
                  <Route path="/" element={<Base />} />
                  <Route path="/equipment" element={<Equipment />} />
                  <Route path="/missions" element={<Missions />} />
                  <Route path="/rankings" element={<Rankings />} />
                  <Route path="/squad" element={<Squad />} />
                </Routes>
                <ToTopBtn />              
              </div>
            </div>
            <nav className="navbar">
              <div className="navgrid"></div>
              <Navbar />
            </nav>
          </div>
        )}
    </Router>
  );
};

