// Custom hooks
import dnd5eClient from '../clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '../helpers/requestHelpers.js';
import {weaponInformationKey} from '../constants/localStorageKeys.js';

// Local constants
const client = dnd5eClient;
const endpoint = 'equipment-categories/weapon';

const weaponInformationService = {
  getWeaponInformationIndex: (options = {useCache: false}) => {
    let request = (_, signal) => client.get(endpoint, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${weaponInformationKey}:index`, 3600);
    }

    return request;
  }
}

export default weaponInformationService;