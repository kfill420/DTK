import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import countriesData from '../../../../data/countriesData.json';
import './ModalAddAddress.scss';
import Input from '../../../../components/App/Input/Input';
import Checkbox from '../../../../components/App/Checkbox/Checkbox';

function ModalAddAddress({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: () => void }) {
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  const modalAdressbackgroundRef = useRef<HTMLDivElement>(null);
  const modalAdress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCountries(countriesData);
  }, []);

  return (
    <div>
      <CSSTransition nodeRef={modalAdressbackgroundRef} in={isOpen} timeout={300} classNames="modalAddAddress_fade" unmountOnExit>
        <div ref={modalAdressbackgroundRef} className="modalAddAddress_background" onClick={setIsOpen}></div>
      </CSSTransition>

      <CSSTransition nodeRef={modalAdress} in={isOpen} timeout={300} classNames="modalAddAddress_slide-up" unmountOnExit>
        <div ref={modalAdress} className="modalAddAddress">
          <form className="modalAddAddress_form">
            <h2 className="modalAddAddress_title">Ajouter une adresse</h2>
            <Checkbox text="Définir comme adresse par défaut" />
            <select name="country-select" id="country-select" className="modalAddAddress_countries" required>
              {countries.map((country, index) => (
                country.code === "FR" ? <option key={index} value={country.code} selected>{country.name}</option>
                  :
                  <option key={index} value={country.code}>{country.name}</option>
              ))}
            </select>
            <div className="modalAddAddress_container">
              <Input name='firstname' type='text' text='Prénom' backWhite required />
              <Input name='lastname' type='text' text='Nom' backWhite required />
            </div>

            <Input name='entreprise' type='text' text='Entreprise' backWhite required />
            <Input name='address' type='text' text='Adresse' backWhite required />
            <Input name='precision' type='text' text="Complément d\'adresse" backWhite required />
            <div className="modalAddAddress_container">
              <Input name='postal_code' type='text' text='Code postal' backWhite required />
              <Input name='city' type='text' text='Ville' backWhite required />
            </div>
            <Input name='phone' type='text' text='Téléphone' backWhite required />
            <div className="modalAddAddress_buttons">
              <button className="modalAddAddress_buttons_cancel">Annnuler</button>
              <button type="submit" className="modalAddAddress_buttons_submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </CSSTransition>
    </div>

  )
}

export default ModalAddAddress;
