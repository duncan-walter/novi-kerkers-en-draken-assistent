// Styling
import './RegisterPage.css';

// Framework dependencies
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';

// Custom hooks
import {useToaster} from "../../context/ToasterContext.jsx";

// Services
import {register as registerUser} from '../../services/authorizationService.js';

// Components
import Panel from '../../components/ui/Panel/Panel.jsx';
import LinkElement from '../../components/ui/LinkElement/LinkElement.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import TextFormControl from '../../components/form-controls/TextFormControl/TextFormControl.jsx';
import PasswordFormControl from '../../components/form-controls/PasswordFormControl/PasswordFormControl.jsx';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: {errors, isSubmitted}
  } = useForm({
    defaultValues: {
      registerFormEmail: '',
      registerFormPassword: '',
      registerFormRepeatPassword: ''
    }
  });
  const navigate = useNavigate();
  const {showToast} = useToaster();

  const handleFormSubmit = async (data) => {
    const statusCode = await registerUser(
      data.registerFormEmail,
      data.registerFormPassword
    );

    switch (statusCode) {
      case 201:
        showToast('Je inschrijving is voltooid! Het avontuur begint nu!', 'success');
        break;
      case 400:
        showToast('Je poging tot toetreding is mislukt. Misschien draagt een ander jouw naam al', 'error');
        break;
      case 401:
        showToast('Onbekende reiziger, toegang geweigerd', 'error');
        break;
      case 403:
        showToast('De wachters erkennen je rang niet als voldoende', 'error');
        break;
      case 500:
      default:
        showToast('Een mysterieuze storing blokkeert je pad', 'error');
        break;
    }

    if (statusCode === 201) {
      navigate('/login');
    }
  }

  const password = watch('registerFormPassword');

  // Used to trigger repeat password form control validation when password form control is updated
  useEffect(() => {
    if (isSubmitted) {
      trigger('registerFormRepeatPassword');
    }
  }, [password]);

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
          name="registerFormEmail"
          label="E-mailadres"
          placeholder="student@novi-education.nl"
          register={register}
          error={errors.registerFormEmail}
          validationRules={{
            required: true,
            validateEmail: true
          }}
        />

        <PasswordFormControl
          id="register-form-password"
          name="registerFormPassword"
          label="Wachtwoord"
          register={register}
          error={errors.registerFormPassword}
          validationRules={{
            required: true,
            minimumLength: 8,
            maximumLength: 255
          }}
        />

        <PasswordFormControl
          id="register-form-repeat-password"
          name="registerFormRepeatPassword"
          label="Wachtwoord herhalen"
          register={register}
          error={errors.registerFormRepeatPassword}
          validationRules={{
            required: true,
            matchFormControl: {
              name: 'registerFormPassword',
              label: 'Wachtwoord'
            }
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