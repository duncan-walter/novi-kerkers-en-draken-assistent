// Styling
import './CharacterForm.css';

// Icons
import {FloppyDiskIcon, XIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useForm} from "react-hook-form";
import {jwtDecode} from "jwt-decode";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";

// Services
import characterTypeService from "../../../services/characterTypeService.js";
import characterClassesService from "../../../services/characterClassesService.js";
import characterSubClassesService from "../../../services/characterSubClassesService.js";
import characterRacesService from "../../../services/characterRacesService.js";

// Helpers and constants
import {firstCharacterToUpperCase} from "../../../helpers/formatCaseHelpers.js";
import {getLocalStorageItem} from "../../../helpers/localStorageHelpers.js";
import {userKey} from "../../../constants/localStorageKeys.js";

// Components
import SelectFormControl from "../../form-controls/SelectFormControl/SelectFormControl.jsx";
import TextFormControl from "../../form-controls/TextFormControl/TextFormControl.jsx";
import SliderFormControl from "../../form-controls/SliderFormControl/SliderFormControl.jsx";
import NumberFormControl from "../../form-controls/NumberFormControl/NumberFormControl.jsx";
import TextareaFormControl from "../../form-controls/TextareaFormControl/TextareaFormControl.jsx";
import CharacterAlignmentFormControl
  from "../../form-controls/CharacterAlignmentFormControl/CharacterAlignmentFormControl.jsx";
import Button from "../../ui/Button/Button.jsx";
import Spinner from "../../ui/Spinner/Spinner.jsx";

function CharacterForm({initialValues, loading, onSubmit, onCancel}) {
  // Character Types
  const {data: types, loading: typesLoading} = useRequestState(
    characterTypeService.getCharacterTypes({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );
  // Character Classes
  const {data: classes, loading: classesLoading} = useRequestState(
    characterClassesService.getCharacterClassesIndex({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );
  // Character Subclasses
  const {data: subClassesData, loading: subClassesLoading} = useRequestState(
    characterSubClassesService.getCharacterSubClassesIndex({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );
  // Character races
  const {data: racesData, loading: racesLoading} = useRequestState(
    characterRacesService.getCharacterRacesIndex({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: {
      errors
    },
    watch
  } = useForm({
    initialValues: initialValues
  });

  const handleFormSubmit = async (characterData) => {
    characterData = {
      ...characterData,
      characterFormUserId: jwtDecode(getLocalStorageItem(userKey).token).userId
    }

    await onSubmit(characterData);
  }

  return (<>
    {typesLoading || classesLoading || subClassesLoading || racesLoading ? (
      <div className="character-form__loading">
        <Spinner size='large'/>
      </div>
    ) : (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="character-form">
          <div className="character-form__left">
            <fieldset className="fieldset">
              <legend className="fieldset__legend">
                Algemene informatie
              </legend>

              <div className="fieldset__content">
                <SelectFormControl
                  id="character-form-type"
                  name="characterFormType"
                  label="Type"
                  placeholder="Selecteer type"
                  register={register}
                  error={errors.characterFormType}
                  options={types && types.map(characterType => ({
                    value: characterType.id,
                    label: firstCharacterToUpperCase(characterType.name)
                  }))}
                  validationRules={{
                    required: true
                  }}
                />

                <TextFormControl
                  id="character-form-name"
                  name="characterFormName"
                  label="Naam"
                  placeholder="Personage naam"
                  register={register}
                  error={errors.characterFormName}
                  validationRules={{
                    required: true,
                    minimumLength: 1,
                    maximumLength: 100
                  }}
                />

                <SelectFormControl
                  id="character-form-class"
                  name="characterFormClass"
                  label="Class"
                  placeholder="Selecteer class"
                  register={register}
                  error={errors.characterFormClass}
                  options={classes && classes.results.map(characterClass => ({
                    value: characterClass.index,
                    label: characterClass.name
                  }))}
                  validationRules={{
                    required: true
                  }}
                />

                <SelectFormControl
                  id="character-form-subclass"
                  name="characterSubclass"
                  label="Subclass"
                  placeholder="Selecteer subclass"
                  register={register}
                  error={errors.characterFormSubclass}
                  options={subClassesData && subClassesData.results.map(characterSubClass => ({
                    value: characterSubClass.index,
                    label: characterSubClass.name
                  }))}
                />

                <SelectFormControl
                  id="character-form-race"
                  name="characterFormRace"
                  label="Ras"
                  placeholder="Selecteer ras"
                  register={register}
                  error={errors.characterFormRace}
                  options={racesData && racesData.results.map(characterRace => ({
                    value: characterRace.index,
                    label: characterRace.name
                  }))}
                  validationRules={{
                    required: true
                  }}
                />
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset__legend">
                Vaardigheden
              </legend>

              <div className="fieldset__content">
                <div className="character-form__abilities-row">
                  <SliderFormControl
                    id="character-form-charisma"
                    name="characterFormCharisma"
                    label="Charisma"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormCharisma}
                  />

                  <SliderFormControl
                    id="character-form-constitution"
                    name="characterFormConstitution"
                    label="Constitution"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormConstitution}
                  />

                  <SliderFormControl
                    id="character-form-dexterity"
                    name="characterFormDexterity"
                    label="Dexterity"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormDexterity}
                  />
                </div>

                <div className="character-form__abilities-row">
                  <SliderFormControl
                    id="character-form-intelligence"
                    name="characterFormIntelligence"
                    label="Intelligence"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormIntelligence}
                  />

                  <SliderFormControl
                    id="character-form-strength"
                    name="characterFormStrength"
                    label="Strength"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormStrength}
                  />

                  <SliderFormControl
                    id="character-form-wisdom"
                    name="characterFormWisdom"
                    label="Wisdom"
                    minimumValue={0}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormWisdom}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset__legend">
                Gevechtseigenschappen
              </legend>

              <div className="fieldset__content fieldset__content-row">
                <NumberFormControl
                  id="character-form-proficiency-bonus"
                  name="characterFormProficiencyBonus"
                  label="Proficiency bonus"
                  register={register}
                  error={errors.characterFormProficiencyBonus}
                  validationRules={{
                    required: true,
                    minimumValue: 2,
                    maximumValue: 6
                  }}
                />

                <NumberFormControl
                  id="character-form-armor-class"
                  name="characterFormArmorClass"
                  label="Armor class"
                  register={register}
                  error={errors.characterFormArmorClass}
                  validationRules={{
                    required: true,
                    minimumValue: -10,
                    maximumValue: 50
                  }}
                />

                <NumberFormControl
                  id="character-form-max-hit-points"
                  name="characterFormMaxHitPoints"
                  label="Max Hit Points"
                  register={register}
                  error={errors.characterFormMaxHitPoints}
                  validationRules={{
                    required: true,
                    minimumValue: 1,
                    maximumValue: 1000
                  }}
                />

                <NumberFormControl
                  id="character-form-current-hit-points"
                  name="characterFormCurrentHitPoints"
                  label="Current Hit Points"
                  register={register}
                  error={errors.characterFormCurrentHitPoints}
                  validationRules={{
                    required: true,
                    minimumValue: 0,
                    maximumValue: 1000
                  }}
                />

                <NumberFormControl
                  id="character-form-experience-points"
                  name="characterFormExperiencePoints"
                  label="Experience Points"
                  register={register}
                  error={errors.characterFormExperiencePoints}
                  validationRules={{
                    required: true,
                    minimumValue: 0,
                    maximumValue: 355000
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="character-form__right">
            <fieldset className="fieldset">
              <legend className="fieldset__legend">
                Persoonlijke eigenschappen
              </legend>

              <div className="fieldset__content">
                <TextFormControl
                  id="character-form-size"
                  name="characterFormSize"
                  label="Size"
                  placeholder="0'0&quot;"
                  register={register}
                  error={errors.characterFormSize}
                  validationRules={{
                    maximumLength: 50
                  }}
                />

                <CharacterAlignmentFormControl
                  id="character-form-alignment"
                  name="characterFormAlignment"
                  label="Alignment"
                  register={register}
                  setValue={setValue}
                  error={errors.characterFormAlignment}
                  validationRules={{
                    required: true
                  }}
                />
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset__legend">
                Bezittingen
              </legend>

              <div className="fieldset__content fieldset__content-row">
                {/* TODO: Should be an image, find a nice way to support this (icon label) */}
                <NumberFormControl
                  id="character-form-copper-pieces"
                  name="characterFormCopperPieces"
                  label="cp"
                  register={register}
                  error={errors.characterFormCopperPieces}
                  validationRules={{
                    minimumValue: 0,
                    maximumValue: 10000
                  }}
                />

                <NumberFormControl
                  id="character-form-silver-pieces"
                  name="characterFormSilverPieces"
                  label="sp"
                  register={register}
                  error={errors.characterFormSilverPieces}
                  validationRules={{
                    minimumValue: 0,
                    maximumValue: 10000
                  }}
                />

                <NumberFormControl
                  id="character-form-electrum-pieces"
                  name="characterFormElectrumPieces"
                  label="ep"
                  register={register}
                  error={errors.characterFormElectrumPieces}
                  validationRules={{
                    minimumValue: 0,
                    maximumValue: 10000
                  }}
                />

                <NumberFormControl
                  id="character-form-gold-pieces"
                  name="characterFormGoldPieces"
                  label="gp"
                  register={register}
                  error={errors.characterFormGoldPieces}
                  validationRules={{
                    minimumValue: 0,
                    maximumValue: 10000
                  }}
                />

                <NumberFormControl
                  id="character-form-platinum-pieces"
                  name="characterFormPlatinumPieces"
                  label="pp"
                  register={register}
                  error={errors.characterFormPlatinumPieces}
                  validationRules={{
                    minimumValue: 0,
                    maximumValue: 10000
                  }}
                />
              </div>

              {/* TODO: Implement additional belongings */}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset__legend">Extra's</legend>

              <div className="fieldset__content">
                <TextareaFormControl
                  id="character-form-notes"
                  name="characterFormNotes"
                  label="Notities"
                  placeholder="Vul hier notities in"
                  register={register}
                  error={errors.characterFormNotes}
                  validationRules={{
                    maximumLength: 1000
                  }}
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div className="character-from__controls">
          <Button
            type="button"
            label="Annuleren"
            onClick={onCancel}
            icon={XIcon}
          />

          <Button
            type="submit"
            label="Opslaan"
            loading={loading}
            icon={FloppyDiskIcon}
          />
        </div>
      </form>
    )}
  </>);
}

export default CharacterForm;