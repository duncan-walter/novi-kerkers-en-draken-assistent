// Styling
import './EncounterTrackerConditionSelection.css';

// Icons
import {PencilIcon} from "@phosphor-icons/react";

// Framework dependencies
import {useState} from "react";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";

// Services
import characterConditionsService from "../../../services/characterConditionsService.js";

// Components
import Button from "../../../components/ui/Button/Button.jsx";
import Dialog from "../../../components/ui/Dialog/Dialog.jsx";
import CharacterCard from "../../../components/ui/CharacterCard/CharacterCard.jsx";
import ConditionBadge from "../../../components/ui/ConditionBadge/ConditionBadge.jsx";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";

function EncounterTrackerConditionSelection({watch, setValue}) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    characterId: null
  });
  const {data: conditionsFromAPI, loading: conditionsLoading} = useRequestState(
    characterConditionsService.getConditionsIndex({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );

  const characters = watch('selectedCharacters');
  const characterConditions = (characterId) => watch(`conditions.${characterId}`) ?? [];

  const handleConditionUpdate = (characterId, condition, action) => {
    if (characterId === null || !['add', 'remove'].includes(action)) {
      return
    }

    const existingConditions = characterConditions(characterId);
    const updatedConditions = action === 'add'
      ? [...existingConditions, condition]
      : existingConditions.filter(c => c !== condition);

    setValue(`conditions.${characterId}`, updatedConditions);
  };

  const availableCharacterConditions = (characterId) => {
    if (!conditionsFromAPI || conditionsLoading) {
      return [];
    }

    return conditionsFromAPI.results.filter(conditionFromAPI => !characterConditions(characterId).includes(conditionFromAPI.name));
  }

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
          {conditionsLoading && <Spinner size='large'/>}
          {!conditionsLoading && (<>
            <section>
              <h3>Huidige conditions:</h3>
              <div className="condition-selection__dialog-conditions">
                {characterConditions(dialog.characterId).map(condition => (
                  <ConditionBadge
                    key={`${dialog.characterId}.${condition}`}
                    label={condition}
                    onClick={() => handleConditionUpdate(dialog.characterId, condition, 'remove')}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3>Beschikbare conditions:</h3>
              <div className="condition-selection__dialog-conditions">
                {availableCharacterConditions(dialog.characterId).map(condition => (
                  <ConditionBadge
                    key={`${dialog.characterId}.${condition.name}`}
                    label={condition.name}
                    onClick={() => handleConditionUpdate(dialog.characterId, condition.name, 'add')}
                  />
                ))}
              </div>
            </section>

            <p>
              Klik op een condition om te (de)selecteren.
            </p>
          </>)}
        </div>
      </Dialog>
    </div>
  );
}

export default EncounterTrackerConditionSelection;