import './SearchFormControl.css';

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 */
function SearchFormControl({id, name, label, placeholder}) {
  return (
    <div className="search-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="text"
        {...(placeholder ? {placeholder} : {})} // Optional rendering
      />
    </div>
  );
}

export default SearchFormControl;