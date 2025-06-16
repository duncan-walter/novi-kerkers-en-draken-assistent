import './TextFormControl.css';

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 */
function TextFormControl({id, name, label, placeholder}) {
  return (
    <div className="text-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="text"
        {...(placeholder ? {placeholder} : {})} // Optional rendering
      />
    </div>
  );
}

export default TextFormControl;