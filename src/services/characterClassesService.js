// Custom hooks
import dnd5eClient from '../clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '../helpers/requestHelpers.js';
import {characterClassesKey} from '../constants/localStorageKeys.js';

// Local constants
const client = dnd5eClient;
const endpoint = 'classes';

const characterClassesService = {
  getCharacterClassesIndex: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${characterClassesKey}:index`, 3600);
    }

    return request;
  }
}

export default characterClassesService;