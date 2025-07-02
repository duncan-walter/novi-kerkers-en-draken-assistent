// Styling
import './CharacterCreate.css';

// Framework dependencies
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";
import {useToaster} from "../../../contexts/ToasterContext.jsx";

// Services
import characterService from "../../../services/characterService.js";

// Helpers
import mapFormKeysToAPIKeys from "../../../helpers/mapFormKeysToAPIKeys.js";

// Components
import Panel from '../../../components/ui/Panel/Panel.jsx';
import CharacterForm from "../../../components/forms/CharacterForm/CharacterForm.jsx";

function CharacterCreate() {
  const {data, statusCode, loading, executeRequest} = useRequestState(
    characterService.createCharacter,
    {
      executeOnMount: false,
      isAbortable: true
    }
  );
  const {showToast} = useToaster();
  const navigate = useNavigate();

  const handleSubmit = async (characterFormData) => {
    mapFormKeysToAPIKeys(characterFormData, 'characterForm');

    await executeRequest(characterFormData);
  }

  const handleCancel = () => {
    navigate(-1);
  }

  useEffect(() => {
    if (statusCode) {
      switch (statusCode) {
        case 201:
          showToast(`${data.name} sluit zich aan bij de strijd!`, 'success');
          navigate(`/character-management/character-details/${data.id}`);
          break;
        case 401:
          showToast('Onbekende reiziger, toegang geweigerd.', 'error');
          break;
        case 403:
          showToast('De wachters erkennen je rang niet als voldoende.', 'error');
          break;
        case 406:
          showToast('Als je dit ziet heeft Duncan zijn intelligence check gefaald.', 'error');
          break;
        case 500:
        default:
          showToast('Een mysterieuze storing blokkeert je pad.', 'error');
          break;
      }
    }
  }, [statusCode])

  return (
    // Make title dynamic according to character name
    <Panel title="Personage aanmaken">
      <CharacterForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Panel>
  );
}

export default CharacterCreate;