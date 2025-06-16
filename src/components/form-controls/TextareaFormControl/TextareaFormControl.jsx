import './TextareaFormControl.css';

/* Notes:
 * - Placeholder parameter is optional and will not be rendered if it is not passed as an argument.
 */
function TextareaFormControl({id, name, label, placeholder}) {
  return (
    <div className="textarea-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <textarea
        id={id}
        name={name}
        {...(placeholder ? {placeholder} : {})} // Optional rendering
      />
    </div>
  );
}

export default TextareaFormControl;