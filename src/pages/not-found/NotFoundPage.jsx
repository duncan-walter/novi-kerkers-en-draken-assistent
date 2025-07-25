// Styling
import './NotFoundPage.css';

// Components
import Panel from "@components/ui/Panel/Panel.jsx";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__panel">
        <Panel
          title="Critical fail (404)"
        >
          <p>
            <em>
              “Je probeerde de juiste pagina te vinden... maar rolde een natural 1.”
            </em>
          </p>

          <p>
            Je hebt een fumble gemaakt op je navigatiecheck. De pagina waar je naar zocht bestaat niet (meer), of is
            misschien achter een illusie verdwenen.
          </p>

          <ul>
            <li>Probeer je geluk opnieuw via de hoofdpagina.</li>
            <li>Gebruik je perception check op de menubalk.</li>
            <li>Of roep een tovenaar (beheerder) voor hulp.</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

export default NotFoundPage;