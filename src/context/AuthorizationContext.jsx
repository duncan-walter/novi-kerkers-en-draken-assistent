// Framework dependencies
import {createContext, useEffect, useState} from 'react';

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

  // Executed on application load
  useEffect(() => {
    const localStorageUser = getLocalStorageItem(userKey);
    setUser(localStorageUser);
    setStatus('ready');
  }, []);

  const login = async (email, password) => {
    const success = await authorizationService.login(email, password);

    if (success) {
      const localStorageUser = getLocalStorageItem(userKey);
      setUser(localStorageUser);
    }

    setStatus('ready');
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