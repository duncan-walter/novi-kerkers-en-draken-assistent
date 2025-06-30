// Clients
import authorizationClient from '../clients/authorizationClient.js';

// Helpers and constants
import {setLocalStorageItem, removeLocalStorageItem} from '../helpers/localStorageHelpers.js';
import {userKey} from '../constants/localStorageKeys.js';

async function login(email, password) {
  try {
    const response = await authorizationClient.post('/login', {
      email: email,
      password: password
    });

    setLocalStorageItem(userKey, {
      email: response.data.user.email,
      token: response.data.token
    });

    return response.status;
  } catch (e) {
    return e.status ?? 500;
  }
}

function logout() {
  removeLocalStorageItem(userKey);
}

async function register(email, password) {
  try {
    const response = await authorizationClient.post('/users', {
      email: email,
      password: password,
      roles: ["user"]
    });

    return response.status;
  } catch (e) {
    return e.status ?? 500;
  }
}

export {login, logout, register};