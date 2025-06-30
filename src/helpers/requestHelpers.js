// Helpers
import {getLocalStorageItem, setLocalStorageItem} from './localStorageHelpers.js';

function requestWithCache(request, cacheKey, timeToLiveInSeconds) {
  return async (signal) => {
    const cacheItem = getLocalStorageItem(cacheKey);

    if (cacheItem) {
      const isCacheItemExpired = cacheItem.expirationTime < Date.now();

      if (!isCacheItemExpired) {
        return cacheItem;
      }
    }

    const response = await request(signal);
    const expirationTime = Date.now() + (1000 * timeToLiveInSeconds);
    setLocalStorageItem(cacheKey, {data: response.data, expirationTime});

    return response;
  }
}

export {requestWithCache};