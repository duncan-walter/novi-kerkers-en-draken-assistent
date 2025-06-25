export function getLocalStorageItem(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function setLocalStorageItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}