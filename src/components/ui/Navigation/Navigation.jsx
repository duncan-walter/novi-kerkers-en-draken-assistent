// Styling
import './Navigation.css';

// Constants
import navigationItems from '../../../constants/navigationItems.js';

// Framework dependencies
import {Link} from "react-router-dom";

//Components
import Panel from "../Panel/Panel.jsx";

function Navigation() {
  return (
    <nav>
      <ul className="navigation-items">
        {navigationItems.map(navigationItem => {
          return (
            <Link to={navigationItem.url}>
              <Panel variant="small">
                <li>
                  {navigationItem.label}
                </li>
              </Panel>
            </Link>
          )
        })}
      </ul>
    </nav>
  );
}

export default Navigation;