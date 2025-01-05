import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth Provider
import App from './App';
import './index.css';

// Ensure the root element exists
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found");
}

const root = createRoot(rootElement);

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = "376370205885-9do1f6lrphudplg18rd8ekgcars0jc42.apps.googleusercontent.com"; // Replace with your actual Client ID

// Render the app wrapped in GoogleOAuthProvider
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
