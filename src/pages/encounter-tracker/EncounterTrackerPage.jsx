// Styling
import './EncounterTrackerPage.css';

// Framework dependencies
import {useState} from "react";
import {useForm} from "react-hook-form";

// Components
import Panel from "../../components/ui/Panel/Panel.jsx";
import Button from "../../components/ui/Button/Button.jsx";
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
      panelButton={showNextStepButton && currentStepNumber !== steps.length - 1 &&
        <Button
          label="Bevestigen"
          onClick={handleNextStepClick}
          disabled={!isStepValid()}
        />
      }
    >
      {/* Creation steps */}
      {currentStepNumber < steps.length - 1 && renderStepComponent()}

      {/* Encounter tracker */}
      {currentStepNumber === steps.length - 1 && <>
        <table>
          <thead>
            <tr>
              <th>Personage</th>
              <th>Initiatief</th>
              <th>Hit points</th>
              <th>Conditions</th>
              <th>Beheer</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

        <Button
          label="Gevecht beëindigen"
        />
      </>}
    </Panel>
  );
}

export default EncounterTrackerPage;