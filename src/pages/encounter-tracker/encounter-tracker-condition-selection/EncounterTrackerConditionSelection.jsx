// Styling
import './EncounterTrackerConditionSelection.css';

// Icons
import {PencilIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useState} from 'react';

// Components
import Button from '@components/ui/Button/Button.jsx';
import Dialog from '@components/ui/Dialog/Dialog.jsx';
import CharacterCard from '@components/ui/CharacterCard/CharacterCard.jsx';
import ConditionBadge from '@components/ui/ConditionBadge/ConditionBadge.jsx';
import CharacterConditionsFormControl from '@components/form-controls/CharacterConditionsFormControl/CharacterConditionsFormControl.jsx';

function EncounterTrackerConditionSelection({watch, setValue}) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    characterId: null
  });

  const characters = watch('selectedCharacters');
  const characterConditions = (characterId) => watch(`conditions.${characterId}`) ?? [];

  return (
    <div className="encounter-tracker-condition-selection">
      <div className="condition-selection__table">
        <div className="condition-selection__table-header">
          <h2 className="condition-selection__characters-heading">Personage</h2>
          <h2 className="condition-selection__conditions-heading">Conditions</h2>
        </div>

        {characters.map(character => (
          <div key={character.id} className="condition-selection__table-row">
            <div className="condition-selection__character">
              <CharacterCard character={character} variant="medium"/>
            </div>

            <div className="condition-selection__conditions">
              {characterConditions(character.id).map(condition => (
                <ConditionBadge
                  key={`${character.id}.${condition}`}
                  label={condition}
                />
              ))}

              <Button
                icon={PencilIcon}
                variant="secondary"
                onClick={() => setDialog({isOpen: true, characterId: character.id})}
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog
        isOpen={dialog.isOpen}
        closeDialogLabel="Sluiten"
        closeDialog={() => setDialog({isOpen: false, characterId: null})}
      >
        <div className="condition-selection__dialog">
          <CharacterConditionsFormControl
            currentConditions={characterConditions(dialog.characterId)}
            onChange={(updatedConditions) =>
              setValue(`conditions.${dialog.characterId}`, updatedConditions)
            }
          />
        </div>
      </Dialog>
    </div>
  );
}

export default EncounterTrackerConditionSelection;