// Custom hooks
import dnd5eClient from '@clients/dnd5eClient.js';

// Helpers and constants
import {requestWithCache} from '@helpers/requestHelpers.js';
import {weaponInformationKey} from '@constants/localStorageKeys.js';

const weaponInformationService = {
  getWeaponInformationIndex: (options = {useCache: false}) => {
    let request = (_, signal) => dnd5eClient.get('equipment-categories/weapon', {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${weaponInformationKey}:index`, 3600);
    }

    return request;
  },

  getWeaponInformationByIndex: (index, options = {useCache: false}) => {
    let request = (_, signal) => dnd5eClient.get(`equipment/${index}`, {signal});

    if (options.useCache) {
      request = requestWithCache(request, `${weaponInformationKey}:${index}`, 3600);
    }

    return request;
  }
}

export default weaponInformationService;