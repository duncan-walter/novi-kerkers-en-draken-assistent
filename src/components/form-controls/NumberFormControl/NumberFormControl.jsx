import './NumberFormControl.css';

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 * - Supported validationRules parameter properties:
 *    - required (boolean)
 *    - minimumValue (number)
 *    - maximumValue (number)
 */
function NumberFormControl({id, name, label, placeholder, register, error, validationRules}) {
  const registerFormControl = () => {
    return {...(register(name, {
      valueAsNumber: true,
      ...getValidationRules()
    }))};
  };

  const getValidationRules = () => {
    /* I found this nice trick where my IDE shows me the available properties of the rules variable
     * by explicitly setting the expected properties when no validationRules parameter is supplied.
     */
    const rules = validationRules ?? {
      required: undefined,
      minimumValue: undefined,
      maximumValue: undefined
    };

    return {
      // Required
      ...(rules.required !== undefined && {
        required: {
          value: rules.required,
          message: `${label} is verplicht.`
        }
      }),
      // Min
      ...(rules.minimumValue !== undefined && {
        min: {
          value: rules.minimumValue,
          message: `${label} moet groter dan "${rules.minimumValue}" zijn.`
        }
      }),
      // Max
      ...(rules.maximumValue !== undefined && {
        max: {
          value: rules.maximumValue,
          message: `${label} moet kleiner dan "${rules.maximumValue}" zijn.`
        }
      })
    };
  };

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