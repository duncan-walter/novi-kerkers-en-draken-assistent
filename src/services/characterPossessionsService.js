// Custom hooks
import userDataClient from '../clients/userDataClient.js';


// Helpers and constants
import {requestWithCache} from "../helpers/requestHelpers.js";
import {characterPossessionsKey} from "../constants/localStorageKeys.js";

// Local constants
const client = userDataClient;
const endpoint = 'characterPossessions';

const characterPossessionsService = {
  getCharacterPossessionsById: (id, options = {useCache: false}) => {
    let request = (_, signal) => client.get(`characters/${id}/${endpoint}`, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${characterPossessionsKey}/${id}`, 3600);
    }

    return request;
  },

  createCharacterPossession: (characterPossession, signal) => client.post(endpoint, characterPossession, {signal})
}

export default characterPossessionsService;