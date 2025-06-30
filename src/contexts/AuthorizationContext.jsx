// Framework dependencies
import {createContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";

// Custom hooks
import {useToaster} from "./ToasterContext.jsx";

// Services
import * as authorizationService from '../services/authorizationService.js';

// Helpers and constants
import {getLocalStorageItem} from "../helpers/localStorageHelpers.js";
import {userKey} from "../constants/localStorageKeys.js";

// TODO: WebStorm complains about fast refresh not working because of this export, fix it.
export const AuthorizationContext = createContext(null);

function AuthorizationContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('pending');
  const {showToast} = useToaster();

  // Executed on application load
  useEffect(() => {
    const localStorageUser = getLocalStorageItem(userKey);
    setUser(localStorageUser);
    setStatus('ready');

    let autoLogout;

    if (localStorageUser) {
      const tokenExpiration = jwtDecode(localStorageUser.token).exp;
      const autoLogoutTimeout = tokenExpiration * 1000 - Date.now();

      autoLogout = setTimeout(() => {
        showToast('Je sessie is verlopen. Log opnieuw in om verder te gaan.', 'error');
        logout();
      }, autoLogoutTimeout);
    }

    return () => clearTimeout(autoLogout);
  }, []);

  const login = async (email, password) => {
    const statusCode = await authorizationService.login(email, password);

    if (statusCode === 200) {
      const localStorageUser = getLocalStorageItem(userKey);
      setUser(localStorageUser);
    }

    setStatus('ready');

    return statusCode;
  }

  const logout = () => {
    authorizationService.logout();
    setUser(null);
    setStatus('ready');
  }

  const context = {
    user,
    login: login,
    logout: logout
  }

  return (
    <AuthorizationContext value={context}>
      {status === 'pending'
        ? <p>Loading...</p> // TODO: Add a fun loading screen.
        : children}
    </AuthorizationContext>
  );
}

export default AuthorizationContextProvider;