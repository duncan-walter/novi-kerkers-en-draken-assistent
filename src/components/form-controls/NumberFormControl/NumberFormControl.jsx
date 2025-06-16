import './NumberFormControl.css';

import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumValue (number)
 *    - maximumValue (number)
 */
function NumberFormControl({id, name, label, placeholder, register, error, validationRules}) {
  const supportedValidationRules = ['required', 'minimumValue', 'maximumValue'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        valueAsNumber: true,
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  }

  return (
    <div className="number-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="number"
        placeholder={placeholder}
        autoComplete="off"
        {...registerFormControl()}
      />
      {error && <p className="form-control__error-message">{error.message}</p>}
    </div>
  );
}

export default NumberFormControl;