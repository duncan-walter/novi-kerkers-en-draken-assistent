import './Button.css';

function Button({label, icon, type = 'button', variant = 'primary', onClick = () => {}}) {
  const variants = {
    primary: 'button--primary',
    secondary: 'button--secondary'
  }

  let buttonClasses = `button ${variants[variant]}`;

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
    >
      {icon && <div className="button__icon">{icon}</div>}
      {label}
    </button>
  );
}

export default Button;