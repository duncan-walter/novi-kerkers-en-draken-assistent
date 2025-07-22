import calculateAbilityModifier from '@helpers/calculateAbilityModifier.js';

function calculateInitiative(initiativeRoll, dexterity)  {
  if (isNaN(initiativeRoll)) {
    return 0;
  }

  return initiativeRoll + calculateAbilityModifier(dexterity);
}

export default calculateInitiative;