// Styling
import './AuthorizedLayoutPage.css';

// Framework dependencies
import {Outlet} from 'react-router-dom';

// Components
import Sidebar from '../../../components/ui/Sidebar/Sidebar.jsx';

function AuthorizedLayoutPage() {
  return (
    <div className="authorized-layout">
      <aside>
        <Sidebar/>
      </aside>

      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default AuthorizedLayoutPage;