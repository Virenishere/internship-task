// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Your styles
import { Store } from './redux/Store'; // Import the store
import { Provider } from 'react-redux'; // Import Provider from react-redux

// Render the app and wrap it with the Redux Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </StrictMode>,
);
