// Styling
import './App.css'

// Framework dependencies
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

// Pages
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import LayoutPage from "./pages/layout/LayoutPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import CharacterManagementPage from "./pages/character-management/CharacterManagementPage.jsx";
import EncounterTrackerPage from "./pages/encounter-tracker/EncounterTrackerPage.jsx";
import GameInformationPage from "./pages/game-information/GameInformationPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import TestingZonePage from "./pages/testing-zone/TestingZonePage.jsx";

function App() {
  // Temporary variable until authentication is implemented.
  const userIsLoggedIn = true;

  return (
    <Routes>
      {/* Unauthenticated pages */}
      <Route element={userIsLoggedIn ? <Navigate to="/"/> : <Outlet/>}>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Route>

      {/* Authenticated pages */}
      <Route element={userIsLoggedIn ? <Outlet/> : <Navigate to="/login"/>}>
        <Route path="/" element={<LayoutPage/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/character-management" element={<CharacterManagementPage/>}/>
          <Route path="/encounter-tracker" element={<EncounterTrackerPage/>}/>
          <Route path="/game-information" element={<GameInformationPage/>}/>
          <Route path="/testing-zone" element={<TestingZonePage/>}/>
        </Route>
      </Route>

      {/* Not found / other pages */}
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App