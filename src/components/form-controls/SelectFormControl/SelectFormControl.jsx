import './SelectFormControl.css';

function SelectFormControl({id, name, label, options, showPlaceholder = true}) {
  return (
    <div className="select-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <select
        id={id}
        name={name}
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
    </div>
  );
}

export default SelectFormControl;