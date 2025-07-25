// Styling
import './CharacterCard.css';

// Icons
import {UserIcon, SkullIcon, PawPrintIcon, MaskHappyIcon} from '@phosphor-icons/react';

// Helpers
import calculateCharacterLevel from '@helpers/calculateCharacterLevel.js';

function CharacterCard({character, variant = 'large', onClick}) {
  const iconSizes = {
    large: 150,
    medium: 100,
    small: 50
  };

  const iconByCharacterType = {
    0: <UserIcon size={iconSizes[variant]} weight="fill"/>,
    1: <SkullIcon size={iconSizes[variant]} weight="fill"/>,
    2: <PawPrintIcon size={iconSizes[variant]} weight="fill"/>,
    3: <MaskHappyIcon size={iconSizes[variant]} weight="fill"/>
  };

  const characterIcon = iconByCharacterType[character.type] || null;

  return (
    <div className={`character-card character-card--${variant}`} onClick={onClick}>
      <div className="character-card__image">
        {characterIcon}
      </div>
      <div className="character-card__info">
        <p className="character-card__info-name">
          {character.name} (lvl. {calculateCharacterLevel(character.experiencePoints)})
        </p>
        <p className="character-card__info-race-class">{character.race} - {character.class}</p>
      </div>
    </div>
  )
}

export default CharacterCard;