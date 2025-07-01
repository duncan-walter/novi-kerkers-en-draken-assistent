// Styling
import './Sidebar.css';

// Images / icons
import DNDLogo from '/src/assets/logos/dnd-logo-white.png';
import {DoorIcon} from '@phosphor-icons/react';

// Framework dependencies
import {useContext} from "react";
import {Link} from 'react-router-dom';

// Contexts
import {AuthorizationContext} from '../../../contexts/AuthorizationContext.jsx';

// Components
import Navigation from "../Navigation/Navigation.jsx";
import Button from "../Button/Button.jsx";

function Sidebar() {
  const authorizationContext = useContext(AuthorizationContext);

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
        <Button
          onClick={authorizationContext.logout}
          label="Uitloggen"
          icon={DoorIcon}
        />
      </div>
    </div>
  );
}

export default Sidebar;