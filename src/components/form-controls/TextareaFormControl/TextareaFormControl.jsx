import './TextareaFormControl.css'

import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 */
function TextareaFormControl({id, name, label, placeholder, register, error, validationRules}) {
  const supportedValidationRules = ['required', 'minimumLength', 'maximumLength'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  };

  return (
    <div className="textarea-form-control">
      <label htmlFor={id} className="form-control__label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        className="form-control"
        {...registerFormControl()}
      />
      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default TextareaFormControl;