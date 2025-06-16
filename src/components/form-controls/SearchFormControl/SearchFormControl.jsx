import './SearchFormControl.css';

/* Notes:
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumLength (number)
 *    - maximumLength (number)
 */
function SearchFormControl({id, name, label, placeholder, register, error, validationRules}) {
  const registerFormControl = () => {
    return {...(register(name, {...getValidationRules()}))};
  };

  const getValidationRules = () => {
    const rules = validationRules ?? {
      required: undefined,
      minimumLength: undefined,
      maximumLength: undefined,
    };

    return {
      // Required
      ...(rules.required !== undefined && {
        required: {
          value: rules.required,
          message: `${label} is verplicht.`
        }
      }),
      // Minimum length
      ...(rules.minimumLength !== undefined && {
        minLength: {
          value: rules.minimumLength,
          message: `${label} moet meer dan "${rules.minimumLength}" karakter(s) lang zijn.`
        }
      }),
      // Maximum length
      ...(rules.maximumLength !== undefined && {
        maxLength: {
          value: rules.maximumLength,
          message: `${label} moet minder dan "${rules.maximumLength}" karakter(s) lang zijn.`
        }
      })
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