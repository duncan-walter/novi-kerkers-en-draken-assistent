// Framework dependencies
import axios from 'axios';

const dnd5eClient = axios.create({
  baseURL: import.meta.env.VITE_DND5E_API_BASE_URL,
  headers: {
    accept: 'application/json',
  }
});

export default dnd5eClient;