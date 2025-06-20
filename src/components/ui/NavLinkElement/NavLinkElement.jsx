// Styling
import './NavLinkElement.css';

// Framework dependencies
import {NavLink} from 'react-router-dom';

// Components
import Panel from '../Panel/Panel.jsx';

function NavLinkElement({url, label}) {
  return (
    <NavLink
      to={url}
      className={({isActive}) =>
        isActive ? 'navigation-item--active' : 'navigation-item'
      }
    >
      <Panel variant="small">
        <li>
          {label}
        </li>
      </Panel>
    </NavLink>
  );
}

export default NavLinkElement;