import './Panel.css';

/* Notes:
 * - Variants reduce or increase the padding at the moment
 *     - Supported variants: small, large
 */
function Panel({title, variant = 'large', children}) {
  const variants = {
    small: 'panel--small',
    large: 'panel--large'
  }

  return (
    <div className={`panel ${variants[variant]}`}>
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