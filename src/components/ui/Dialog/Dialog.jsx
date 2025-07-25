// Styling
import './Dialog.css';

// Framework dependencies
import {useEffect, useRef} from 'react';

// Components
import Button from '@components/ui/Button/Button.jsx';
import Panel from '@components/ui/Panel/Panel.jsx';

function Dialog({isOpen, closeDialogLabel, closeDialog, confirmDialogLabel, onConfirmDialog, children}) {
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
            {confirmDialogLabel && onConfirmDialog && (
              <Button
                type="button"
                label={confirmDialogLabel}
                onClick={onConfirmDialog}
              />
            )}

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