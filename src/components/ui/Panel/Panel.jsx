import './Panel.css';

/* Notes:
 * - Variants reduce or increase the padding at the moment
 *     - Supported variants: small, large
 */
function Panel({title, panelButton, variant = 'large', children}) {
  const variants = {
    small: 'panel--small',
    medium: 'panel--medium',
    large: 'panel--large'
  }

  return (
    <div className={`panel ${variants[variant]}`}>
      <div className="panel__header">
        {title && <h1 className="panel__title">{title}</h1>}
        {panelButton}
      </div>
      {children &&
        <div className="panel__content">
          {children}
        </div>
      }
    </div>
  );
}

export default Panel;