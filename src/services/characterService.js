// Custom hooks
import userDataClient from '../clients/userDataClient.js';

// Framework dependencies
import {jwtDecode} from "jwt-decode";


// Helpers and constants
import {requestWithCache} from '../helpers/requestHelpers.js';
import {getLocalStorageItem} from "../helpers/localStorageHelpers.js";
import {charactersKey, userKey} from '../constants/localStorageKeys.js';

// Local constants
const client = userDataClient;
const endpoint = 'characters';

// TODO: Find a way to remove the payload and signal passing, currently this is needed to support the useAbortableRequest hook.
const characterService = {
  getCharacters: (options = {useCache: false}) => {
    const userId = jwtDecode(getLocalStorageItem(userKey).token).userId;
    let request = (_, signal) => client.get(`users/${userId}/${endpoint}`, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `users/${userId}/${charactersKey}`, 60);
    }

    return request;
  },

  getCharacterById: (id, options = {useCache: false}) => {
    let request = (_, signal) => client.get(`${endpoint}/${id}`, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${charactersKey}/${id}`, 300);
    }

    return request;
  },

  createCharacter: (characterData, signal) => client.post(endpoint, characterData, {signal}),

  updateCharacter: (characterData, signal) => client.put(`${endpoint}/${characterData.id}`, characterData, {signal}),
}

export default characterService;