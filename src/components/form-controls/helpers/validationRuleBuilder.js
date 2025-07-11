function buildFormControlValidationRules(label, validationRules, supportedValidationRules = []) {
  const rules = {};
  const displayLabel = label ?? 'Dit veld';

  // Unsupported validation rules are filtered out to prevent illegal validation rules from being set on certain form controls.
  if (validationRules) {
    for (const key in validationRules) {
      if (supportedValidationRules.includes(key)) {
        rules[key] = validationRules[key];
      }
    }
  }

  /* The validation rules a developer wants to implement while using the form controls are set.
   * Unset validation rules will evaluate to undefined. That is why null checks are not used instead.
   * Explicit undefined checks are needed because certain allowed values will evaluate to falsy e.g. rules.minimumValue = 0.
   */
  return {
    // Required
    ...(rules.required !== undefined && {
      required: {
        value: rules.required,
        message: `${displayLabel} is verplicht.`
      }
    }),
    // Minimum value
    ...(rules.minimumValue !== undefined && {
      min: {
        value: rules.minimumValue,
        message: `${displayLabel} moet groter dan of gelijk aan "${rules.minimumValue}" zijn.`
      }
    }),
    // Maximum value
    ...(rules.maximumValue !== undefined && {
      max: {
        value: rules.maximumValue,
        message: `${displayLabel} moet kleiner dan of gelijk aan"${rules.maximumValue}" zijn.`
      }
    }),
    // Minimum length
    ...(rules.minimumLength !== undefined && {
      minLength: {
        value: rules.minimumLength,
        message: `${displayLabel} moet minstens "${rules.minimumLength}" karakter(s) lang zijn.`
      }
    }),
    // Maximum length
    ...(rules.maximumLength !== undefined && {
      maxLength: {
        value: rules.maximumLength,
        message: `${displayLabel} mag maximaal "${rules.maximumLength}" karakter(s) lang zijn.`
      }
    }),
    // Custom validation rules
    validate: {
      // Validate valid email
      ...(rules.validateEmail !== undefined && {
        validateEmail: (formControlValue) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(formControlValue) || `${displayLabel} moet een geldig e-mailadres zijn.`;
        }
      }),
      // Match form control
      ...(rules.matchFormControl !== undefined && {
        matchFormControl: (formControlValue, allFormControls) => {
          const otherFormControlValue = allFormControls[rules.matchFormControl.name];
          const otherFormControlLabel = rules.matchFormControl.label;
          return formControlValue === otherFormControlValue || `"${displayLabel}" en "${otherFormControlLabel}" moeten overeenkomen.`
        }
      })
    }
  };
}

export default buildFormControlValidationRules;