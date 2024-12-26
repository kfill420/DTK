
import './Infos.scss'
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

import { AccountI } from '../../../@types/account';
import ModalAddAddress from './ModalAddAddress/ModalAddAddress';
import { useState } from 'react';

function Infos({ account }: AccountI) {
  const [modalAdressIsOpen, setModalAdressIsOpen] = useState(false);

  const handleOpen = () => {
    setModalAdressIsOpen(!modalAdressIsOpen);
  };

  return (
    <div className="infos">
      <h2 className="infos_title">Profil</h2>
      <div className="infos_infos">
        <span className="infos_infos_name">Nom <CiEdit size={20} /></span>
        <span className="infos_infos_value"></span>
      </div>
      <div className="infos_infos">
        <span className="infos_infos_name">E-mail <CiEdit size={20} /></span>
        <span className="infos_infos_value">{account.email}</span>
      </div>
      <div className="infos_infos">
        <div className="infos_infos_header">
          <span className="infos_infos_header_name">Adresse</span>
          <button onClick={handleOpen} className="infos_infos_header_button"><FaPlus size={12} />Adresse</button>
        </div>
        <span className="infos_infos_noAddress"><IoInformationCircleOutline size={20} />Aucune adresse ajoutée</span>
        <span className="infos_infos_value"></span>
      </div>
      <ModalAddAddress isOpen={modalAdressIsOpen} setIsOpen={handleOpen} />
    </div>
  )
}

export default Infos;
