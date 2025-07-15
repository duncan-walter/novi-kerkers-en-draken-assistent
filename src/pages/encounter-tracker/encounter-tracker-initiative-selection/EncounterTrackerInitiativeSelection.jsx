// Styling
import './EncounterTrackerInitiativeSelection.css';

// Icons
import D20SVG from '/src/assets/icons/d20.svg?react';

// Helpers
import calculateInitiative from "../../../helpers/calculateInitiative.js";

// Framework dependencies
import {useState} from "react";

// Components
import CharacterCard from "../../../components/ui/CharacterCard/CharacterCard.jsx";
import NumberFormControl from "../../../components/form-controls/NumberFormControl/NumberFormControl.jsx";

function EncounterTrackerInitiativeSelection({setValue, watch, register, errors}) {
  const [spinningDice, setSpinningDice] = useState([]);

  const characters = watch('selectedCharacters');
  const initiatives = watch('initiatives');

  const rollForInitiative = (characterId) => {
    setSpinningDice(currentSpinningDice => [...currentSpinningDice, characterId]);

    setTimeout(() => {
      setSpinningDice(currentSpinningDice => {
        return [...currentSpinningDice.filter(currentSpinningDie => currentSpinningDie !== characterId)];
      });
    }, 600);

    const rolledInitiative = Math.floor(Math.random() * 20 + 1);
    setValue(`initiatives.${characterId}`, rolledInitiative, {shouldValidate: true});
  }

  return (
    <div className="encounter-tracker-initiative-selection">
      <div className="initiative-selection__table">
        <div className="initiative-selection__table-header">
          <h2 className="initiative-selection__characters-heading">Personage</h2>
          <h2 className="initiative-selection__rolled-initiative-heading">Initiatiefworp</h2>
          <h2 className="initiative-selection__total-initiative-heading">Initiatief totaal</h2>
        </div>

        {characters.map(character => (
          <div key={character.id} className="initiative-selection__table-row">
            <div className="initiative-selection__character">
              <CharacterCard character={character} variant="medium"/>
            </div>

            <div className="initiative-selection__rolled-initiative">
              <div className="initiative-selection__rolled-initiative-wrapper">
                <NumberFormControl
                  id={`initiatives.${character.id}`}
                  name={`initiatives.${character.id}`}
                  placeholder="0"
                  register={register}
                  error={errors?.initiatives?.[character.id]}
                  validationRules={{
                    required: true,
                    minimumValue: 1,
                    maximumValue: 20
                  }}
                />

                <D20SVG
                  className={`initiative-selection__roll-for-initiative ${spinningDice.includes(character.id) ? 'rolling-die' : ''}`}
                  onClick={() => rollForInitiative(character.id)}
                />
              </div>
            </div>

            <p className="initiative-selection__total-initiative">
              {calculateInitiative(initiatives[character.id], character.dexterity)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EncounterTrackerInitiativeSelection;