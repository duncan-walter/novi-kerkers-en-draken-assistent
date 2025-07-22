import './SelectFormControl.css';

import buildFormControlValidationRules from '@components/form-controls/helpers/validationRuleBuilder.js';

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 */
function SelectFormControl({id, name, label, options, placeholder, register, error, validationRules}) {
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
        {placeholder && <option value="">{placeholder}</option>}
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