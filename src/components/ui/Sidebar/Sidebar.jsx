// Styling
import './Sidebar.css';

// Images / icons
import DNDLogo from '/src/assets/logos/dnd-logo-white.png';
import {DoorIcon} from '@phosphor-icons/react';

// Framework dependencies
import {Link} from 'react-router-dom';

// Components
import Navigation from "../Navigation/Navigation.jsx";
import LinkElement from "../LinkElement/LinkElement.jsx";

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
        <LinkElement
          url="#"
          label="Uitloggen"
          variant="secondary"
          icon={<DoorIcon/>}
        />
      </div>
    </div>
  );
}

export default Sidebar;