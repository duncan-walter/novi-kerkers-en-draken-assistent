import './Panel.css';

function Panel({title, children}) {
  return (
    <div className="panel">
      {title && <h1 className="panel__title">{title}</h1>}
      {children &&
        <div className="panel__content">
          {children}
        </div>
      }
    </div>
  );
}

export default Panel;