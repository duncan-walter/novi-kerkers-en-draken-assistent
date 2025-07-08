// Styling
import './CharacterCreatePage.css';

// Framework dependencies
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";
import {useToaster} from "../../../contexts/ToasterContext.jsx";

// Services
import characterService from "../../../services/characterService.js";
import characterPossessionsService from "../../../services/characterPossessionsService.js";

// Helpers and constants
import mapFormKeysToAPIKeys from "../../../helpers/mapFormKeysToAPIKeys.js";
import showDefaultStatusCodeToast from "../../../helpers/showDefaultStatusCodeToast.js";
import {removeLocalStorageItem} from "../../../helpers/localStorageHelpers.js";
import {charactersKey} from "../../../constants/localStorageKeys.js";

// Components
import Panel from '../../../components/ui/Panel/Panel.jsx';
import CharacterForm from "../../../components/forms/CharacterForm/CharacterForm.jsx";

function CharacterCreatePage() {
  const {data, statusCode, loading, executeRequest} = useRequestState(
    characterService.createCharacter,
    {
      executeOnMount: false,
      isAbortable: true
    }
  );
  const {showToast} = useToaster();
  const navigate = useNavigate();

  /* TODO: Improve this function.
   *  It is likely this can be improved when the NOVI Dynamic API allows for relational data (character possessions) to be created at the same time as the data it belongs to (characters).
   *  A small improved can also be made if batch post requests are available.
   *  Or when a library is used like React Query.
   */
  // YES... I put a lot of comments for future reference...
  const handleSubmit = async (characterFormData) => {
    mapFormKeysToAPIKeys(characterFormData, 'characterForm');

    // Mapping character possessions form data to api model (no helper required as it is unique).
    const characterPossessions = Object.entries(characterFormData.characterPossessions)
      .filter(([key, value]) => value && value.trim() !== '')
      .map(([key, value]) => ({
        id: key,
        name: value
      }));

    // Character possessions are deleted before sending the create character request to prevent sending data that is not used.
    if (characterPossessions) {
      delete characterFormData.characterPossessions;
    }

    const character = await executeRequest(characterFormData);

    // As it turns out it is not possible to send the relational data (character possessions) in the create character request.
    // It is also not possible to call some sort of post batch endpoint for all character possessions, so one request will be sent per possession.
    // These seem to be limitations from the NOVI Dynamic API is used.
    // This is currently the best implementation that I can come up with.
    if (character && characterPossessions && characterPossessions.length > 0) {
      // Adding character id that was created by the backend.
      // The backend seems to create duplicate ids when requests are spammed quickly, I tried sending our own id but the backend ignores it and generates its own.
      const enrichedCharacterPossessions = characterPossessions.map(characterPossession => ({
        id: characterPossession.id,
        characterId: character.id,
        name: characterPossession.name
      }));

      try {
        // The characterPossessionsService is called directly without wrapping it in the useRequestState in this case.
        // For now because of all the limitations we send the requests and hope for the best.
        await Promise.all(
          enrichedCharacterPossessions.map((enrichedCharacterPossession) =>
            characterPossessionsService.createCharacterPossession(enrichedCharacterPossession)
          )
        );
      } catch {
        showToast('Niet alle bezittingen konden worden opgeslagen.', 'error');
      }
    }

    // Manually invalidate characters cache
    removeLocalStorageItem(charactersKey);
    navigate(`/character-management/character-details/${character.id}`);
  }

  const handleCancel = () => {
    navigate(-1);
  }

  useEffect(() => {
    if (statusCode) {
      showDefaultStatusCodeToast(
        statusCode,
        showToast,
        `${data.name} sluit zich aan bij de strijd!`
      );
    }
  }, [statusCode])

  return (
    // TODO: Make title dynamic according to current character name.
    <Panel title="Personage aanmaken">
      <CharacterForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Panel>
  );
}

export default CharacterCreatePage;