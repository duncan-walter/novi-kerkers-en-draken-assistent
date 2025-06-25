// Styling
import './index.css';
import './components/form-controls/FormControl.css';

// Framework dependencies
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

// Contexts
import AuthorizationContextProvider from "./context/AuthorizationContext.jsx";

// Components
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthorizationContextProvider>
        <App/>
      </AuthorizationContextProvider>
    </Router>
  </StrictMode>,
)