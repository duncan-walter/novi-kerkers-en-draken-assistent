// Styling
import './EncounterTrackerPage.css';

// Framework dependencies
import {useState} from "react";

// Components
import Panel from "../../components/ui/Panel/Panel.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import EncounterTrackerConditionSelection from "./encounter-tracker-condition-selection/EncounterTrackerConditionSelection.jsx";
import EncounterTrackerCharacterSelection from "./encounter-tracker-character-selection/EncounterTrackerCharacterSelection.jsx";
import EncounterTrackerInitiativeSelection from "./encounter-tracker-initiative-selection/EncounterTrackerInitiativeSelection.jsx";

function EncounterTrackerPage() {
  const steps = [
    ...[
      'Selecteer personages',
      'Vul initiatief worpen in',
      'Selecteer conditions',
      'Speelvolgorde'
    ].map((title, index) => ({
      order: index,
      title: title
    }))
  ];

  const [currentStep, setCurrentStep] = useState(steps[0]);

  const nextStep = () => {
    const step = steps.find(step => step.order === currentStep.order + 1);

    if (step) {
      setCurrentStep(step);
    }
  }

  const renderStepComponent = () => {
    switch (currentStep.order) {
      case 0:
        return (
          <EncounterTrackerCharacterSelection/>
        );
      case 1:
        return (
          <EncounterTrackerInitiativeSelection/>
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
    >
      {/* Creation steps */}
      {currentStep.order < steps.length - 1 && <>
        {renderStepComponent()}
        <Button
          label="Bevestigen"
          onClick={nextStep}
        />
      </>}

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