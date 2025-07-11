import './CharacterAbility.css';

import calculateAbilityModifier from "../../../helpers/calculateAbilityModifier.js";

function CharacterAbility({label, value}) {
  return (
    <div className="character-ability">
      <dt>{label}</dt>

      <div className="character-ability__value">
        <div className="character-ability__modifier">
          {calculateAbilityModifier(value, true)}
        </div>

        <dd>{value}</dd>
      </div>
    </div>
  );
}

export default CharacterAbility;