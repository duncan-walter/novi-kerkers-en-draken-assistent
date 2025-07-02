// Styling
import './CharacterAlignmentFormControl.css';

// Framework dependencies
import {useState} from "react";

// Helpers and constants
import buildFormControlValidationRules from "../helpers/validationRuleBuilder.js";
import alignments from "../../../constants/characterAlignments.js";

// Components
import Button from "../../ui/Button/Button.jsx";

function CharacterAlignmentFormControl({id, name, label, register, setValue, error, validationRules}) {
  const [selectedValue, setSelectedValue] = useState(null);

  const supportedValidationRules = ['required'];

  const registerFormControl = () => {
    return {
      ...(register(name, {
        ...buildFormControlValidationRules(label, validationRules, supportedValidationRules)
      }))
    };
  }

  function handleAlignmentSelect(value) {
    setSelectedValue(value);
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
          {row.map(({id: alignmentId, value}) => (
            <div
              key={alignmentId}
              className="character-alignment-form-control__cell"
            >
              <Button
                type="button"
                label={value}
                variant={selectedValue === value ? "tertiary" : "secondary"}
                onClick={() => handleAlignmentSelect(value)}
              />
              <input
                type="radio"
                id={`${id}-${alignmentId}`}
                name={name}
                value={value}
                checked={selectedValue === value}
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

export default CharacterAlignmentFormControl;