import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionChangeConnection, actionChangeCredentials } from '../../store/reducer/account';
import { actionCheckConnexion, actionCheckSignin, actionCheckSignup } from '../../store/thunks/checkLogin';
import { TbArrowBackUpDouble, TbPoint } from "react-icons/tb";

import './LoginPage.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RefObject, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ButtonLoader from "../../components/App/ButtonLoader/ButtonLoader";
import axios from "axios";
import { validePassword } from "../../utils/regexValidator";

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
  // const errorSignup = useAppSelector((state) => state.account.credentials.errorSignup);
  const errorSignin = useAppSelector((state) => state.account.credentials.errorSignup);

  const connectionFocusRef = useRef<HTMLInputElement>(null);
  const loginFocusRef = useRef<HTMLInputElement>(null);
  const signupFocusRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  const signupPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const checkingRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const signupRef = useRef<HTMLInputElement>(null);

  const [searchParams] = useSearchParams();

  const [passwordValidation, setPasswordValidation] = useState({
    caractMini8: false,
    minuscule: false,
    majuscule: false,
    chiffre: false,
    special: false,
  });
  const [passwordConfirmValidation, setPasswordConfirmValidation] = useState(false);
  const [passwordSignupFocus, setPasswordSignupFocus] = useState({
    password: false,
    passwordConfirm: false,
  });


  const navigate = useNavigate();

  useEffect(() => {
    if (connection === 'checking' && connectionFocusRef.current)
      connectionFocusRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      return;
    }

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/confirmation/${token}`)
      .then((res) => {
        navigate(res.data.redirectUrl);
      })
      .catch((err) => {
        console.log(err);
        navigate('/login?confirmed=false');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin', value: string };
    if (name === "password") {
      const passwordValidation = validePassword(value);
      setPasswordValidation(passwordValidation);
      if (value === passwordConfirmValue)
        setPasswordConfirmValidation(true);
      else
        setPasswordConfirmValidation(false);
    } else if (name === "passwordConfirm") {
      if (value === passwordValue)
        setPasswordConfirmValidation(true);
      else
        setPasswordConfirmValidation(false);
    }
    dispatch(actionChangeCredentials({ name, value }));
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setPasswordSignupFocus(prev => ({
      ...prev,
      password: name === 'password' ? true : prev.password,
      passwordConfirm: name === 'passwordConfirm' ? true : prev.passwordConfirm
    }))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setPasswordSignupFocus(prev => ({
      ...prev,
      password: name === 'password' ? false : prev.password,
      passwordConfirm: name === 'passwordConfirm' ? false : prev.passwordConfirm
    }))
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
  console.log(passwordSignupFocus);

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
              <input type="password" placeholder='Mot de passe' name='password' ref={signupFocusRef} value={passwordValue} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="checking_form_password_input" />
              <CSSTransition in={passwordSignupFocus.password} nodeRef={signupPasswordRef} classNames="extend-200" timeout={200} onEntered={() => handleTransitionEntered(signupFocusRef)} unmountOnExit appear>
                <div ref={signupPasswordRef} className="checking_form_errors checking_form_errors-signup">
                  <span className={Object.values(passwordValidation).every(value => value === true) ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}>Le mot de passe doit contenir au minimum</span>
                  <span className={passwordValidation.caractMini8 ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}><TbPoint size={15} />8 caractères</span>
                  <span className={passwordValidation.minuscule ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}><TbPoint size={15} />1 minuscule</span>
                  <span className={passwordValidation.majuscule ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}><TbPoint size={15} />1 majuscule</span>
                  <span className={passwordValidation.chiffre ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}><TbPoint size={15} />1 chiffre</span>
                  <span className={passwordValidation.special ? "checking_form_errors_error-signup checking_form_errors_error-signup-ok" : "checking_form_errors_error-signup"}><TbPoint size={15} />1 caractère spécial</span>
                </div>
              </CSSTransition>
            </fieldset>


            <fieldset className="checking_form_passwordConfirm">
              <label htmlFor="password" className="checking_form_passwordConfirm_label">Confirmer votre mot de passe.</label>
              <input type="password" placeholder='Mot de passe' name='passwordConfirm' value={passwordConfirmValue} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className="checking_form_passwordConfirm_input" />
              <CSSTransition in={passwordSignupFocus.passwordConfirm} nodeRef={signupPasswordConfirmRef} classNames="extend-200" timeout={200} unmountOnExit appear>
                <div ref={signupPasswordConfirmRef}>
                  <span className={passwordConfirmValidation ? "checking_form_passwordConfirm_error checking_form_passwordConfirm_error-ok" : "checking_form_passwordConfirm_error"}><TbPoint size={15} />Les mots de passe doivent être identiques</span>
                </div>
              </CSSTransition>
            </fieldset>

            <ButtonLoader type='submit' disabled={(validFormSignup1 && validFormSignup2)} text='Continuer' isLoading={pending.signup} />
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
