import './Panel.css';

/* Notes:
 * - Variants reduce or increase the padding at the moment
 *     - Supported variants: small
 */
function Panel({title, variant, children}) {
  return (
    <div className={`panel ${variant ? `panel--${variant}` : ''}`}>
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