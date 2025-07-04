import {firstCharacterToLowerCase} from "./formatCaseHelpers.js";

/* Notes:
 * Maps the form data object's keys to api object keys. Comments are added for clarification.
 * The object parameter that is passed is mutated by reference.
 */
function mapFormKeysToAPIKeys(formDataObject, formDataObjectKeyPrefix) {
  Object.keys(formDataObject).map(oldKey => {
    // Remove form prefix
    let newKey = oldKey.split(formDataObjectKeyPrefix).pop();
    // First character to lower case
    newKey = firstCharacterToLowerCase(newKey);

    // Switch form data object key to api object key. Add new, then delete old.
    formDataObject[newKey] = formDataObject[oldKey];
    delete formDataObject[oldKey]
  });
}

export default mapFormKeysToAPIKeys;