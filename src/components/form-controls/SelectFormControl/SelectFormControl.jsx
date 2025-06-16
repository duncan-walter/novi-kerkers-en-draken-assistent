import './SelectFormControl.css';

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 */
function SelectFormControl({id, name, label, options, showPlaceholder = true, register, error, validationRules}) {
  const registerFormControl = () => {
    return {...(register(name, {...getValidationRules()}))};
  };

  const getValidationRules = () => {
    const rules = validationRules ?? {
      required: undefined
    };

    return {
      // Required
      ...(rules.required !== undefined && {
        required: {
          value: rules.required,
          message: `${label} is verplicht.`
        }
      })
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