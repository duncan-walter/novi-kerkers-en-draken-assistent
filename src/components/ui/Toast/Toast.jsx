// Styling
import './Toast.css';

// Icons
import {CheckCircleIcon, XCircleIcon, XIcon} from '@phosphor-icons/react';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';

function Toast({message, type = "success", onClose}) {
  const iconByType = {
    success: <CheckCircleIcon size="20" weight="fill"/>,
    error: <XCircleIcon size="20" weight="fill"/>
  };

  const toastIcon = iconByType[type] || null;

  return (
    <div className="toast-wrapper">
      <Panel variant="small">
        <div className={`toast toast--${type}`}>
          <div className="toast__message">
            <span className="toast__icon">{toastIcon}</span>
            <p className="toast__text">{message}</p>
          </div>

          <button className="toast__close-button" onClick={onClose}>
            <XIcon weight="bold"/>
          </button>
        </div>
      </Panel>
    </div>
  );
}

export default Toast;