import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { LanguageProvider } from './i18n';
import { CustomerProvider } from './contexts/CustomerContext';
import './index.css';

// A small tactile click sound for buttons and links. It is created only after
// a user gesture, so browsers do not block it as autoplay.
document.addEventListener('click', (event) => {
  if (!event.target.closest('button, a')) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(280, context.currentTime + 0.045);
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.06);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.06);
  } catch (error) { /* Audio is optional and may be blocked by the browser. */ }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CustomerProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: '10px', zIndex: 99999 } }} />
        </CustomerProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
