// Styling
import './Button.css';

// Components
import Spinner from '@components/ui/Spinner/Spinner.jsx';

function Button({label, icon: Icon, type = 'button', variant = 'primary', loading = false, disabled = false, onClick = () => {}}) {
  const variants = {
    primary: 'button--primary',
    secondary: 'button--secondary',
    tertiary: 'button--tertiary'
  }

  let buttonClasses = `button ${variants[variant]}`;

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        /* Note:
         * Inherit is not an actual variant but forces the spinner to inherit the color of the button's variant.
         * TODO: Implement a cleaner solution
         */
        <Spinner size="extra-small" variant="inherit"/>
      ) : (
        Icon && <div className="button__icon"><Icon/></div>
      )}
      {label}
    </button>
  );
}

export default Button;