# Kerkers & Draken Assistent

## Inhoudsopgave

- [Inleiding](#inleiding)
- [Benodigdheden](#benodigdheden)
- [De applicatie draaien](#de-applicatie-draaien)
- [Testgebruikers](#testgebruikers)
- [Overige commando's](#overige-commandos)

## Inleiding

Dungeons & Dragons, de Adam en Eva van het RPG-genre. Wie kent het niet? Een rollenspel waarbij spelers in de huid
kruipen van zelfgemaakte personages.

Tijdens het spelen, zeker in analoge vorm, kost het bijhouden van gevechtsvolgordes en het opzoeken van regels of
informatie (zoals wapens en monsters) vaak onnodig veel tijd. Dit kan het speltempo vertragen en de aandacht van het
verhaal afleiden.

**Maak kennis met de Kerkers & Draken Assistent!**<br/>
Deze applicatie automatiseert veelvoorkomende en tijdrovende
handelingen tijdens het spel. Minder administratie, meer avontuur! Na het inloggen kun je direct aan de slag met:

- Personages beheren
    - Ga naar de pagina "Personage beheren"
    - Bekijk al je bestaande personages in één overzicht
    - Maak eenvoudig nieuwe personages aan
    - Klik op een personage voor gedetailleerde informatie
    - Pas de detailinformatie van een personage aan
- De speelvolgorde in een gevecht bijhouden
    - Navigeer naar "Speelvolgorde bijhouden"
    - Selecteer de personages die deelnemen aan het gevecht
    - Voer hun initiatief in
    - Voeg eventuele conditions toe
    - Start het gevecht en houd de volgorde automatisch bij
- En eenvoudig door informatie over wapens en monsters te bladeren:
    - Navigeer naar de "Spelinformatie inzien" pagina
    - Kies het gewenste type spelinformatie
    - Voeg eventueel een zoekterm in
    - Blader door de resultaten
    - Klik op een resultaat voor uitgebreide details

https://github.com/user-attachments/assets/6b0dfd09-3dd6-4138-a630-a697a1657d74

## Benodigdheden

Deze applicatie maakt gebruik van environment variabelen. Normaal gesproken worden deze niet openbaar gedeeld, maar in
dit geval zijn ze opgenomen zodat de examinator de applicatie kan draaien. Het instellen van deze variabelen wordt in het volgende hoofdstuk toegelicht.

Voor het draaien van deze applicatie is een werkende backend vereist. Hiervoor is gebruikgemaakt van de NOVI Dynamic
API. De backed zou al correct geconfigureerd moeten zijn. Mocht dit niet het geval zijn, dan kunnen de optionele stappen
in het volgende hoofdstuk worden gevold.

Daarnaast is tijdens de ontwikkeling gebruikgemaakt van de volgende tools en versies:

- Node.js - v21.6.1
- npm - 10.2.4
- Google Chrome - 138.0.7204.159 (64-bit)

Voor een soepele werking wordt aanbevolen om dezelfde of een vergelijkbare versie van deze tools te gebruiken.

## De applicatie draaien

Hier wordt stapsgewijst uitgelegd hoe de applicatie lokaal geïnstalleerd en uitgevoerd kan worden.
Volg de onderstaande stappen om de omgeving correct op te zetten en de applicatie te starten:

1. **Installeer Node.js**  
   Download en installeer Node.js via: https://nodejs.org/en/download  
   *(npm wordt automatisch meegeleverd)*

2. **Clone de repository**  
   Haal de code naar de lokale machine via `git clone` of download het project op een andere manier.

3. **Maak een `.env`-bestand aan**  
   Kopieer het bestand `.env.dist` naar de root van het project en hernoem het naar `.env`.

4. **Vul de environment variabelen in**  
   Hoewel environment variabelen normaal gesproken niet openbaar gedeeld worden, zijn ze in dit geval
   toegevoegd zodat de applicatie correct kan functioneren tijdens de beoordeling. Voeg de onderstaande
   waarden toe aan het zojuist aangemaakte `.env`-bestand:
   ```
   VITE_NOVI_DYNAMIC_API_BASE_URL=https://novi-backend-api-wgsgz.ondigitalocean.app/api  
   VITE_NOVI_DYNAMIC_API_PROJECT_ID=ec0bf4cc-4e94-4807-8041-d95b0731722b  
   VITE_DND5E_API_BASE_URL=https://www.dnd5eapi.co/api/2014
   ```

6. **Installeer de benodigde packages**  
   Voer het volgende commando uit in de root van het project:
    ```bash
    npm install
    ```

6. **Start de applicatie**  
   Start de webserver met het volgende commando:
    ```bash
    npm run dev
    ```

7. **Open de applicatie in de browser**  
   Navigeer naar de volgende URL (standaard):
   http://localhost:5173/

8. **Veel plezier met het gebruik van de applicatie!**

### Optionele stappen om de Novi Dynamic API opnieuw te configureren:
1. **Open de configuratiepagina van de NOVI Dynamic API**  
   Ga naar: https://novi-backend-api-wgsgz.ondigitalocean.app/

2. **Voer het Project ID in**  
   Onder het kopje *"API Configureren"*, vul het volgende Project ID in: `ec0bf4cc-4e94-4807-8041-d95b0731722b`

3. **Selecteer het schema**  
   Klik op *"Bestand kiezen"* en selecteer het bestand `schema.json` in de folder `/database` van deze repository.

4. **Schema uploaden**  
   Klik op *"Upload API configuratie"* om het geselecteerde schema te uploaden.

5. **Configuratie voltooid**  
   De backend is nu opnieuw geconfigureerd en klaar voor gebruik.

## Testgebruikers

De gegevens in de onderstaande tabel kunnen worden gebruikt om in te loggen op de applicatie.
Het is ook mogelijk om zelf een nieuw account aan te maken.

| E-mailadres                  | Wachtwoord                               | Doel                                                                     |
|------------------------------|------------------------------------------|--------------------------------------------------------------------------|
| account.with.data@kda.com    | thispasswordisincrediblydifficulttocrack | Applicatie inzien waarbij initiële data aanwezig is.                     |
| account.with.no.data@kda.com | thispasswordislessdifficulttocrack       | Applicatie inzien uit het perspectief van een nieuw account zonder data. |

## Overige commando's

N.v.t.
