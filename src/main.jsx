// Styling
import './index.css';
import './components/form-controls/FormControl.css';

// Framework dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)