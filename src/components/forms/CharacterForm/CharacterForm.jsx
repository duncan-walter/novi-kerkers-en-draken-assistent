// Styling
import './CharacterForm.css';

// Images / Icons
import CopperPiece from '@assets/images/copper-piece.png'
import SilverPiece from '@assets/images/silver-piece.png'
import ElectrumPiece from '@assets/images/electrum-piece.png'
import GoldPiece from '@assets/images/gold-piece.png'
import PlatinumPiece from '@assets/images/platinum-piece.png'
import {FloppyDiskIcon, XIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {jwtDecode} from 'jwt-decode';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';

// Services
import characterTypeService from "../../../services/characterTypeService.js";
import characterClassesService from "../../../services/characterClassesService.js";
import characterSubClassesService from "../../../services/characterSubClassesService.js";
import characterRacesService from "../../../services/characterRacesService.js";

// Helpers and constants
import mapFormKeysToAPIKeys from '@helpers/mapFormKeysToAPIKeys.js';
import {firstCharacterToUpperCase} from '@helpers/formatCaseHelpers.js';
import {getLocalStorageItem} from '@helpers/localStorageHelpers.js';
import {userKey} from '@constants/localStorageKeys.js';

// Components
import SelectFormControl from "../../form-controls/SelectFormControl/SelectFormControl.jsx";
import TextFormControl from "../../form-controls/TextFormControl/TextFormControl.jsx";
import SliderFormControl from "../../form-controls/SliderFormControl/SliderFormControl.jsx";
import NumberFormControl from "../../form-controls/NumberFormControl/NumberFormControl.jsx";
import TextareaFormControl from "../../form-controls/TextareaFormControl/TextareaFormControl.jsx";
import CharacterAlignmentFormControl from "../../form-controls/CharacterAlignmentFormControl/CharacterAlignmentFormControl.jsx";
import RepeatingTextFormControl from "../../form-controls/RepeatingTextFormControl/RepeatingTextFormControl.jsx";
import Button from "../../ui/Button/Button.jsx";
import Spinner from "../../ui/Spinner/Spinner.jsx";

/* Note:
 * For the initialValues I considered just supplying the character id and let this component fetch the data itself. But...
 * This form is used on the character detail page to update characters, that page must be able to display a read and edit mode.
 * That means that this form would also need to implement a read mode. But that makes this component less pure since it is not just a form anymore.
 * Therefore I opted to feed this component with data instead, so the implementing component is responsible for fetching the data.
 */
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
    unregister,
    setValue,
    reset,
    formState: {
      errors
    },
    watch
  } = useForm({
    defaultValues: {
      characterFormCharisma: 10,
      characterFormConstitution: 10,
      characterFormDexterity: 10,
      characterFormIntelligence: 10,
      characterFormStrength: 10,
      characterFormWisdom: 10
    }
  });

  useEffect(() => {
    if (initialValues) {
      mapFormKeysToAPIKeys(initialValues, 'characterForm', true);
      reset({...initialValues});
    }
  }, [initialValues]);

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
                  name="characterFormSubclass"
                  label="Subclass"
                  placeholder="Selecteer subclass"
                  register={register}
                  error={errors.characterFormSubclass}
                  options={subClassesData && subClassesData.results.map(characterSubclass => ({
                    value: characterSubclass.index,
                    label: characterSubclass.name
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
                    minimumValue={1}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormCharisma}
                  />

                  <SliderFormControl
                    id="character-form-constitution"
                    name="characterFormConstitution"
                    label="Constitution"
                    minimumValue={1}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormConstitution}
                  />

                  <SliderFormControl
                    id="character-form-dexterity"
                    name="characterFormDexterity"
                    label="Dexterity"
                    minimumValue={1}
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
                    minimumValue={1}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormIntelligence}
                  />

                  <SliderFormControl
                    id="character-form-strength"
                    name="characterFormStrength"
                    label="Strength"
                    minimumValue={1}
                    maximumValue={30}
                    register={register}
                    watch={watch}
                    error={errors.characterFormStrength}
                  />

                  <SliderFormControl
                    id="character-form-wisdom"
                    name="characterFormWisdom"
                    label="Wisdom"
                    minimumValue={1}
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
                  watch={watch}
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
                <div className="character-form__currency">
                  <NumberFormControl
                    id="character-form-copper-pieces"
                    name="characterFormCopperPieces"
                    label="CP"
                    register={register}
                    error={errors.characterFormCopperPieces}
                    validationRules={{
                      minimumValue: 0,
                      maximumValue: 10000
                    }}
                  />
                  <div className="character-form__currency-image">
                    <img src={CopperPiece} alt="Copper Piece"/>
                  </div>
                </div>

                <div className="character-form__currency">
                  <NumberFormControl
                    id="character-form-silver-pieces"
                    name="characterFormSilverPieces"
                    label="SP"
                    register={register}
                    error={errors.characterFormSilverPieces}
                    validationRules={{
                      minimumValue: 0,
                      maximumValue: 10000
                    }}
                  />
                  <div className="character-form__currency-image">
                    <img src={SilverPiece} alt="Silver Piece"/>
                  </div>
                </div>

                <div className="character-form__currency">
                  <NumberFormControl
                    id="character-form-electrum-pieces"
                    name="characterFormElectrumPieces"
                    label="EP"
                    register={register}
                    error={errors.characterFormElectrumPieces}
                    validationRules={{
                      minimumValue: 0,
                      maximumValue: 10000
                    }}
                  />
                  <div className="character-form__currency-image">
                    <img src={ElectrumPiece} alt="Electrum Piece"/>
                  </div>
                </div>

                <div className="character-form__currency">
                  <NumberFormControl
                    id="character-form-gold-pieces"
                    name="characterFormGoldPieces"
                    label="GP"
                    register={register}
                    error={errors.characterFormGoldPieces}
                    validationRules={{
                      minimumValue: 0,
                      maximumValue: 10000
                    }}
                  />
                  <div className="character-form__currency-image">
                    <img src={GoldPiece} alt="Gold Piece"/>
                  </div>
                </div>

                <div className="character-form__currency">
                  <NumberFormControl
                    id="character-form-platinum-pieces"
                    name="characterFormPlatinumPieces"
                    label="PP"
                    register={register}
                    error={errors.characterFormPlatinumPieces}
                    validationRules={{
                      minimumValue: 0,
                      maximumValue: 10000
                    }}
                  />
                  <div className="character-form__currency-image">
                    <img src={PlatinumPiece} alt="Platinum Piece"/>
                  </div>
                </div>
              </div>

              <div className="fieldset__content">
                <div className={initialValues && 'character-form__not-supported'}>
                  {initialValues &&
                    <div className="character-form__not-supported-message">
                      <p>Door een technische limitatie kan de uitrusting van een personage niet worden aangepast.</p>
                    </div>
                  }

                  <RepeatingTextFormControl
                    id="character-form-character-possessions"
                    name="characterFormCharacterPossessions"
                    label="Uitrusting"
                    register={register}
                    unregister={unregister}
                    watch={watch}
                    errors={errors}
                    validationRules={{
                      minimumLength: 1,
                      maximumLength: 255
                    }}
                  />
                </div>
              </div>
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
            disabled={Object.keys(errors).length > 0}
          />
        </div>
      </form>
    )}
  </>);
}

export default CharacterForm;