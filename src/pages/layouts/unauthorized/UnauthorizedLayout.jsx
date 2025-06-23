// Styling
import './UnauthorizedLayout.css';

// Framework dependencies
import {Outlet} from 'react-router-dom';

function AuthorizedLayoutPage() {
  return (
    <div className="unauthorized-layout">
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default AuthorizedLayoutPage;