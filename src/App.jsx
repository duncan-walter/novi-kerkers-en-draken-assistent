// Styling
import './App.css'

// Framework dependencies
import {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

// Contexts
import {AuthorizationContext} from "./contexts/AuthorizationContext.jsx";

// Pages
import UnauthorizedLayout from "./pages/layouts/unauthorized/UnauthorizedLayout.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import AuthorizedLayoutPage from "./pages/layouts/authorized/AuthorizedLayoutPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import EncounterTrackerPage from "./pages/encounter-tracker/EncounterTrackerPage.jsx";
import GameInformationPage from "./pages/game-information/GameInformationPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import TestingZonePage from "./pages/testing-zone/TestingZonePage.jsx";
import CharacterOverview from "./pages/character-management/character-overview/CharacterOverview.jsx";
import CharacterCreate from "./pages/character-management/character-create/CharacterCreate.jsx";
import CharacterDetails from "./pages/character-management/character-details/CharacterDetails.jsx";

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
          <Route index element={<CharacterOverview/>}/>
          <Route path="character-details/:id" element={<CharacterDetails/>}/>
          <Route path="create-character" element={<CharacterCreate/>}/>
        </Route>
        <Route path="encounter-tracker" element={<EncounterTrackerPage/>}/>
        <Route path="game-information" element={<GameInformationPage/>}/>
        <Route path="testing-zone" element={<TestingZonePage/>}/>
      </Route>

      {/* Not found / other pages */}
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;