import './SliderFormControl.css';

function SliderFormControl({id, name, label, minimumValue, maximumValue, register, watch, error}) {
  const registerFormControl = () => {
    return {...(register(name, {valueAsNumber: true}))};
  };

  return (
    <div className="slider-form-control">
      <label htmlFor={id} className="form-control__label">
        {`${label} (${watch(name)})`}
      </label>
      <input
        id={id}
        name={name}
        type="range"
        min={minimumValue}
        max={maximumValue}
        className="form-control"
        {...registerFormControl()}
      />
      {/* Errors are currently not possible in this component, but for consistency and potential future expansion it has been included. */}
      <p className={`form-control__error-message ${error ? 'visible' : 'invisible'}`}>
        {error && error.message}
      </p>
    </div>
  );
}

export default SliderFormControl;