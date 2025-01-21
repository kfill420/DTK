import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionChangeConnection, actionChangeCredentials } from '../../store/reducer/account';
import { actionCheckConnexion, actionCheckSignin, actionCheckSignup } from '../../store/thunks/checkLogin';
import { TbArrowBackUpDouble } from "react-icons/tb";

import './LoginPage.scss'
import { useNavigate } from 'react-router-dom';
import { RefObject, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ButtonLoader from "../../components/App/ButtonLoader/ButtonLoader";

function LoginPage() {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.account.pending);

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

  const connectionFocusRef = useRef<HTMLInputElement>(null);
  const loginFocusRef = useRef<HTMLInputElement>(null);
  const signupFocusRef = useRef<HTMLInputElement>(null);

  const checkingRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const signupRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (connection === 'checking' && connectionFocusRef.current)
      connectionFocusRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    const ls = JSON.parse(localStorage.getItem('cartVisitor') || '[]');
    let resultSignin;
    if (ls && ls.length > 0)
      resultSignin = await dispatch(actionCheckSignin(ls));
    else
      resultSignin = await dispatch(actionCheckSignin(null));
    if (actionCheckSignin.fulfilled.match(resultSignin)) {
      navigate('/profile');
    }
  }

  const handleTransitionEntered = (arg: RefObject<HTMLInputElement>) => {
    arg.current?.focus();
  }
  console.log(pending.checking);

  return (
    <div className="container">
      <CSSTransition in={connection === "checking"} nodeRef={checkingRef} classNames="checking_transi" timeout={300} onEntered={() => handleTransitionEntered(connectionFocusRef)} unmountOnExit appear>
        <div ref={checkingRef} className="checking container_part">
          <form onSubmit={handleEmailSubmit} className="checking_form">
            <span className="checking_form_title">Se connecter</span>
            <label htmlFor="mail" className="checking_form_mailLabel">Saisissez votre adresse e-mail.</label>
            <input type="mail" placeholder='E-mail' name='email' ref={connectionFocusRef} value={mailValue} onChange={handleChange} className="checking_form_mailInput" />
            <ButtonLoader type='submit' disabled={validFormConnection} text='Continuer' isLoading={pending.checking} />
          </form>
          <div className="checking_bottom">
            <span className="checking_bottom_conf">Confidentialité</span>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={connection === "login"} nodeRef={loginRef} classNames="login_transi" timeout={300} onEntered={() => handleTransitionEntered(loginFocusRef)} unmountOnExit appear>
        <div ref={loginRef} className="checking container_part">
          <form onSubmit={handleSiginSubmit} className="checking_form">
            <span className="checking_form_title">Se connecter</span>
            <label htmlFor="password" className="checking_form_mailLabel">Indiquer votre mot de passe.</label>
            <input type="password" placeholder='Mot de passe' name='passwordSignin' ref={loginFocusRef} value={passwordSigninValue} onChange={handleChange} className="checking_form_mailInput" />
            <ButtonLoader type='submit' disabled={validFormConnection} text='Continuer' isLoading={pending.login} />
          </form>
          <div className="checking_form_errors">
            <span className="checking_form_errors_error">{errorSignin}</span>
          </div>
          <div className={connection === 'checking' ? "checking_bottom checking_bottom-signup" : "checking_bottom"}>
            <span className="checking_bottom_conf">Confidentialité</span>
            <TbArrowBackUpDouble size={35} onClick={changeConnection} className="checking_bottom_back" />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={connection === "signup"} nodeRef={signupRef} classNames="signup_transi" timeout={300} onEntered={() => handleTransitionEntered(signupFocusRef)} unmountOnExit appear>
        <div ref={signupRef} className="checking container_part">
          <form onSubmit={handleSignupSubmit} className="checking_form">
            <span className="checking_form_title">S'inscrire</span>
            <fieldset className="checking_form_password">
              <label htmlFor="password" className="checking_form_password_label">Choisissez votre mot de passe.</label>
              <input type="password" placeholder='Mot de passe' name='password' ref={signupFocusRef} value={passwordValue} onChange={handleChange} className="checking_form_password_input" />
              <div className="checking_form_errors checking_form_errors-signup">
                {typeof errorSignup === "object" && errorSignup && errorSignup.map((err, index) => (
                  index === 0 && <span key={index} className="checking_form_errors_error checking_form_errors-signup">{err}</span>
                ))}
              </div>
            </fieldset>



            <fieldset className="checking_form_passwordConfirm">
              <label htmlFor="password" className="checking_form_passwordConfirm_label">Confirmer votre mot de passe.</label>
              <input type="password" placeholder='Mot de passe' name='passwordConfirm' value={passwordConfirmValue} onChange={handleChange} className="checking_form_passwordConfirm_input" />
            </fieldset>

            <ButtonLoader type='submit' disabled={(validFormSignup1 && validFormSignup2)} text='Continuer' isLoading={pending.signup} />
            {/* <button type="submit" className={validFormSignup1 && validFormSignup2 ? "checking_form_mailButton" : "checking_form_mailButton checking_form_mailButton-disabled"} disabled={!(validFormSignup1 && validFormSignup2)}>Continuer</button> */}
          </form>
          <div className={connection === 'checking' ? "checking_bottom checking_bottom-checking" : "checking_bottom"}>
            <span className="connection_bottom_conf">Confidentialité</span>
            <TbArrowBackUpDouble size={35} onClick={changeConnection} className="checking_bottom_back" />
          </div>
        </div>
      </CSSTransition>
    </div >
  )
}

export default LoginPage;
