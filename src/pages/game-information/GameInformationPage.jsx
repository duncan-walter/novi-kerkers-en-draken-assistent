// Styling
import './GameInformationPage.css';

// Framework dependencies
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

// Custom hooks
import useRequestState from "../../hooks/useRequestState.js";
import {useToaster} from "../../contexts/ToasterContext.jsx";

// Services
import weaponInformationService from "../../services/weaponInformationService.js";
import monsterInformationService from "../../services/monsterInformationService.js";

// Components
import Button from "../../components/ui/Button/Button.jsx";
import Panel from "../../components/ui/Panel/Panel.jsx";
import Spinner from "../../components/ui/Spinner/Spinner.jsx";
import SelectFormControl from "../../components/form-controls/SelectFormControl/SelectFormControl.jsx";
import SearchFormControl from "../../components/form-controls/SearchFormControl/SearchFormControl.jsx";
import SearchResultItem from "../../components/ui/SearchResultItem/SearchResultItem.jsx";

function GameInformationPage() {
  const {
    loading: weaponsInformationLoading,
    error: weaponsInformationError,
    executeRequest: getWeaponsInformation
  } = useRequestState(weaponInformationService.getWeaponInformationIndex({useCache: true}), {
    executeOnMount: false,
    isAbortable: true
  });
  const {
    loading: monstersInformationLoading,
    error: monstersInformationError,
    executeRequest: getMonstersInformation
  } = useRequestState(monsterInformationService.getMonsterInformationIndex({useCache: true}), {
    executeOnMount: false,
    isAbortable: true
  });

  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm({
    defaultValues: {
      gameInformationType: null,
      gameInformationSearchTerm: null
    }
  });

  const [searchResult, setSearchResult] = useState({
    type: null,
    items: []
  });

  const navigate = useNavigate();
  const {showToast} = useToaster();

  const onSearchSubmit = async (data) => {
    let response;
    let items = []

    switch (data.gameInformationType) {
      case 'weapons':
        response = await getWeaponsInformation();
        items = response?.equipment || [];
        break;
      case 'monsters':
        response = await getMonstersInformation();
        items = response?.results || [];
        break;
      default:
        setSearchResult({type: null, items: []});
        return;
    }

    const filteredResults = filterResponse(items, data.gameInformationSearchTerm);
    setSearchResult({type: data.gameInformationType, items: [...filteredResults]});
  }

    const filterResponse = (items, searchTerm) => {
      if (!searchTerm) {
        return items;
      }

      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      return items.filter(item =>
        item.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    // Generic error from useRequestState.
    useEffect(() => {
      [weaponsInformationError, monstersInformationError].forEach(error => {
        if (error) {
          showToast(error, 'error');
        }
      });
    }, [weaponsInformationError, monstersInformationError]);

    return (
      <Panel
        title="Spelinformatie"
        panelButton={
          <Button
            type="button"
            label="Favorieten"
          />
        }
      >
        <div className="game-information-search-controls">
          <form onSubmit={handleSubmit(onSearchSubmit)}>
            <SelectFormControl
              id="gameInformationType"
              name="gameInformationType"
              label="Type"
              placeholder="Selecteer type"
              register={register}
              error={errors.gameInformationType}
              options={[
                {value: "weapons", label: "Wapens"},
                {value: "monsters", label: "Monsters"}
              ]}
              validationRules={{
                required: true
              }}
            />

            <SearchFormControl
              id="gameInformationSearchTerm"
              name="gameInformationSearchTerm"
              label="Zoekopdracht"
              register={register}
              error={errors.gameInformationSearchTerm}
              validationRules={{
                minimumLength: 0,
                maximumLength: 50
              }}
              onSearch={handleSubmit(onSearchSubmit)}
            />
          </form>
        </div>

        <div className="game-information-search-results">
          {weaponsInformationLoading || monstersInformationLoading ? (
            <Spinner size="large"/>
          ) : (
            searchResult.items.length >= 1 && (searchResult.items.map(searchResultItem => (
              <SearchResultItem
                key={searchResultItem.name}
                label={searchResultItem.name}
                onClick={() => {
                  navigate(`${searchResult.type}/${searchResultItem.index}`)
                }}
              />
            )))
          )}
        </div>
      </Panel>
    );
  }

  export default GameInformationPage;