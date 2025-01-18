import './Footer.scss'
import { IoLogoInstagram, IoLogoTiktok, IoLogoWhatsapp } from "react-icons/io5";
import { BiLogoSnapchat } from "react-icons/bi";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa6";
import { TbMailCheck } from "react-icons/tb";
import Input from '../App/Input/Input';
import { ChangeEvent, useState } from "react";
import { escapeHtml } from "../../utils/escapeHtml";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(escapeHtml(e.target.value));
  }
  return (
    <div className="footer">
      {location.pathname !== '/cart' &&

        <div className="footer_newsletter">
          <span className="footer_newsletter_title">Restez connecté avec les meilleures offres !</span>
          <span className="footer_newsletter_content">Inscrivez-vous à notre newsletter et soyez le premier à
            découvrir nos promotions exclusives sur les derniers téléphones.</span>
          <div className="footer_newsletter_form">
            <Input name="newsletter" type="email" text="Adresse mail" value={email} handleChange={handleChange} />
            <button className="footer_newsletter_form_button"><TbMailCheck size={22} />S'inscrire</button>
          </div>
        </div>
      }

      <div className={location.pathname !== '/cart' ? "footer_links" : "footer_links footer_links-cart"}>
        <div className="footer_links_information">
          <span className="footer_links_information_title">Informations utiles</span>
          <div className="footer_links_information_content">
            <span className="footer_links_information_content_item">FAQ</span>
            <span className="footer_links_information_content_item">Mentions légales</span>
            <span className="footer_links_information_content_item">Politique d'expédition</span>
            <span className="footer_links_information_content_item">Politique de remboursement</span>
            <span className="footer_links_information_content_item">Conditions de vente</span>
          </div>
        </div>
        <div className="footer_links_contact">
          <span className="footer_links_contact_title">Nous contacter</span>
          <div className="footer_links_contact_content">
            <span className="footer_links_contact_content_item">WhatsApp: +33 6 78 30 91 08</span>
            <span className="footer_links_contact_content_item">Email: alexisvignot@hotmail.fr</span>
          </div>
        </div>
        <div className="footer_links_social">
          <IoLogoInstagram size={25} />
          <IoLogoTiktok size={25} />
          <BiLogoSnapchat size={25} />
          <IoLogoWhatsapp size={25} />
        </div>
        <div className="footer_links_paiement">
          <FaCcVisa size={30} />
          <FaCcMastercard size={30} />
          <FaCcAmex size={30} />
        </div>
        <div className="footer_links_credit">
          &copy; 2024 DTK. Site conçu et développé par <a href="https://votresite.com" target="_blank" rel="noopener noreferrer" className="footer_links_credit_link">Alexis Vignot</a>.
        </div>
      </div>
    </div >
  )
}

export default Footer;
