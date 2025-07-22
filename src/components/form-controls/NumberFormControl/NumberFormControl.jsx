import './NumberFormControl.css';

import buildFormControlValidationRules from '@components/form-controls/helpers/validationRuleBuilder.js';

// TODO: If time allows for it, implement custom "spinners" (increment an decrement arrows).

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
      {label &&
        <label htmlFor={id} className="form-control__label">
          {label}
        </label>
      }
      <input
        id={id}
        name={name}
        type="number"
        placeholder={placeholder}
        autoComplete="off"
        className="form-control"
        {...registerFormControl()}
      />
      {/* The error's height should always be present in the DOM to prevent too much content shifting when it appears */}
      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default NumberFormControl;