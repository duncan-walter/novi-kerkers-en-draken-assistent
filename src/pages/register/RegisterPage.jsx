// Styling
import './RegisterPage.css';

// Framework dependencies
import {useForm} from 'react-hook-form';

// Components
import Panel from '../../components/ui/Panel/Panel.jsx';
import LinkElement from '../../components/ui/LinkElement/LinkElement.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import TextFormControl from '../../components/form-controls/TextFormControl/TextFormControl.jsx';
import PasswordFormControl from '../../components/form-controls/PasswordFormControl/PasswordFormControl.jsx';

function RegisterPage() {
  const {
    handleSubmit,
    formState: {errors},
    register
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
  }

  return (<>
    <div className="register-welcome-message">
      <p className="register-welcome-message__title">
        Een nieuwe held betreedt de wereld.
      </p>
      <p className="register-welcome-message__spoken">
        "Maar eerst: wie ben jij echt?<br/>
        Vul je gegevens in, jongeling."
      </p>
    </div>

    <Panel variant="medium">
      <form className="register-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextFormControl
          id="register-form-email"
          name="register-form-email"
          label="E-mailadres"
          placeholder="student@novi-education.nl"
          register={register}
          error={errors['register-form-email']}
          validationRules={{
            required: true
          }}
        />

        <PasswordFormControl
          id="register-form-password"
          name="register-form-password"
          label="Wachtwoord"
          register={register}
          error={errors['register-form-password']}
          validationRules={{
            required: true
          }}
        />

        <PasswordFormControl
          id="register-form-repeat-password"
          name="register-form-repeat-password"
          label="Wachtwoord herhalen"
          register={register}
          error={errors['register-form-repeat-password']}
          validationRules={{
            required: true
          }}
        />

        <p className="register-form__no-account">
          Heb je al een account?&nbsp;
          <LinkElement url="/login" label="Klik dan hier!" underline={true}/>
        </p>

        <div className="register-form__submit-button">
          <Button label="Registreren" type="submit"/>
        </div>
      </form>
    </Panel>
  </>);
}

export default RegisterPage;