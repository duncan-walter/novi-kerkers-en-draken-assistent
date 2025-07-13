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
      'Selecteer ten minste 2 personages',
      'Vul initiatief worpen in',
      'Selecteer conditions',
      'Speelvolgorde'
    ].map((title, index) => ({
      number: index,
      title: title
    }))
  ];

  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [showNextStepButton, setShowNextStepButton] = useState(true);

  const {
    register,
    setValue,
    watch,
    formState: {errors}
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
    const nextStep = steps.find(step => step.number === currentStepNumber + 1);

    if (nextStep) {
      setCurrentStepNumber(nextStep.number);
    }
  }

  const isStepValid = () => {
    switch (currentStepNumber) {
      case 0:
        return selectedCharacters.length >= 2;
      case 1:
        return !errors.initiatives;
      case 2:
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
          <EncounterTrackerConditionSelection/>
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