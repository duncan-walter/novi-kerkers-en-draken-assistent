// Styling
import './App.css'

// Framework dependencies
import {Route, Routes} from "react-router-dom";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import CharacterManagementPage from "./pages/character-management/CharacterManagementPage.jsx";
import EncounterTrackerPage from "./pages/encounter-tracker/EncounterTrackerPage.jsx";
import GameInformationPage from "./pages/game-information/GameInformationPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import TestingZonePage from "./pages/testing-zone/TestingZonePage.jsx";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/character-management" element={<CharacterManagementPage/>}/>
        <Route path="/encounter-tracker" element={<EncounterTrackerPage/>}/>
        <Route path="/game-information" element={<GameInformationPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/testing-zone" element={<TestingZonePage/>}/>
      </Routes>
    </main>
  );
}

export default App