// Styling
import './SearchResultItem.css';

// Icons
import {StarIcon} from '@phosphor-icons/react';

function SearchResultItem({label, onClick, isFavorite, onFavoriteClick}) {
  return (
    <div
      className="search-result-item"
      onClick={onClick}
    >
      <p className="search-result-item__label">{label}</p>

      {onFavoriteClick && (
        <span
          className={`search-result-item__favorite ${!isFavorite ? 'search-result-item__favorite-inactive' : ''}`}
          onClick={onFavoriteClick}
        >
          <StarIcon size="18" weight={isFavorite ? 'fill' : 'regular'}/>
        </span>
      )}
    </div>
  )
}

export default SearchResultItem;