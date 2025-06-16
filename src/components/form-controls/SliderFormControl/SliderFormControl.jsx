import './SliderFormControl.css';

function SliderFormControl({id, name, label}) {
  return (
    <div className="slider-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="range"
      />
    </div>
  );
}

export default SliderFormControl;