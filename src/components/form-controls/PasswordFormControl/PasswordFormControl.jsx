// Styling
import './PasswordFormControl.css';

// Icons
import {EyeIcon, EyeSlashIcon} from '@phosphor-icons/react';

// Helpers
import buildFormControlValidationRules from '@components/form-controls/helpers/validationRuleBuilder.js';

// Framework dependencies
import {useState} from 'react';

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 *    - matchFormControl (object { name (string), label (string})
 */
function PasswordFormControl({id, name, label, register, error, validationRules}) {
  const [showPassword, toggleShowPassword] = useState(false);

  const supportedValidationRules = ['required', 'minimumLength', 'maximumLength', 'matchFormControl'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  };

  const togglePasswordVisibility = () => {
    toggleShowPassword(!showPassword);
  }

  return (
    <div className="password-form-control">
      <label htmlFor={id} className="form-control__label">
        {label}
      </label>

      <div className="password-form-control__wrapper">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          className="form-control"
          {...registerFormControl()}
        />

        {/* The Button component has not been used here on purpose as it differs too much from a normal button's styling. */}
        <button
          type="button"
          className="password-form-control__toggle-show"
          onClick={togglePasswordVisibility}
        >
          {showPassword
            ? <EyeSlashIcon size={24} weight={"fill"}/>
            : <EyeIcon size={24} weight={"fill"}/>
          }
        </button>
      </div>

      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default PasswordFormControl;