import {firstCharacterToLowerCase, firstCharacterToUpperCase} from '@helpers/formatCaseHelpers.js';

/* Notes:
 * Maps the form data object's keys to api object keys and vise versa is reverse is true.
 * The object parameter that is passed is mutated by reference.
 */
function mapFormKeysToAPIKeys(formDataObject, formDataObjectKeyPrefix, reverse = false) {
  Object.keys(formDataObject).map(oldKey => {
    let newKey;

    if (reverse) {
      newKey = [formDataObjectKeyPrefix, firstCharacterToUpperCase(oldKey)].join('');
    } else {
      newKey = firstCharacterToLowerCase(oldKey.split(formDataObjectKeyPrefix).pop());
    }

    // For some reason in strict mode keys were being double prefixed as if the 1st and 2nd render shared some sort of state.
    // The condition around around the key swap executing is a temporary fix.
    // TODO: Find out why this happens exactly and fix it properly.
    if ((reverse && !oldKey.startsWith(formDataObjectKeyPrefix)) || !reverse) {
      formDataObject[newKey] = formDataObject[oldKey];
      delete formDataObject[oldKey]
    }
  });
}

export default mapFormKeysToAPIKeys;