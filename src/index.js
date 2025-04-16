import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const message = error.response.data;

      if (typeof message === "string" && message.toLowerCase().includes("expired")) {

        alert("Session expired. Please log in again.");
      } else {
        alert("You are not authorized.");
      }

      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

