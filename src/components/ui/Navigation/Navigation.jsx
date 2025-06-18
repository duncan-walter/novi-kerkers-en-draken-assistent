// Styling
import './Navigation.css';

// Constants
import navigationItems from '../../../constants/navigationItems.js';

// Framework dependencies
import {Link} from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ol>
        {navigationItems.map(navigationItem => {
          return (
            <li>
              <Link to={navigationItem.url}>{navigationItem.label}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Navigation;