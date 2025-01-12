import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionChangeConnection, actionChangeCredentials } from '../../store/reducer/account';
import { actionCheckConnexion, actionCheckSignin, actionCheckSignup } from '../../store/thunks/checkLogin';
import { TbArrowBackUpDouble } from "react-icons/tb";

import './LoginPage.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";

function LoginPage() {
  const dispatch = useAppDispatch();
  const connection = useAppSelector((state) => state.account.connection);
  const mailValue = useAppSelector((state) => state.account.credentials.email);
  const passwordSigninValue = useAppSelector((state) => state.account.credentials.passwordSignin);
  const passwordValue = useAppSelector((state) => state.account.credentials.password);
  const passwordConfirmValue = useAppSelector((state) => state.account.credentials.passwordConfirm);
  const validFormConnection = useAppSelector((state) => state.account.credentials.formConnection);
  const validFormSignup1 = useAppSelector((state) => state.account.credentials.formSignup1);
  const validFormSignup2 = useAppSelector((state) => state.account.credentials.formSignup2);
  const errorSignup = useAppSelector((state) => state.account.credentials.errorSignup);
  const errorSignin = useAppSelector((state) => state.account.credentials.errorSignup);

  const connectionRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const signupRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    switch (connection) {
      case 'checking':
        if (connectionRef.current) {
          connectionRef.current.focus();
        }
        break;
      case 'login':
        if (loginRef.current) {
          setTimeout(() => {
            loginRef.current?.focus();
          }, 500);
        }

        break;
      case 'signup':
        if (signupRef.current) {
          setTimeout(() => {
            signupRef.current?.focus();
          }, 500);
        }
    }
  }, [connection])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin', value: string };;
    dispatch(actionChangeCredentials({ name, value }));
  }

  const changeConnection = () => {
    dispatch(actionChangeConnection('checking'));
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(actionCheckConnexion());
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(actionCheckSignup());
  }

  const handleSiginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultSignin = await dispatch(actionCheckSignin());
    if (actionCheckSignin.fulfilled.match(resultSignin)) {
      navigate('/profile');
    }
  }

  return (
    <div className="container">

      <div className={connection === 'checking' ? "connection" : "connection connection-signup"}>
        {/* <h1 className="connection_title">DTK</h1> */}
        <form onSubmit={handleEmailSubmit} className="connection_form">
          <span className="connection_form_title">Se connecter</span>
          <label htmlFor="mail" className="connection_form_mailLabel">Saisissez votre adresse e-mail.</label>
          <input type="mail" placeholder='E-mail' name='email' ref={connectionRef} value={mailValue} onChange={handleChange} className="connection_form_mailInput" />
          <button type="submit" className={validFormConnection ? "connection_form_mailButton" : "connection_form_mailButton connection_form_mailButton-disabled"} disabled={!validFormConnection}>Continuer</button>
        </form>
        <div className="connection_bottom">
          <span className="connection_bottom_conf">Confidentialité</span>
        </div>

      </div>

      <div className={connection === 'login' ? "login" : "login login-hidden"}>
        <form onSubmit={handleSiginSubmit} className="login_form">
          <span className="login_form_title">Se connecter</span>
          <label htmlFor="password" className="login_form_mailLabel">Indiquer votre mot de passe.</label>
          <input type="password" placeholder='Mot de passe' name='passwordSignin' ref={loginRef} value={passwordSigninValue} onChange={handleChange} className="login_form_mailInput" />
          <button type="submit" className="login_form_mailButton">Continuer</button>
        </form>
        <div className="login_form_errors">
          <span className="login_form_errors_error">{errorSignin}</span>
        </div>
        <div className={connection === 'signup' ? "connection_bottom connection_bottom-signup" : "connection_bottom"}>
          <span className="connection_bottom_conf">Confidentialité</span>
          <TbArrowBackUpDouble size={35} onClick={changeConnection} className="connection_bottom_back" />
        </div>
      </div>

      <div className={connection === 'signup' ? "signup" : "signup signup-hidden"}>
        <form onSubmit={handleSignupSubmit} className="signup_form">
          <span className="signup_form_title">S'inscrire</span>
          <fieldset className="signup_form_password">
            <label htmlFor="password" className="signup_form_password_label">Choisissez votre mot de passe.</label>
            <input type="password" placeholder='Mot de passe' name='password' ref={signupRef} value={passwordValue} onChange={handleChange} className="signup_form_password_input" />
          </fieldset>

          <div className="signup_form_errors">
            {typeof errorSignup === "object" && errorSignup && errorSignup.map((err, index) => (
              index === 0 && <span key={index} className="signup_form_errors_error">{err}</span>
            ))}
          </div>

          <fieldset className="signup_form_passwordConfirm">
            <label htmlFor="password" className="signup_form_passwordConfirm_label">Confirmer votre mot de passe.</label>
            <input type="password" placeholder='Mot de passe' name='passwordConfirm' value={passwordConfirmValue} onChange={handleChange} className="signup_form_passwordConfirm_input" />
          </fieldset>

          <button type="submit" className={validFormSignup1 && validFormSignup2 ? "signup_form_mailButton" : "signup_form_mailButton signup_form_mailButton-disabled"} disabled={!(validFormSignup1 && validFormSignup2)}>Continuer</button>
        </form>
        <div className={connection === 'signup' ? "connection_bottom connection_bottom-signup" : "connection_bottom"}>
          <span className="connection_bottom_conf">Confidentialité</span>
          <TbArrowBackUpDouble size={35} onClick={changeConnection} className="connection_bottom_back" />
        </div>
      </div>
    </div >
  )
}

export default LoginPage;
