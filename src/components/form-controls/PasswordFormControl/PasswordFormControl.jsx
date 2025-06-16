import './PasswordFormControl.css';

import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 */
function PasswordFormControl({id, name, label, register, error, validationRules}) {
  const supportedValidationRules = ['required', 'minimumLength', 'maximumLength'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  };

  return (
    <div className="password-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="password"
        autoComplete="off"
        {...registerFormControl()}
      />
      {error && <p className="form-control__error-message">{error.message}</p>}
    </div>
  );
}

export default PasswordFormControl;