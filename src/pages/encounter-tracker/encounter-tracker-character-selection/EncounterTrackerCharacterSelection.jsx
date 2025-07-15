// Styling
import './EncounterTrackerCharacterSelection.css';

// Icons
import {PlusIcon, UserPlusIcon} from "@phosphor-icons/react";

// Framework dependencies
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";
import {useToaster} from "../../../contexts/ToasterContext.jsx";

// Services
import characterService from "../../../services/characterService.js";

// Components
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";
import CharacterCard from "../../../components/ui/CharacterCard/CharacterCard.jsx";
import ZeroState from "../../../components/ui/ZeroState/ZeroState.jsx";

function EncounterTrackerCharacterSelection({setValue, watch, hideNextStepButton}) {
  const formName = 'selectedCharacters';
  const {data: characters, loading: charactersLoading, error: charactersError} = useRequestState(
    characterService.getCharacters({useCache: true}),
    {
      executeOnMount: true,
      isAbortable: true
    }
  );
  const navigate = useNavigate();
  const {showToast} = useToaster();

  const selectedCharacters = watch(formName) || [];

  const toggleSelectCharacter = (character) => {
    const isSelected = selectedCharacters.some(selectedCharacter => selectedCharacter.id === character.id);
    const newSelectedCharacters = isSelected
      ? selectedCharacters.filter(selectedCharacter => selectedCharacter.id !== character.id)
      : [...selectedCharacters, character];

    setValue(formName, newSelectedCharacters);
  }

  useEffect(() => {
    if (charactersError) {
      showToast(charactersError, 'error');
    }
  }, [charactersError]);

  useEffect(() => {
    if (characters && characters.length < 1) {
      hideNextStepButton();
    }
  }, [characters])

  return (
    <div className="encounter-tracker-character-selection">
      {charactersLoading && (
        <div className="encounter-tracker-character-selection__loading">
          <Spinner size='large'/>
        </div>
      )}

      {!charactersLoading && characters?.length > 0 && (
        <div className="encounter-tracker-character-selection__characters">
          {characters.map(character => {
            const isSelected = selectedCharacters.some(selectedCharacter => selectedCharacter.id === character.id);

            return (
              <div
                key={character.id}
                className="character-select-wrapper"
                onClick={() => toggleSelectCharacter(character)}
              >
                <CharacterCard character={character}/>

                {isSelected &&
                  <div className="character-select-overlay"></div>
                }

                <input
                  type="checkbox"
                  name={formName}
                  value={character.id}
                  checked={isSelected}
                  onChange={() => toggleSelectCharacter(character)}
                  hidden={true}
                />
              </div>
            );
          })}
        </div>
      )}

      {!charactersLoading && characters?.length === 0 && (
        <div className="encounter-tracker-character-selection__zero-state">
          <ZeroState
            icon={UserPlusIcon}
            text="Zelfs de goblins hebben zich nog niet laten zien...
              Voeg je eerste personage toe!"
            buttonLabel="Personage toevoegen"
            buttonIcon={PlusIcon}
            buttonOnClick={() => navigate('/character-management/create-character')}
          />
        </div>
      )}
    </div>
  );
}

export default EncounterTrackerCharacterSelection;