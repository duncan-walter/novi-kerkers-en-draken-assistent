// Styling
import './CharacterAlignmentFormControl.css';

// Helpers and constants
import buildFormControlValidationRules from '@components/form-controls/helpers/validationRuleBuilder.js';
import alignments from '@constants/characterAlignments.js';

// Components
import Button from '@components/ui/Button/Button.jsx';

function CharacterAlignmentFormControl({id, name, label, register, setValue, watch, error, validationRules}) {
  const currentValue = watch(name);

  const supportedValidationRules = ['required'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  }

  function handleAlignmentSelect(value) {
    setValue(name, value, {shouldValidate: true});
  }

  return (
    <div className="character-alignment-form-control">
      {label &&
        <label htmlFor={`${id}-${alignments[0][0].id}`} className="form-control__label">
          {label}
        </label>
      }

      {alignments.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="character-alignment-form-control__row"
        >
          {row.map(({id: alignmentId, value, label: alignmentLabel}) => (
            <div
              key={alignmentId}
              className="character-alignment-form-control__cell"
            >
              <Button
                type="button"
                label={alignmentLabel}
                variant={currentValue === value ? "tertiary" : "secondary"}
                onClick={() => handleAlignmentSelect(value)}
              />
              <input
                type="radio"
                id={`${id}-${alignmentId}`}
                name={name}
                value={value}
                checked={currentValue === value}
                readOnly={true}
                hidden={true}
                {...registerFormControl()}
              />
            </div>
          ))}
        </div>
      ))}

      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  )
}

// This component was implemented in the same file to reuse the CSS of the CharacterAlignmentFormControl component.
function CharacterAlignmentDetails({currentValue}) {
  return (
    <div className="character-alignment-form-control">
      {alignments.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="character-alignment-form-control__row"
        >
          {row.map(({id: alignmentId, value, label: alignmentLabel}) => (
            <div
              key={alignmentId}
              className="character-alignment-form-control__cell"
            >
              <Button
                type="button"
                label={alignmentLabel}
                variant={currentValue === value ? "tertiary" : "secondary"}
                disabled
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CharacterAlignmentFormControl;
export {CharacterAlignmentDetails};