import './SliderFormControl.css';

function SliderFormControl({id, name, label, minimumValue, maximumValue, register, error}) {
  const registerFormControl = () => {
    return {...(register(name, {valueAsNumber: true}))};
  };

  return (
    <div className="slider-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="range"
        min={minimumValue}
        max={maximumValue}
        {...registerFormControl()}
      />
      {/* Errors are currently not possible in this component, but for consistency and potential future expansion it has been included. */}
      {error && <p className="form-control__error-message">{error.message}</p>}
    </div>
  );
}

export default SliderFormControl;