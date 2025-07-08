// Custom hooks
import userDataClient from '../clients/userDataClient.js';

// Helpers and constants
import {requestWithCache} from '../helpers/requestHelpers.js';
import {charactersKey} from '../constants/localStorageKeys.js';

// Local constants
const client = userDataClient;
const endpoint = 'characters';

// TODO: Find a way to remove the payload and signal passing, currently this is needed to support the useAbortableRequest hook.
const characterService = {
  getCharacters: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, charactersKey, 60);
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