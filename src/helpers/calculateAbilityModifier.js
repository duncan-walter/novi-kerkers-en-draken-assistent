function calculateAbilityModifier(value) {
  const abilityModifier = Math.floor((value - 10) / 2);

  if (abilityModifier === 0) return 0;

  return `${Math.sign(abilityModifier) ? '+' : '-'}${Math.abs(abilityModifier)}`;
}

export default calculateAbilityModifier;