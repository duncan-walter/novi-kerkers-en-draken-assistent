// Styling
import './ZeroState.css';

// Components
import Button from '@components/ui/Button/Button.jsx';

function ZeroState({icon: Icon, text, buttonLabel, buttonIcon, buttonOnClick}) {
  return (
    <div className="zero-state">
      <Icon
        className="zero-state__icon"
        size="250"
        weight="fill"
      />

      <p className="zero-state__text">{text}</p>

      {buttonLabel && (
        <Button
          label={buttonLabel}
          icon={buttonIcon}
          onClick={buttonOnClick}
        />
      )}
    </div>
  )
}

export default ZeroState;