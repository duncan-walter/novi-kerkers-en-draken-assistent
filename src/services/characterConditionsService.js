// Custom hooks
import dnd5eClient from '../clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '../helpers/requestHelpers.js';
import {characterConditionsKey} from '../constants/localStorageKeys.js';

// Local constants
const client = dnd5eClient;
const endpoint = 'conditions';

const characterConditionsService = {
  getConditionsIndex: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${characterConditionsKey}:index`, 3600);
    }

    return request;
  }
}

export default characterConditionsService;