// Styling
import './CharacterOverview.css';

// Icons
import {UserPlusIcon, PlusIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";
import {useToaster} from "../../../contexts/ToasterContext.jsx";

// Services
import characterService from "../../../services/characterService.js";

// Components
import Panel from '../../../components/ui/Panel/Panel.jsx';
import Button from '../../../components/ui/Button/Button.jsx';
import Spinner from '../../../components/ui/Spinner/Spinner.jsx';
import ZeroState from '../../../components/ui/ZeroState/ZeroState.jsx';
import CharacterCard from '../../../components/ui/CharacterCard/CharacterCard.jsx';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showToast(error.message, 'error');
    }
  }, [error]);

  return (
    <Panel
      title="Personages"
      panelButton={
        <Button
          label="Personage toevoegen"
          icon={PlusIcon}
          onClick={() => navigate('./create-character')}
        />
      }
    >
      <div className="character-overview">
        {loading && (
          <div className="character-overview__loading">
            <Spinner size='large'/>
          </div>
        )}

        {!loading && data?.length > 0 && (
          <div className="character-overview__characters">
            {data.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => {
                  navigate(`./character-details/${character.id}`)
                }}
              />
            ))}
          </div>
        )}

        {!loading && data?.length === 0 && (
          <div className="character-overview__zero-state">
            <ZeroState
              icon={UserPlusIcon}
              text="Zelfs de goblins hebben zich nog niet laten zien...
              Voeg je eerste personage toe!"
              buttonLabel="Personage toevoegen"
              buttonIcon={PlusIcon}
              buttonOnClick={() => navigate('./create-character')}
            />
          </div>
        )}
      </div>
    </Panel>
  );
}

export default CharacterOverview;