function firstCharacterToLowerCase(value) {
  return getFirstCharacter(value).toLowerCase() + value.slice(1);
}

function firstCharacterToUpperCase(value) {
  return getFirstCharacter(value).toUpperCase() + value.slice(1);
}

function getFirstCharacter(value) {
  return value.charAt(0);
}

export {
  firstCharacterToLowerCase,
  firstCharacterToUpperCase
};