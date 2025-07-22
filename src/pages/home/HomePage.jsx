// Styling
import './HomePage.css';

// Framework dependencies
import {useNavigate} from 'react-router-dom';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';
import Button from '@components/ui/Button/Button.jsx';


function HomePage() {
  const navigate = useNavigate();

  return (
    <Panel
      title="Kerkers & Draken Assistent"
    >
      <div className="home-page-content">
        <section>
          <p>
            <em>"Welkom, reiziger."</em>
          </p>

          <p>
            Deze applicatie is jouw trouwe reisgenoot aan de speeltafel en is geen vervanger van het dobbelsteenritueel of
            het plezier van handgeschreven character sheets, maar een hulpmiddel om de vaart in jullie avontuur te
            houden.
          </p>

          <p>
            Geen eindeloos bladeren door boeken, geen discussie over wie er ook alweer aan de beurt was. Hier <strong>beheer
            je personages</strong>, <strong>volg je de speelvolgorde</strong> en <strong>raadpleeg je
            spelinformatie</strong> alsof je een magisch artefact in handen hebt.
          </p>

          <p>
            Besteed je tijd aan spelen, niet aan zoeken. <strong>Begin jouw reis nu.</strong>
          </p>
        </section>

        <section>
          <h2>Personages beheren</h2>

          <p>
            Hier beheer je je gezelschap van helden, schurken en alles daartussenin.
          </p>

          <p>
            Creëer nieuwe personages met:
            <ul>
              <li>Naam, class, subclass en ras</li>
              <li>Alle 6 ability scores, proficiency bonus, armor class, HP en XP</li>
              <li>Size en alignment</li>
              <li>Valuta, uitrusting en notities</li>
            </ul>
          </p>

          <p>
            <strong>Bekijk</strong> je personages, <strong>pas hun eigenschappen aan</strong>, en houd hun voortgang bij
            naarmate het avontuur vordert.
          </p>

          <p>
            <strong>Let op:</strong> uitrusting is alleen instelbaar bij aanmaken... voor nu.
          </p>

          <p>
            <strong>Maak je eerste held aan</strong> en breng hun verhaal tot leven.
          </p>

          <div className="home-page-content__button-group">
            <Button
              label="Nieuw personage"
              onClick={() => {navigate('/character-management/create-character')}}
            />

            <Button
              label="Bekijk je personages"
              onClick={() => {navigate('/character-management')}}
              variant="secondary"
            />
          </div>
        </section>

        <section>
          <h2>Speelvolgorde bijhouden</h2>

          <p>
            Breng orde in de chaos van het gevecht.
          </p>

          <p>
            Stel een encounter samen met minstens twee personages, voer het initiatief in (of klik op de d20 om het te
            laten rollen), en voeg eventuele conditions toe voordat het gevecht begint.
          </p>

          <p>
            In het overzichtsscherm:
            <ul>
              <li>Zie de initiatieven in volgorde</li>
              <li>Bekijk en wijzig stats zoals HP, AC en conditions</li>
              <li>Klik op <strong>"volgende beurt"</strong> om het gevecht voort te zetten</li>
              <li>Het actieve personage wordt automatisch gemarkeerd</li>
            </ul>
          </p>

          <p>
            <strong>Let op:</strong> gevechten worden nog niet opgeslagen.
          </p>

          <p>
            <strong>Bereid je voor, stel je partij samen en begin de strijd.</strong>
          </p>

          <Button
            label="Start een gevecht"
            onClick={() => {navigate('/encounter-tracker')}}
          />
        </section>

        <section>
          <h2>Spelinformatie inzien</h2>

          <p>
            Zoek snel en gemakkelijk naar details over:
            <ul>
              <li><strong>Wapens</strong></li>
              <li><strong>Monsters</strong></li>
            </ul>
          </p>

          <p>
            Kies een type, geef een zoekterm op of blader pagina voor pagina door de resultaten. Voeg nuttige bronnen
            toe aan je favorieten om ze snel bij de hand te hebben tijdens het spel.
          </p>

          <p>
            Elk resultaat wordt stijlvol en overzichtelijk weergegeven, zodat je zonder afleiding kunt vinden wat je
            zoekt.
          </p>

          <p>
            <strong>Zoek, ontdek, en voeg toe aan je favorieten.</strong>
          </p>

          <Button
            label="Zoek spelinformatie"
            onClick={() => {navigate('/game-information')}}
          />
        </section>
      </div>
    </Panel>
  );
}

export default HomePage;