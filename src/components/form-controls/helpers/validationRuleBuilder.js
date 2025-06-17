function buildFormControlValidationRules(label, validationRules, supportedValidationRules = []) {
  const rules = {};

  // We filter out unsupported validation rules to prevent illegal validation rules from being set on certain form controls.
  if (validationRules) {
    for (const key in validationRules) {
      if (supportedValidationRules.includes(key)) {
        rules[key] = validationRules[key];
      }
    }
  }

  return {
    // Required
    ...(rules.required !== undefined && {
      required: {
        value: rules.required,
        message: `${label} is verplicht.`
      }
    }),
    // Minimum value
    ...(rules.minimumValue !== undefined && {
      min: {
        value: rules.minimumValue,
        message: `${label} moet groter dan "${rules.minimumValue}" zijn.`
      }
    }),
    // Maximum value
    ...(rules.maximumValue !== undefined && {
      max: {
        value: rules.maximumValue,
        message: `${label} moet kleiner dan "${rules.maximumValue}" zijn.`
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
}

export default buildFormControlValidationRules;