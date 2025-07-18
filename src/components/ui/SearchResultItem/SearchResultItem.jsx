import './SearchResultItem.css';

function SearchResultItem({label, onClick}) {
  return (
    <div
      className="search-result-item"
      onClick={onClick}
    >
      <p className="search-result-item__label">{label}</p>
    </div>
  )
}

export default SearchResultItem;