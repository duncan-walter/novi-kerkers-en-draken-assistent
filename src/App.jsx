// Styling
import './App.css'

// Framework dependencies
import {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

// Contexts
import {AuthorizationContext} from '@contexts/AuthorizationContext.jsx';

// Pages
import UnauthorizedLayout from '@pages/layouts/unauthorized/UnauthorizedLayout.jsx';
import RegisterPage from '@pages/register/RegisterPage.jsx';
import LoginPage from '@pages/login/LoginPage.jsx';
import AuthorizedLayoutPage from '@pages/layouts/authorized/AuthorizedLayoutPage.jsx';
import HomePage from '@pages/home/HomePage.jsx';
import EncounterTrackerPage from '@pages/encounter-tracker/EncounterTrackerPage.jsx';
import GameInformationPage from '@pages/game-information/GameInformationPage.jsx';
import NotFoundPage from '@pages/not-found/NotFoundPage.jsx';
import CharacterOverviewPage from '@pages/character-management/character-overview/CharacterOverviewPage.jsx';
import CharacterCreatePage from '@pages/character-management/character-create/CharacterCreatePage.jsx';
import CharacterDetailsPage from '@pages/character-management/character-details/CharacterDetailsPage.jsx';
import WeaponInformationPage from '@pages/game-information/weapon-information/WeaponInformationPage.jsx';
import MonsterInformationPage from '@pages/game-information/monster-information/MonsterInformationPage.jsx';

function App() {
  const authorizationContext = useContext(AuthorizationContext);

  return (
    <Routes>
      {/* Unauthenticated pages */}
      <Route element={authorizationContext.user ? <Navigate to="/"/> : <UnauthorizedLayout/>}>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
      </Route>

      {/* Authenticated pages */}
      <Route element={authorizationContext.user ? <AuthorizedLayoutPage/> : <Navigate to="/login"/>}>
        <Route index element={<HomePage/>}/>
        <Route path="character-management">
          <Route index element={<CharacterOverviewPage/>}/>
          <Route path="character-details/:id" element={<CharacterDetailsPage/>}/>
          <Route path="create-character" element={<CharacterCreatePage/>}/>
        </Route>
        <Route path="encounter-tracker" element={<EncounterTrackerPage/>}/>
        <Route path="game-information">
          <Route index element={<GameInformationPage/>}/>
          <Route path="weapons/:id" element={<WeaponInformationPage/>}/>
          <Route path="monsters/:id" element={<MonsterInformationPage/>}/>
        </Route>
      </Route>

      {/* Not found / other pages */}
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;