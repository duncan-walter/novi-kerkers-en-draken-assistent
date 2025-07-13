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
      order: index,
      title: title
    }))
  ];

  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [showNextStepButton, setShowNextStepButton] = useState(true);

  const {
    register,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      selectedCharacters: [],
      initiatives: {},
      conditions: {}
    }
  });

  const selectedCharacters = watch('selectedCharacters');

  const nextStep = () => {
    const step = steps.find(step => step.order === currentStep.order + 1);

    if (step) {
      setCurrentStep(step);
    }
  }

  const isStepValid = () => {
    switch (currentStep.order) {
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
    switch (currentStep.order) {
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
      title={currentStep.title}
      panelButton={showNextStepButton && currentStep.order !== steps.length - 1 &&
        <Button
          label="Bevestigen"
          onClick={nextStep}
          disabled={!isStepValid()}
        />
      }
    >
      {/* Creation steps */}
      {currentStep.order < steps.length - 1 && renderStepComponent()}

      {/* Encounter tracker */}
      {currentStep.order === steps.length - 1 && <>
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