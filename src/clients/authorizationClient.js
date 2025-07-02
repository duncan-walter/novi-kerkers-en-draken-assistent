// Framework dependencies
import axios from 'axios';

const authorizationClient = axios.create({
  baseURL: import.meta.env.VITE_NOVI_DYNAMIC_API_BASE_URL,
  headers: {
    accept: 'application/json',
    'novi-education-project-id': import.meta.env.VITE_NOVI_DYNAMIC_API_PROJECT_ID
  }
});


export default authorizationClient;