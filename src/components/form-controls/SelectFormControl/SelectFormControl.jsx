import './SelectFormControl.css';

import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 */
function SelectFormControl({id, name, label, options, showPlaceholder = true, register, error, validationRules}) {
  const supportedValidationRules = ['required'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  };

  return (
    <div className="select-form-control">
      <label htmlFor={id} className="form-control__label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        autoComplete="off"
        className="form-control"
        {...registerFormControl()}
      >
        {showPlaceholder && <option value="">kies een waarde</option>}
        {options && options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default SelectFormControl;