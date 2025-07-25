// Custom hooks
import dnd5eClient from '@clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '@helpers/requestHelpers.js';
import {characterRacesKey} from '@constants/localStorageKeys.js';

// Local constants
const client = dnd5eClient;
const endpoint = 'races';

const characterRacesService = {
  getCharacterRacesIndex: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${characterRacesKey}:index`, 3600);
    }

    return request;
  }
}

export default characterRacesService;