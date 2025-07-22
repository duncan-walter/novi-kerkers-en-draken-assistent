// Custom hooks
import userDataClient from '@clients/userDataClient.js';

// Helpers and constants
import {requestWithCache} from '@helpers/requestHelpers.js';
import {characterTypesKey} from '@constants/localStorageKeys.js';

// Local constants
const client = userDataClient;
const endpoint = 'characterTypes';

const characterTypeService = {
  getCharacterTypes: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, characterTypesKey, 3600);
    }

    return request;
  }
}

export default characterTypeService;