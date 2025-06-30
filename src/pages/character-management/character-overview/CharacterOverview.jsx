// Styling
import './CharacterOverview.css';

// Framework dependencies
import {useEffect} from "react";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";
import {useToaster} from "../../../contexts/ToasterContext.jsx";

// Services
import characterService from "../../../services/characterService.js";

// Helpers
import calculateCharacterLevel from "../../../helpers/calculateCharacterLevel.js";

// Components
import Panel from '../../../components/ui/Panel/Panel.jsx';

function CharacterOverview() {
  const {data, loading, error} = useRequestState(
    characterService.getCharacters({
      useCache: true
    }),
    {
      executeOnMount: true,
      isAbortable: true
    }
  );
  const {showToast} = useToaster();

  useEffect(() => {
    if (error) {
      showToast(error.message, 'error');
    }
  }, [error]);

  return (
    <Panel title="Personages">
      {loading && 'loading...'}
      {data && data.length > 0 && (
        data.map(character => (
          <div key={character.id}>
            <p>{character.name} (lvl. {calculateCharacterLevel(character.experiencePoints)})</p>
          </div>
        ))
      )}
    </Panel>
  );
}

export default CharacterOverview;