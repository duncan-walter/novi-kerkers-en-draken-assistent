// Styling
import './Sidebar.css';

// Images / icons
import DNDLogo from '/src/assets/logos/dnd-logo-white.png';
import {DoorIcon} from '@phosphor-icons/react';

// Framework dependencies
import {Link} from 'react-router-dom';

// Components
import Navigation from "../Navigation/Navigation.jsx";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link to="/">
          <img src={DNDLogo} alt="Logo"/>
        </Link>
        <Navigation/>
      </div>

      <div className="sidebar__bottom">
        <hr/>
        <Link className="secondary-link" to="#">
          <DoorIcon size={"1.2em"}/>
          <span> Uitloggen</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;