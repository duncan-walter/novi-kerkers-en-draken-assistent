// Styling
import './SearchFormControl.css';

// Icons
import {MagnifyingGlassIcon} from "@phosphor-icons/react";

// Helpers
import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 */
function SearchFormControl({id, name, label, placeholder, register, error, validationRules, onSearch}) {
  const supportedValidationRules = ['required', 'minimumLength', 'maximumLength'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  };

  return (
    <div className="search-form-control">
      <label htmlFor={id} className="form-control__label">
        {label}
      </label>

      <div className="search-form-control__wrapper">
        <input
          id={id}
          name={name}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className="form-control"
          {...registerFormControl()}
        />

        {/* The Button component has not been used here on purpose as it differs too much from a normal button's styling. */}
        <button
          type="button"
          className="search-form-control__search-button"
          onClick={onSearch}
        >
          <MagnifyingGlassIcon size={24}/>
        </button>
      </div>

      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default SearchFormControl;