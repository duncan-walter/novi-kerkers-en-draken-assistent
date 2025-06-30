// Framework dependencies
import axios from 'axios';

// Helpers and constants
import {getLocalStorageItem} from "../helpers/localStorageHelpers.js";
import {userKey} from "../constants/localStorageKeys.js";

const userDataClient = axios.create({
  baseURL: import.meta.env.VITE_NOVI_DYNAMIC_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${getLocalStorageItem(userKey).token}`
  }
});

// An interceptor is used to set the Authorization header at request time.
// This ensures the latest token is used, even after login/logout without a page refresh.
// Setting headers in axios.create would freeze the token value at initialization.
userDataClient.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${getLocalStorageItem(userKey).token}`
  }

  return config;
});

export default userDataClient;