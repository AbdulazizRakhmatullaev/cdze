import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './App.css';
import Navbar from './components/navbar';
import Base from './pages/base';
import Equipment from './pages/equipment';
import Missions from './pages/missions';
import Squad from './pages/squad';
import Rankings from './pages/rankings';

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
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToTop = () => {
    const main = document.getElementById("mainCon");
    main?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const main = document.getElementById("main");

    const toggleVisibility = () => {
      if (main && main.scrollTop > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (main) {
      main.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      if (main) {
        main.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, []);
  
  return (
    <Router>
      {loading ? (
        <div className='loadcol'>
          <svg className='spinner' height="100%" viewBox="0 0 32 32" width="100%">
            <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}></circle>
            <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60 }}></circle>
          </svg>
          v1.8
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
                <div id="toTop" className={isVisible ? "show" : ''} onClick={scrollToTop}>
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m13 19c0 .5523-.4477 1-1 1s-1-.4477-1-1v-11.58579l-4.29289 4.29289c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 0-1.4142l6.00001-6.00001c.3905-.39052 1.0237-.39052 1.4142 0l6 6.00001c.3905.3905.3905 1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.29289z" fill="currentColor"/>
                  </svg>
                </div>
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

