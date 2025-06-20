// Styling
import './LinkElement.css';

// Framework dependencies
import {Link} from "react-router-dom";

/* Notes:
 * - Supported variants: primary, secondary
 */
function LinkElement({url, label, icon, variant = 'primary'}) {
  const variants = {
    primary: 'link--primary',
    secondary: 'link--secondary'
  }

  return (
    <Link className={`link ${variants[variant]}`} to={url}>
      {icon}
      <span> {label}</span>
    </Link>
  );
}

export default LinkElement;