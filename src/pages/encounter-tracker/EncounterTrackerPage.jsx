// Styling
import './EncounterTrackerPage.css';

// Icons
import {PencilIcon, TrashIcon} from "@phosphor-icons/react";

// Helpers
import calculateInitiative from "../../helpers/calculateInitiative.js";

// Framework dependencies
import {useState} from "react";
import {useForm} from "react-hook-form";

// Components
import Panel from "../../components/ui/Panel/Panel.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import CharacterCard from "../../components/ui/CharacterCard/CharacterCard.jsx";
import ConditionBadge from "../../components/ui/ConditionBadge/ConditionBadge.jsx";

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

            {[...selectedCharacters].sort((left, right) => {
              return calculateInitiative(initiatives[right.id], right.dexterity) - calculateInitiative(initiatives[left.id], left.dexterity);
            }).map(character => (
              <div
                key={character.id}
                className="encounter-tracker__table-row"
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
                  <Button icon={PencilIcon}/>
                  <Button icon={TrashIcon}/>
                </div>
              </div>
            ))}
          </div>

          <Button
            label="Volgende beurt"
          />
        </div>
      )}
    </Panel>
  );
}

export default EncounterTrackerPage;