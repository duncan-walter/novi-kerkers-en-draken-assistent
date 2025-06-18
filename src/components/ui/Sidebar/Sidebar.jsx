import './Sidebar.css';
import Navigation from "../Navigation/Navigation.jsx";
import {Link} from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="" alt=""/>
        <Navigation/>
      </div>

      <div className="sidebar__bottom">
        <hr/>
        <Link to="#">🚪Uitloggen</Link>
      </div>
    </div>
  );
}

export default Sidebar;