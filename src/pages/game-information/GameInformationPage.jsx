// Styling
import './GameInformationPage.css';

// Icons
import {FileDashedIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';
import {useToaster} from '@contexts/ToasterContext.jsx';
import useGameInformationFavorites from '@hooks/useGameInformationFavorites.js';

// Services
import weaponInformationService from '@services/weaponInformationService.js';
import monsterInformationService from '@services/monsterInformationService.js';

// Components
import Button from '@components/ui/Button/Button.jsx';
import Panel from '@components/ui/Panel/Panel.jsx';
import Spinner from '@components/ui/Spinner/Spinner.jsx';
import SearchResultItem from '@components/ui/SearchResultItem/SearchResultItem.jsx';
import GameInformationSearchForm from '@components/forms/GameInformationSearchForm/GameInformationSearchForm.jsx';
import ZeroState from '@components/ui/ZeroState/ZeroState.jsx';
import PaginationControls from '@components/ui/PaginationControls/PaginationControls.jsx';

// Local variables
const pageSize = 36;

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

  const [userHasSearched, setUserHasSearched] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [currentPageResults, setCurrentPageResults] = useState({
    type: null,
    items: [],
    page: 1
  });
  const [previousSearch, setPreviousSearch] = useState({
    allResults: [],
    currentPageResults: []
  });

  const {favorites, toggleFavorite, isFavorite} = useGameInformationFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const {showToast} = useToaster();

  // Derived state
  const queryStringParams = new URLSearchParams(location.search);

  const runSearch = async ({type, searchTerm = '', page = 1}) => {
    let response;
    let items = []

    switch (type) {
      case 'weapons':
        response = await getWeaponsInformation();
        items = (response?.equipment || []).map(item => ({...item, type}));
        break;
      case 'monsters':
        response = await getMonstersInformation();
        items = (response?.results || []).map(item => ({...item, type}));
        break;
      default:
        setCurrentPageResults({type: null, items: [], page: 1});
        return;
    }

    // TODO: For now magic items are not supported yet, only normal equipment. Implement this in an elegant way when necessary.
    const filteredResults = filterResponse(items, searchTerm);
    const pageResults = getPageResults(filteredResults, 1);

    setAllResults(filteredResults);
    setCurrentPageResults({
      type: type,
      items: pageResults,
      page: page,
      searchTerm: searchTerm,
    });

    setUserHasSearched(true);
    setQueryString({
      type: type,
      page: page,
      searchTerm: searchTerm
    });
  }

  const onSearchSubmit = async (data) => {
    await runSearch({
      type: data.gameInformationType,
      searchTerm: data.gameInformationSearchTerm,
      page: 1
    })
  }

  const onFavoriteButtonClick = () => {
    if (currentPageResults.type === 'favorites') {
      if (previousSearch) {
        setAllResults(previousSearch.allResults);
        setCurrentPageResults(previousSearch.currentPageResults);
      } else {
        setCurrentPageResults({ type: null, items: [], page: 1 });
        setUserHasSearched(false);
      }
    } else {
      setPreviousSearch({
        allResults,
        currentPageResults
      });

      setAllResults(favorites);
      setCurrentPageResults({
        type: 'favorites',
        items: getPageResults(favorites, 1),
        page: 1,
      });
      setUserHasSearched(true);
    }
  }

  const filterResponse = (items, searchTerm) => {
    let supportedItems = items.filter(item => !item.url.includes('magic-items'));

    if (!searchTerm) {
      return supportedItems;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return supportedItems.filter(item =>
      item.name.toLowerCase().includes(normalizedSearchTerm)
    );
  }

  // TODO: The current API used to retrieve game information does not support paging, update this to use API paging when supported.
  const getPageResults = (items, page) => {
    if (items.length <= pageSize) {
      return items;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = (page) * pageSize;

    return items.slice(startIndex, endIndex);
  }

  const setQueryString = ({type, page, searchTerm}) => {
    const queryStringParams = new URLSearchParams();

    if (type) {
      queryStringParams.append('type', type);
    }

    if (page) {
      queryStringParams.append('page', page);
    }

    if (searchTerm) {
      queryStringParams.append('searchTerm', searchTerm);
    }

    navigate(`?${queryStringParams.toString()}`, {replace: true})
  }

  // Initialize if queryString with type is present
  useEffect(() => {
    if (queryStringParams.get('type')) {
      runSearch({
        type: queryStringParams.get('type'),
        searchTerm: queryStringParams.get('searchTerm') ?? '',
        page: Number(queryStringParams.get('page') ?? 1)
      })
    }
  }, []);

  // Act on pagination changes
  useEffect(() => {
    if (userHasSearched && currentPageResults.page) {
      const nextPageResultItems = getPageResults(allResults, currentPageResults.page);

      setCurrentPageResults(previousPageResults => ({
          ...previousPageResults,
          items: nextPageResultItems
        })
      );

      setQueryString({
        type: currentPageResults.type,
        page: currentPageResults.page,
        searchTerm: currentPageResults.searchTerm,
      });
    }
  }, [currentPageResults.page]);

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
          label={
            currentPageResults.type === 'favorites'
              ? 'Favorieten verbergen'
              : 'Favorieten weergeven'
          }
          onClick={onFavoriteButtonClick}
        />
      }
    >
      <div className="game-information-search-form">
        <GameInformationSearchForm
          onSubmit={onSearchSubmit}
          defaultValues={{
            type: queryStringParams.get('type') ?? '',
            searchTerm: queryStringParams.get('searchTerm') ?? '',
          }}
        />
      </div>

      {currentPageResults.items.length >= 1 ? (
        <>
          <div className="game-information-search-results">
            {currentPageResults.items.map(currentPageResult => (
              <SearchResultItem
                key={currentPageResult.name}
                label={currentPageResult.name}
                onClick={() => {
                  navigate(`${currentPageResult.type}/${currentPageResult.index}`)
                }}
                isFavorite={isFavorite(currentPageResult)}
                onFavoriteClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(currentPageResult);
                }}
              />
            ))}
          </div>

          <div className="game-information-search-results-pagination">
            <PaginationControls
              currentPage={currentPageResults.page}
              pageSize={pageSize}
              resultCount={allResults.length}
              onPrevious={() => setCurrentPageResults(previousPageResults => ({
                ...previousPageResults,
                page: previousPageResults.page - 1
              }))}
              onNext={() => setCurrentPageResults(previousPageResults => ({
                ...previousPageResults,
                page: previousPageResults.page + 1
              }))}
            />
          </div>
        </>
      ) : (
        <div className="game-information-search-no-results">
          {weaponsInformationLoading || monstersInformationLoading ? (
            <Spinner size="large"/>
          ) : !userHasSearched ? (
            <h2>Selecteer een type spelinformatie en druk op de zoekknop!</h2>
          ) : (
            <ZeroState
              icon={FileDashedIcon}
              text="Je bladert door vergeelde perkamentrollen, maar vindt geen spoor van wat je zoekt."
            />
          )}
        </div>
      )}
    </Panel>
  );
}

export default GameInformationPage;