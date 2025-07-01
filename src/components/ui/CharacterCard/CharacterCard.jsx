// Styling
import './CharacterCard.css';

// Icons
import {UserIcon, SkullIcon, PawPrintIcon, MaskHappyIcon} from '@phosphor-icons/react';

// Helpers
import calculateCharacterLevel from "../../../helpers/calculateCharacterLevel.js";

function CharacterCard({character, onClick}) {
  const iconByCharacterType = {
    0: <UserIcon size="150" weight="fill"/>,
    1: <SkullIcon size="150" weight="fill"/>,
    2: <PawPrintIcon size="150" weight="fill"/>,
    3: <MaskHappyIcon size="150" weight="fill"/>
  };

  const characterIcon = iconByCharacterType[character.type] || null;

  return (
    <div className="character-card" onClick={onClick}>
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