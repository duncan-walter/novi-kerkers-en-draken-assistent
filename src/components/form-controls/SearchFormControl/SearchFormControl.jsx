import './SearchFormControl.css';

import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 */
function SearchFormControl({id, name, label, placeholder, register, error, validationRules}) {
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
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        {...registerFormControl()}
      />
      {error && <p className="form-control__error-message">{error.message}</p>}
    </div>
  );
}

export default SearchFormControl;