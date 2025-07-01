import './Button.css';

function Button({label, icon: Icon, type = 'button', variant = 'primary', onClick = () => {}}) {
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
      {Icon && <div className="button__icon"><Icon/></div>}
      {label}
    </button>
  );
}

export default Button;