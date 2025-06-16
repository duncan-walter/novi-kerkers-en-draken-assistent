import './NumberFormControl.css';

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 */
function NumberFormControl({id, name, label, placeholder}) {
  return (
    <div className="number-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="number"
        {...(placeholder ? {placeholder} : {})} // Optional rendering
      />
    </div>
  );
}

export default NumberFormControl;