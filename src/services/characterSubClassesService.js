// Custom hooks
import dnd5eClient from '@clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '@helpers/requestHelpers.js';
import {characterSubClassesKey} from '@constants/localStorageKeys.js';

// Local constants
const client = dnd5eClient;
const endpoint = 'subclasses';

const characterSubClassesService = {
  getCharacterSubClassesIndex: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${characterSubClassesKey}:index`, 3600);
    }

    return request;
  }
}

export default characterSubClassesService;