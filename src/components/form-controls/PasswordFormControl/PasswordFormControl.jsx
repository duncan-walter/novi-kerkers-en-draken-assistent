import './PasswordFormControl.css';

function PasswordFormControl({id, name, label}) {
  return (
    <div className="password-form-control">
      <label htmlFor={id}>{`${label}:`}</label>
      <input
        id={id}
        name={name}
        type="password"
      />
    </div>
  );
}

export default PasswordFormControl;