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
      <label htmlFor={id}>{`${label}:`}</label>
      <select
        id={id}
        name={name}
        autoComplete="off"
        {...registerFormControl()}
      >
        {showPlaceholder && <option value="">kies een waarde</option>}
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      {error && <p className="form-control__error-message">{error.message}</p>}
    </div>
  );
}

export default SelectFormControl;