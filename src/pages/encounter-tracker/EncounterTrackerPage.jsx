// Styling
import './EncounterTrackerPage.css';

// Icons
import {PencilIcon, TrashIcon} from '@phosphor-icons/react';

// Helpers
import calculateInitiative from '@helpers/calculateInitiative.js';

// Framework dependencies
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

// Custom hooks
import {useToaster} from '@contexts/ToasterContext.jsx';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';
import Button from '@components/ui/Button/Button.jsx';
import CharacterCard from '@components/ui/CharacterCard/CharacterCard.jsx';
import ConditionBadge from '@components/ui/ConditionBadge/ConditionBadge.jsx';
import Dialog from '@components/ui/Dialog/Dialog.jsx';
import NumberFormControl from '@components/form-controls/NumberFormControl/NumberFormControl.jsx';
import CharacterConditionsFormControl from '@components/form-controls/CharacterConditionsFormControl/CharacterConditionsFormControl.jsx';

// Step components
import EncounterTrackerConditionSelection from '@pages/encounter-tracker/encounter-tracker-condition-selection/EncounterTrackerConditionSelection.jsx';
import EncounterTrackerCharacterSelection from '@pages/encounter-tracker/encounter-tracker-character-selection/EncounterTrackerCharacterSelection.jsx';
import EncounterTrackerInitiativeSelection from '@pages/encounter-tracker/encounter-tracker-initiative-selection/EncounterTrackerInitiativeSelection.jsx';

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

  // States
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [showNextStepButton, setShowNextStepButton] = useState(true);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    mode: 'inactive',
    character: null
  });

  // Forms
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
  const {
    register: editCharacterRegister,
    handleSubmit: editCharacterHandleSubmit,
    reset: editCharacterReset,
    formState: { errors: editCharacterErrors },
    setValue: editCharacterSetValue,
    watch: editCharacterWatch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newCurrentHitPoints: 0,
      newArmorClass: 0,
      newInitiative: 0,
      newConditions: []
    }
  });

  const {showToast} = useToaster();
  const navigate = useNavigate();

  // Watches
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

    // Underscores are discards, this mechanism separates the deleted initiatives & conditions from te remaining ones.
    const {[dialog.character.id]: _, ...remainingInitiatives} = initiatives;
    setValue('initiatives', remainingInitiatives);

    const {[dialog.character.id]: __, ...remainingConditions} = conditions;
    setValue('conditions', remainingConditions)
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
        onConfirmDialog: onDeleteCharacterSubmit
      }
    }

    if (dialog.mode === 'edit') {
      return {
        ...defaultProperties,
        closeDialogLabel: 'Annuleren',
        confirmDialogLabel: 'Opslaan',
        onConfirmDialog: editCharacterHandleSubmit(onEditCharacterSubmit)
      };
    }

    if (dialog.mode === 'end-encounter') {
      return {
        ...defaultProperties,
        closeDialogLabel: 'Nee',
        confirmDialogLabel: 'Ja',
        onConfirmDialog: onEndEncounterSubmit
      }
    }
  }

  const onEditCharacterSubmit = (data) => {
    const {newCurrentHitPoints, newArmorClass, newInitiative, newConditions } = data;

    const updatedCharacters = selectedCharacters.map(character => {
      return character.id === dialog.character.id
        ? {...character, currentHitPoints: newCurrentHitPoints, armorClass: newArmorClass}
        : character
    });

    const updatedInitiatives = {
      ...initiatives,
      [dialog.character.id]: newInitiative
    };

    const updatedConditions = {
      ...conditions,
      [dialog.character.id]: newConditions
    };

    setValue('selectedCharacters', updatedCharacters);
    setValue('initiatives', updatedInitiatives)
    setValue('conditions', updatedConditions)

    setDialog({isOpen: false, mode: 'inactive', character: null});

    const updatedCharacterName = selectedCharacters.find(character => character.id === dialog.character.id).name;
    showToast(`${updatedCharacterName} voelt zich zo goed als nieuw! Of niet...`, 'success');
  }

  const onDeleteCharacterSubmit = () => {
    handleDeleteCharacter();

    if (dialog.character.id === activeCharacter.id) {
      handleHighlightNextActiveCharacter();
    }

    setDialog({isOpen: false, mode: 'inactive', character: null});
  }

  const onEndEncounterSubmit = () => {
    navigate('/');
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
          onClick={() => {setDialog({isOpen: true, mode: 'end-encounter', character: null})}}
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
              <h2 className="encounter-tracker__centered-heading">HP</h2>
              <h2 className="encounter-tracker__centered-heading">AC</h2>
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

                <div className="encounter-tracker__table-centered-cell">
                  <p>{character.armorClass}</p>
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
                    onClick={() => {
                      editCharacterReset({
                        newCurrentHitPoints: character.currentHitPoints,
                        newArmorClass: character.armorClass,
                        newInitiative: initiatives[character.id],
                        newConditions: conditions[character.id] ?? []
                      });
                      setDialog({isOpen: true, mode: 'edit', character: character});
                    }}
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

          {dialog.mode === 'edit' && (<>
            <h3><b>
              Gevechtseigenschappen van <u>{dialog.character.name}</u>.
            </b></h3>

            <form>
              <NumberFormControl
                id="newCurrentHitPoints"
                name="newCurrentHitPoints"
                label="Huidige HP"
                register={editCharacterRegister}
                error={editCharacterErrors.newCurrentHitPoints}
                validationRules={{
                  required: true,
                  minimumValue: 0,
                  maximumValue: dialog.character.maxHitPoints
                }}
              />

              <NumberFormControl
                id="newArmorClass"
                name="newArmorClass"
                label="Armor class"
                register={editCharacterRegister}
                error={editCharacterErrors.newArmorClass}
                validationRules={{
                  required: true,
                  minimumValue: -10,
                  maximumValue: 50
                }}
              />

              <NumberFormControl
                id="newInitiative"
                name="newInitiative"
                label="Initiatief rol"
                register={editCharacterRegister}
                error={editCharacterErrors.newInitiative}
                validationRules={{
                  required: true,
                  minimumValue: 1,
                  maximumValue: 20
                }}
              />

              <CharacterConditionsFormControl
                currentConditions={editCharacterWatch('newConditions')}
                onChange={(updatedConditions) =>
                  editCharacterSetValue('newConditions', updatedConditions)
                }
              />
            </form>
          </>)}

          {dialog.mode === 'end-encounter' && (<>
            <h3><b>
              Weet je zeker dat je het gevecht wilt beëindigen?
            </b></h3>

            <p><em>
              Dit betekent dat je wordt teruggestuurd naar het hoofdscherm.
            </em></p>

            <p>
              <b>LET OP!</b> Houd er rekening mee dat lopende gevechten momenteel <b>niet worden opgeslagen</b>.
              Je voortgang gaat verloren en kan niet worden hersteld.
            </p>
          </>)}
        </div>
      </Dialog>
    </Panel>
  );
}

export default EncounterTrackerPage;