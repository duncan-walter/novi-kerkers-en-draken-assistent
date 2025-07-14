// Styling
import './Dialog.css';

// Framework dependencies
import {useEffect, useRef} from "react";

// Components
import Button from "../Button/Button.jsx";
import Panel from "../Panel/Panel.jsx";

function Dialog({isOpen, closeDialogLabel, closeDialog, children}) {
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="dialog"
      ref={dialogRef}
      onCancel={closeDialog}
    >
      <div className="dialog-wrapper">
        <Panel variant="medium">
          <div className="dialog__content">
            {children}
          </div>

          <div className="dialog__controls">
            <Button
              type="button"
              label={closeDialogLabel}
              onClick={closeDialog}
            />
          </div>
        </Panel>
      </div>
    </dialog>
  );
}

export default Dialog;