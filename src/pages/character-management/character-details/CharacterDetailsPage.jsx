// Styling
import './CharacterDetailsPage.css';

// Icons
import {PencilIcon, XIcon} from '@phosphor-icons/react';
import CopperPiece from '@assets/images/copper-piece.png';
import SilverPiece from '@assets/images/silver-piece.png';
import ElectrumPiece from '@assets/images/electrum-piece.png';
import GoldPiece from '@assets/images/gold-piece.png';
import PlatinumPiece from '@assets/images/platinum-piece.png';

// Framework dependencies
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';
import {useToaster} from '@contexts/ToasterContext.jsx';

// Services
import characterService from '@services/characterService.js';
import characterPossessionsService from '@services/characterPossessionsService.js';
import characterTypeService from '@services/characterTypeService.js';

// Helpers and constants
import mapFormKeysToAPIKeys from '@helpers/mapFormKeysToAPIKeys.js';
import showDefaultStatusCodeToast from '@helpers/showDefaultStatusCodeToast.js';
import calculateCharacterLevel from "@helpers/calculateCharacterLevel.js";
import {firstCharacterToUpperCase} from '@helpers/formatCaseHelpers.js';
import {removeLocalStorageItem} from '@helpers/localStorageHelpers.js';
import {charactersKey} from '@constants/localStorageKeys.js';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';
import Button from '@components/ui/Button/Button.jsx';
import Spinner from '@components/ui/Spinner/Spinner.jsx';
import CharacterForm from '@components/forms/CharacterForm/CharacterForm.jsx';
import {CharacterAlignmentDetails} from '@components/form-controls/CharacterAlignmentFormControl/CharacterAlignmentFormControl.jsx';
import CharacterAbility from '@components/ui/CharacterAbility/CharacterAbility.jsx';

function CharacterDetailsPage() {
  const [mode, setMode] = useState('read');
  const [initialValues, setInitialValues] = useState(null);

  const params = useParams();
  const {showToast} = useToaster();

  // Get character
  const {
    data: character,
    loading: getCharacterLoading,
    error: getCharacterError,
    executeRequest: getCharacter
  } = useRequestState(
    characterService.getCharacterById(params.id, {useCache: true}),
    {
      executeOnMount: false,
      isAbortable: true
    }
  );
  // Get character possessions
  const {
    data: characterPossessions,
    loading: getCharacterPossessionsLoading,
    error: getCharacterPossessionsError,
    executeRequest: getCharacterPossessions
  } = useRequestState(
    characterPossessionsService.getCharacterPossessionsById(params.id, {useCache: true}),
    {
      executeOnMount: false,
      isAbortable: true
    }
  );
  // Update character
  const {
    data: updatedCharacter,
    statusCode: updateCharacterStatusCode,
    loading: updateCharacterLoading,
    error: updateCharacterError,
    executeRequest: updateCharacter
  } = useRequestState(
    characterService.updateCharacter,
    {
      executeOnMount: false,
      isAbortable: false
    }
  );
  // Get character types
  const {data: characterTypes, loading: characterTypesLoading} = useRequestState(
    characterTypeService.getCharacterTypes({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );

  // Character possessions are not updated because of a bug in the NOVI Backend API. The API can generate duplicate ids.
  const handleUpdateSubmit = async (characterFormData) => {
    mapFormKeysToAPIKeys(characterFormData, 'characterForm');

    // Character possessions are deleted before sending the update character request to prevent sending data that is not used.
    if (characterFormData.characterPossessions) {
      delete characterFormData.characterPossessions;
    }

    const updatedCharacter = await updateCharacter(characterFormData);

    // Manually invalidate characters cache and retrieve data again
    removeLocalStorageItem(charactersKey);
    removeLocalStorageItem(`${charactersKey}/${updatedCharacter.id}`);
    await getCharacter();
    await getCharacterPossessions();
    setMode('read');
  }

  const handleUpdateCancel = () => {
    setMode('read');
  }

  const formatCharacterType = (currentCharacterTypeId) => {
    const foundCharacterType = characterTypes.find(characterType => characterType.id.toString() === currentCharacterTypeId.toString());
    const characterTypeName = foundCharacterType?.name ?? currentCharacterTypeId;

    return firstCharacterToUpperCase(characterTypeName);
  }

  // Generic error from useRequestState.
  useEffect(() => {
    [getCharacterError, getCharacterPossessionsError, updateCharacterError].forEach(error => {
      if (error) {
        showToast(error, 'error');
      }
    });
  }, [getCharacterError, getCharacterPossessionsError, updateCharacterError]);

  // Toast messages after update.
  useEffect(() => {
    if (updateCharacterStatusCode) {
      showDefaultStatusCodeToast(
        updateCharacterStatusCode,
        showToast,
        `${updatedCharacter.name} is klaar voor een nieuw hoofdstuk!`
      );
    }
  }, [updateCharacterStatusCode])

  // Get character and it's possessions when the id parameter is ready.
  useEffect(() => {
    if (params.id) {
      getCharacter();
      getCharacterPossessions();
    }
  }, [params.id])

  useEffect(() => {
    if (!getCharacterLoading && !getCharacterPossessionsLoading && character && characterPossessions) {
      // Because duplicate ids are generated by the backend the index is temporarily used to be able to render the possessions.
      // In a normal situation the id will be used of course.
      const adjustedCharacterPossessions = Object.fromEntries(
        characterPossessions.map((possession, index) => [index, possession.name])
      );

      setInitialValues({...character, characterPossessions: adjustedCharacterPossessions});
    }
  }, [character, characterPossessions]);

  return (
    <Panel
      title={getCharacterLoading ? '' : `${character?.name} (lvl. ${calculateCharacterLevel(character?.experiencePoints)})`}
      panelButton={
        <Button
          label={mode === 'read' ? 'Personage aanpassen' : 'Annuleren'}
          icon={mode === 'read' ? PencilIcon : XIcon}
          onClick={mode === 'read' ? () => setMode('edit') : () => setMode('read')}
        />
      }
    >
      {getCharacterLoading || getCharacterPossessionsLoading ? (
        <div className="character-details__loading">
          <Spinner size='large'/>
        </div>
      ) : mode === 'edit' ? (
        <CharacterForm
          initialValues={initialValues}
          onSubmit={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
          loading={updateCharacterLoading}
        />
      ) : mode === 'read' && character ? (
        <div className="character-details">
          <div className="character-details__left">
            <div className="character-details__group">
              <p className="character-details__group-title">
                Algemene informatie
              </p>

              <dl className="character-details__group-content">
                <div>
                  <dt>Type</dt>
                  <dd>{formatCharacterType(character.type)}</dd>
                </div>

                <div>
                  <dt>Naam</dt>
                  <dd>{character.name}</dd>
                </div>

                <div>
                  <dt>Class</dt>
                  <dd>{character.class}</dd>
                </div>

                <div>
                  <dt>Subclass</dt>
                  <dd>{character.subclass}</dd>
                </div>

                <div>
                  <dt>Ras</dt>
                  <dd>{character.race}</dd>
                </div>
              </dl>
            </div>

            <div className="character-details__group">
              <p className="character-details__group-title">
                Vaardigheden
              </p>

              <dl className="character-details__group-content">
                <div className="character-details__abilities-row">
                  <CharacterAbility label="Charisma" value={character.charisma}/>
                  <CharacterAbility label="Constitution" value={character.constitution}/>
                  <CharacterAbility label="Dexterity" value={character.dexterity}/>
                </div>

                <div className="character-details__abilities-row">
                  <CharacterAbility label="Intelligence" value={character.intelligence}/>
                  <CharacterAbility label="Strength" value={character.strength}/>
                  <CharacterAbility label="Wisdom" value={character.wisdom}/>
                </div>
              </dl>
            </div>

            <div className="character-details__group">
              <p className="character-details__group-title">
                Gevechtseigenschappen
              </p>

              <dl className="character-details__group-content character-details__group-content-row">
                <div>
                  <dt>Proficiency bonus</dt>
                  <dd>{character.proficiencyBonus}</dd>
                </div>

                <div>
                  <dt>Armor class</dt>
                  <dd>{character.armorClass}</dd>
                </div>

                <div>
                  <dt>Max Hit Points</dt>
                  <dd>{character.maxHitPoints}</dd>
                </div>

                <div>
                  <dt>Current Hit Points</dt>
                  <dd>{character.currentHitPoints}</dd>
                </div>

                <div>
                  <dt>Experience points</dt>
                  <dd>{character.experiencePoints}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="character-details__right">
            <div className="character-details__group">
              <p className="character-details__group-title">
                Persoonlijke eigenschappen
              </p>

              <dl className="character-details__group-content">
                <div>
                  <dt>Size</dt>
                  <dd>{character.size}</dd>
                </div>

                <div>
                  <dt>Alignment</dt>
                  <CharacterAlignmentDetails currentValue={character.alignment}/>
                </div>
              </dl>
            </div>

            <div className="character-details__group">
              <p className="character-details__group-title">
                Bezittingen
              </p>

              <div className="character-details__group-content">
                <div className="character-details__group-content-row">
                  {[
                    {label: 'CP', value: character.copperPieces, icon: CopperPiece, alt: 'Copper Piece'},
                    {label: 'SP', value: character.silverPieces, icon: SilverPiece, alt: 'Silver Piece'},
                    {label: 'EP', value: character.electrumPieces, icon: ElectrumPiece, alt: 'Electrum Piece'},
                    {label: 'GP', value: character.goldPieces, icon: GoldPiece, alt: 'Gold Piece'},
                    {label: 'PP', value: character.platinumPieces, icon: PlatinumPiece, alt: 'Platinum Piece'},
                  ].map(currency => (
                    <dl className="character-details__currency" key={currency.label}>
                      <dt>{currency.label}</dt>
                      <dd>
                        {currency.value ?? 0}
                        <span className="character-details__currency-image">
                          <img src={currency.icon} alt={currency.alt}/>
                        </span>
                      </dd>
                    </dl>
                  ))}
                </div>

                <div>
                  <dt>Uitrusting</dt>
                  {characterPossessions && characterPossessions.map((characterPossession, index) => (
                    <dd key={index}>
                      {characterPossession.name}
                    </dd>
                  ))}
                </div>
              </div>
            </div>

            <div className="character-details__group">
              <p className="character-details__group-title">
                Extra's
              </p>

              <dl className="character-details__group-content">
                <div>
                  <dt>Notities</dt>
                  <dd>{character.notes}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  )
}

export default CharacterDetailsPage;