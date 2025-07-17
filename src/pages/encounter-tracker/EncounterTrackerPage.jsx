// Styling
import './EncounterTrackerPage.css';

// Icons
import {PencilIcon, TrashIcon} from "@phosphor-icons/react";

// Helpers
import calculateInitiative from "../../helpers/calculateInitiative.js";

// Framework dependencies
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

// Components
import Panel from "../../components/ui/Panel/Panel.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import CharacterCard from "../../components/ui/CharacterCard/CharacterCard.jsx";
import ConditionBadge from "../../components/ui/ConditionBadge/ConditionBadge.jsx";
import Dialog from "../../components/ui/Dialog/Dialog.jsx";

// Step components
import EncounterTrackerConditionSelection from "./encounter-tracker-condition-selection/EncounterTrackerConditionSelection.jsx";
import EncounterTrackerCharacterSelection from "./encounter-tracker-character-selection/EncounterTrackerCharacterSelection.jsx";
import EncounterTrackerInitiativeSelection from "./encounter-tracker-initiative-selection/EncounterTrackerInitiativeSelection.jsx";

function EncounterTrackerPage() {
  const steps = [
    ...[
      {title: 'Selecteer ten minste 2 personages', formKey: 'selectedCharacters'},
      {title: 'Vul initiatief worpen in', formKey: 'initiatives'},
      {title: 'Selecteer conditions', formKey: 'conditions'},
      {title: 'Speelvolgorde', formKey: null}
    ].map(({title, formKey}, index) => ({
      number: index,
      title: title,
      formKey: formKey,
    }))
  ];

  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [showNextStepButton, setShowNextStepButton] = useState(true);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    mode: 'inactive',
    character: null
  });

  const {
    register,
    setValue,
    watch,
    formState: {errors},
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      selectedCharacters: [],
      initiatives: {},
      conditions: {}
    }
  });

  const selectedCharacters = watch('selectedCharacters');
  const initiatives = watch('initiatives');
  const conditions = watch('conditions');

  // Derived state (newly learnt concept).
  const isLastStep = currentStepNumber === steps.length - 1;
  const sortedCharacters = [...selectedCharacters].sort((left, right) => {
    return calculateInitiative(initiatives[right.id], right.dexterity) - calculateInitiative(initiatives[left.id], left.dexterity);
  });

  const handleNextStepClick = async () => {
    // Manually trigger current step validation in case the user has not interacted with the current step.
    const isCurrentStepValid = await trigger(steps[currentStepNumber].formKey);

    if (!isCurrentStepValid) {
      return;
    }

    const nextStep = steps.find(step => step.number === currentStepNumber + 1);

    if (nextStep) {
      setCurrentStepNumber(nextStep.number);
    }
  }

  const handleHighlightNextActiveCharacter = () => {
    const currentActiveCharacterIndex = sortedCharacters.findIndex(character => character.id === activeCharacter.id);
    const nextActiveCharacterIndex = (currentActiveCharacterIndex + 1) % sortedCharacters.length;
    setActiveCharacter(sortedCharacters[nextActiveCharacterIndex]);
  }

  const handleDeleteCharacter = () => {
    setValue('selectedCharacters',
      selectedCharacters.filter(selectedCharacter => selectedCharacter.id !== dialog.character.id)
    );
  }

  const isStepValid = () => {
    switch (currentStepNumber) {
      case 0:
        // TODO: See if this can be hooked up to React Hook From. If so, step validation can be done dynamically by using the formKey defined in the steps.
        return selectedCharacters.length >= 2;
      case 1:
        return !errors.initiatives;
      case 2:
        // This step cannot be invalid as of now.
        return true
      default:
        return false;
    }
  }

  const renderStepComponent = () => {
    switch (currentStepNumber) {
      case 0:
        return (
          <EncounterTrackerCharacterSelection
            setValue={setValue}
            watch={watch}
            hideNextStepButton={() => setShowNextStepButton(false)}
          />
        );
      case 1:
        return (
          <EncounterTrackerInitiativeSelection
            setValue={setValue}
            watch={watch}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <EncounterTrackerConditionSelection
            setValue={setValue}
            watch={watch}
          />
        );
      default:
        return null;
    }
  }

  const getDialogProperties = () => {
    const defaultProperties = {
      isOpen: dialog.isOpen,
      closeDialogLabel: 'Sluiten',
      closeDialog: () => setDialog({isOpen: false, mode: 'inactive', character: null})
    }

    if (dialog.mode === 'delete') {
      return {
        ...defaultProperties,
        closeDialogLabel: 'Nee',
        confirmDialogLabel: 'Ja',
        onConfirmDialog: () => {
          handleDeleteCharacter();

          if (dialog.character.id === activeCharacter.id) {
            handleHighlightNextActiveCharacter();
          }

          setDialog({isOpen: false, mode: 'inactive', character: null});
        }
      }
    }

    if (dialog.mode === 'edit') {
      return {
        ...defaultProperties
      }
    }
  }

  useEffect(() => {
    if (isLastStep) {
      setActiveCharacter(sortedCharacters[0]);
    }
  }, [isLastStep]);

  return (
    <Panel
      title={steps[currentStepNumber].title}
      panelButton={showNextStepButton && isLastStep ? (
        <Button
          label="Gevecht beëindigen"
        />
      ) : (
        <Button
          label="Bevestigen"
          onClick={handleNextStepClick}
          disabled={!isStepValid()}
        />
      )}
    >
      {/* Creation steps */}
      {!isLastStep && renderStepComponent()}

      {/* Encounter tracker */}
      {isLastStep && (
        <div className="encounter-tracker">
          <div className="encounter-tracker__table">
            <div className="encounter-tracker__table-header">
              <h2 className="encounter-tracker__heading">Personage</h2>
              <h2 className="encounter-tracker__centered-heading">Initiatief</h2>
              <h2 className="encounter-tracker__centered-heading">Hit points</h2>
              <h2 className="encounter-tracker__heading">Conditions</h2>
              <h2 className="encounter-tracker__heading">Beheer</h2>
            </div>

            {sortedCharacters.map(character => (
              <div
                key={character.id}
                className={`encounter-tracker__table-row ${activeCharacter?.id === character.id ? 'encounter-tracker__active-character' : ''}`}
              >
                <div className="encounter-tracker__table-cell">
                  <CharacterCard character={character} variant='small'/>
                </div>

                <div className="encounter-tracker__table-centered-cell">
                  <p>{calculateInitiative(initiatives[character.id], character.dexterity)}</p>
                </div>

                <div className="encounter-tracker__table-centered-cell">
                  <p>{character.currentHitPoints}/{character.maxHitPoints}</p>
                </div>

                <div className="encounter-tracker__table-cell">
                  <div className="encounter-tracker__conditions-cell">
                    {conditions[character.id]?.map(condition => (
                      <ConditionBadge
                        key={`${condition}.${character.id}`}
                        label={condition}
                      />
                    ))}
                  </div>
                </div>

                <div className="encounter-tracker__table-cell encounter-tracker__management-cell">
                  <Button
                    icon={PencilIcon}
                    onClick={() => setDialog({isOpen: true, mode: 'edit', character: character})}
                  />

                  <Button
                    icon={TrashIcon}
                    onClick={() => setDialog({isOpen: true, mode: 'delete', character: character})}
                    disabled={selectedCharacters.length <= 2}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            label="Volgende beurt"
            onClick={handleHighlightNextActiveCharacter}
          />
        </div>
      )}

      {/* Note:
        * Dialog can be filled differently dependent on the mode.
        * The content is defined below, while the properties are defined in the getDialogProperties function
        */}
      <Dialog {...getDialogProperties()}>
        <div className="encounter-tracker__dialog">
          {dialog.mode === 'delete' && (<>
            <h3><b>
              Weet je zeker dat {dialog.character.name} niet meer meedoet?
            </b></h3>
            <p><em>
              Dit betekent dat {dialog.character.name} uit het overzicht wordt verwijderd.
              Als {dialog.character.name} op dit moment aan de beurt is, gaat de beurt automatisch naar het volgende
              personage.
            </em></p>
          </>)}

          {dialog.mode === 'edit' && (
            <h3><b>
              Gevechtseigenschappen van {dialog.character.name}.
            </b></h3>
          )}
        </div>
      </Dialog>
    </Panel>
  );
}

export default EncounterTrackerPage;