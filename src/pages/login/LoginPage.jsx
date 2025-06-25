// Styling
import './LoginPage.css';

// Framework dependencies
import {useContext} from 'react';
import {useForm} from 'react-hook-form';

// Contexts
import {AuthorizationContext} from '../../context/AuthorizationContext.jsx';

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

  const handleFormSubmit = async (data) => {
    await authorizationContext.login(
      data.loginFormEmail,
      data.loginFormPassword
    );
  }

  return (<>
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
  </>);
}

export default LoginPage;