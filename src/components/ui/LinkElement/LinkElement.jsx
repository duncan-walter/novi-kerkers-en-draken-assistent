// Styling
import './LinkElement.css';

// Framework dependencies
import {Link} from 'react-router-dom';

/* Notes:
 * - Supported variants: primary, secondary
 */
function LinkElement({url, label, underline, icon, variant = 'primary'}) {
  const variants = {
    primary: 'link--primary',
    secondary: 'link--secondary'
  }

  let linkClasses = `link ${variants[variant]}`;
  let linkTextClasses = 'link__text';

  if (underline) {
    linkTextClasses += ' link__text--underline';
  }

  return (
    <span className="link-wrapper">
      <Link className={linkClasses} to={url}>
        {icon && <div className="link__icon">{icon}</div>}
        <span className={linkTextClasses}>{label}</span>
      </Link>
    </span>
  );
}

export default LinkElement;