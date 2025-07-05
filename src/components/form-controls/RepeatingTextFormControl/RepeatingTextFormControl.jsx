// Styling
import './RepeatingTextFormControl.css';

// Icons
import {PlusIcon, XIcon} from "@phosphor-icons/react";

// Framework dependencies
import {useEffect, useRef, useState} from 'react';

// Components
import TextFormControl from '../TextFormControl/TextFormControl.jsx';
import Button from "../../ui/Button/Button.jsx";

function TextFormGroupControl({id, name, label, placeholder, register, unregister, errors, validationRules}) {
  const [textFormControls, setTextFormControls] = useState([]);
  const pendingUnregisterIndexRef = useRef(null);

  const addTextFormControl = () => {
    setTextFormControls([
      ...textFormControls,
      {id: crypto.randomUUID()}
    ]);
  };

  const removeTextFormControl = (id) => {
    setTextFormControls(previousTextFormControls => {
      pendingUnregisterIndexRef.current = previousTextFormControls.find(textFormControl => textFormControl.id === id).id;
      return previousTextFormControls.filter(textFormControl => textFormControl.id !== id);
    });
  }

  // Remove needs to happen during an update lifecycle.
  // Removing it in the removeTextFormControl function wasn't possible because another component was rendering and this was causing issues.
  useEffect(() => {
    if (pendingUnregisterIndexRef.current) {
      unregister(`${name}.${pendingUnregisterIndexRef.current}`);
      pendingUnregisterIndexRef.current = null;
    }
  }, [textFormControls]);

  useEffect(() => {
    addTextFormControl();
  }, []);

  return (
    <div className="text-form-group-control">
      <label className="form-control__label">
        {label}
      </label>

      {textFormControls.map((textFormControl) => (
        <div key={textFormControl.id} className="text-form-group-control__item">
          <div className="text-form-group-control__text-form-control">
            <TextFormControl
              id={`${id}[${textFormControl.id}]`}
              name={`${name}[${textFormControl.id}]`}
              placeholder={placeholder}
              register={register}
              error={errors?.[name]?.[textFormControl.id]}
              validationRules={validationRules}
            />
          </div>

          <div className="text-form-group-control__remove-button">
            <Button
              icon={XIcon}
              onClick={() => removeTextFormControl(textFormControl.id)}
            />
          </div>
        </div>
      ))}

      <Button
        className="form-control__add-button"
        type="button"
        variant="secondary"
        icon={PlusIcon}
        onClick={addTextFormControl}
      />
    </div>
  );
}

export default TextFormGroupControl;