// Styling
import './Navigation.css';

// Constants
import navigationItems from '@constants/navigationItems.js';

// Components
import NavLinkElement from '@components/ui/NavLinkElement/NavLinkElement.jsx';

function Navigation() {
  return (
    <nav>
      <ul className="navigation-items">
        {navigationItems.map(navigationItem =>
          <NavLinkElement
            key={navigationItem.label}
            url={navigationItem.url}
            label={navigationItem.label}
          />
        )}
      </ul>
    </nav>
  );
}

export default Navigation;