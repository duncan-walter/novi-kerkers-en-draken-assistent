import './ConditionBadge.css';

function ConditionBadge({label, onClick = undefined}) {
  return (
    <div
      className={`condition-badge ${onClick ? 'clickable-badge' : ''}`}
      onClick={onClick}
    >
      <p className="condition-badge__text">{label}</p>
    </div>
  );
}

export default ConditionBadge;