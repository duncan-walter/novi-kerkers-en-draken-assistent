// Styling
import './LoginPage.css';

// Framework dependencies
import {useContext} from 'react';
import {useForm} from 'react-hook-form';

// Custom hooks
import {useToaster} from '../../contexts/ToasterContext.jsx';

// Contexts
import {AuthorizationContext} from '../../contexts/AuthorizationContext.jsx';

// Components
import Panel from '../../components/ui/Panel/Panel.jsx';
import LinkElement from '../../components/ui/LinkElement/LinkElement.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import TextFormControl from '../../components/form-controls/TextFormControl/TextFormControl.jsx';
import PasswordFormControl from '../../components/form-controls/PasswordFormControl/PasswordFormControl.jsx';

function LoginPage() {
  const authorizationContext = useContext(AuthorizationContext);

  const {
    handleSubmit,
    formState: {errors},
    register
  } = useForm({
    defaultValues: {
      loginFormEmail: '',
      loginFormPassword: ''
    }
  });
  const {showToast} = useToaster();

  const handleFormSubmit = async (data) => {
    const statusCode = await authorizationContext.login(
      data.loginFormEmail,
      data.loginFormPassword
    );

    switch (statusCode) {
      case 200:
        break;
      case 401:
        showToast('De mistige stem herkent je niet. Controleer je gegevens.', 'error');
        break;
      case 500:
      default:
        showToast('Een mysterieuze storing blokkeert je pad.', 'error');
        break;
    }
  }

  return (
    <div>
      {/* TODO: See how a practical reusable component can be realized for the welcome message on the login/register pages. */}
      <div className="login-welcome-message">
        <p className="login-welcome-message__title">
          Een mistige stem roept:
        </p>
        <p className="login-welcome-message__spoken">
          "Wat is je naam, reiziger?<br/>
          En bewijs dat je bent wie je zegt te zijn!"</p>
      </div>

      <Panel variant="medium">
        <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <TextFormControl
            id="login-form-email"
            name="loginFormEmail"
            label="E-mailadres"
            placeholder="student@novi-education.nl"
            register={register}
            error={errors.loginFormEmail}
            validationRules={{
              required: true
            }}
          />

          <PasswordFormControl
            id="login-form-password"
            name="loginFormPassword"
            label="Wachtwoord"
            register={register}
            error={errors.loginFormPassword}
            validationRules={{
              required: true
            }}
          />

          <p className="login-form__no-account">
            Nog geen account?&nbsp;
            <LinkElement url="/register" label="Klik dan hier!" underline={true}/>
          </p>

          <div className="login-form__submit-button">
            <Button label="Inloggen" type="submit"/>
          </div>
        </form>
      </Panel>
    </div>
  );
}

export default LoginPage;