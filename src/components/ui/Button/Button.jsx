import './Button.css';

function Button({label, type = 'button', variant = 'primary', handleClick = () => {}}) {
  const variants = {
    primary: 'button--primary',
    secondary: 'button--secondary'
  }

  let buttonClasses = `button ${variants[variant]}`;

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default Button;