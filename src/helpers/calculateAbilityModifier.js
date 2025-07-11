// The word sign was used because it's closely related to positive and negative numbers https://en.wikipedia.org/wiki/Sign_(mathematics)
function calculateAbilityModifier(value, useSignPrefix = false) {
  const abilityModifier = Math.floor((value - 10) / 2);

  if (abilityModifier === 0) return 0;

  return useSignPrefix ? `${abilityModifier > 0 ? '+' : '-'}${Math.abs(abilityModifier)}` : abilityModifier;
}

export default calculateAbilityModifier;