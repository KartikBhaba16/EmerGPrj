import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Check this path
import './index.css'; // Import CSS properly

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
