import levelExperiencePointsThresholds from '../constants/characterLevelThresholds.js';

function calculateCharacterLevel(experiencePoints) {
  let currentLevel = 1;

  for (let i = 0; i < levelExperiencePointsThresholds.length; i++) {
    const threshold = levelExperiencePointsThresholds[i];
    if (experiencePoints >= threshold.experiencePoints) {
      currentLevel = threshold.level
    }
  }

  return currentLevel
}

export default calculateCharacterLevel;