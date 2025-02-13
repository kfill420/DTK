
import './Infos.scss'
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AccountI, CheckProfileAddressI, CheckProfileInfosI } from '../../../@types/account';
import ModalAddAddress from './ModalAddAddress/ModalAddAddress';
import { ChangeEvent, FormEvent, useState } from 'react';
import { actionAddAddressFromAccount, actionDeleteAddressFromAccount, actionUpdateAddressFromAccount, actionUpdateInfosFromAccount } from '../../../store/thunks/checkAccount';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ModalInfos from './ModalInfos/ModalInfos';
import DOMPurify from 'dompurify';
import { setIsOpen, toggleIsOpen } from "../../../store/reducer/modal";
import { actionChangeAddressAllInfos, actionChangeAddressOneInfo, actionResetAddress } from "../../../store/reducer/account";

function Infos({ account }: AccountI) {
  const dispatch = useAppDispatch();

  const modalAdressIsOpen = useAppSelector((state) => state.ModalMenu.modals.modalAdressIsOpen);
  const modalInfosIsOpen = useAppSelector((state) => state.ModalMenu.modals.modalInfosIsOpen);
  const modalAddressIsEdit = useAppSelector((state) => state.ModalMenu.modals.modalAddressIsEdit);

  const address = useAppSelector((state) => state.account.account.address);
  const countries = useAppSelector((state) => state.account.listCountries);

  // const initialFormData = {
  //   id: null as null | number,
  //   account_id: account.id as number | null,
  //   default: false,
  //   firstname: '',
  //   lastname: '',
  //   entreprise: '',
  //   address: '',
  //   precision: '',
  //   postal_code: '',
  //   city: '',
  //   country: {
  //     id: 73 as null | number,
  //     name: 'France',
  //     code: 'FR',
  //     dial_code: '+33',
  //   } as CountryI,
  //   phone: '',
  // }
  // const [formData, setFormData] = useState(initialFormData);

  const initialInfosFormData = {
    email: account.email,
    firstname: '',
    lastname: '',
  }
  const [infosFormData, setInfosFormData] = useState(initialInfosFormData);

  const handleOpen = () => {
    dispatch(toggleIsOpen('modalAdressIsOpen'));
    dispatch(setIsOpen({ modal: 'modalAddressIsEdit', value: false }));
  };

  const handleModify = (args?: { address?: CheckProfileAddressI; infos?: CheckProfileInfosI }) => {
    const { address, infos } = args || {};
    if (address) {
      dispatch(setIsOpen({ modal: 'modalAddressIsEdit', value: true }));
      dispatch(actionChangeAddressAllInfos(address));
      dispatch(toggleIsOpen('modalAdressIsOpen'));
    }
    if (infos) {
      dispatch(toggleIsOpen('modalInfosIsOpen'));
      setInfosFormData({
        email: account.email,
        firstname: account.firstname,
        lastname: account.lastname,
      });
    }

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (modalAdressIsOpen) {
      dispatch(actionChangeAddressOneInfo({ name, value }));
    }
    if
      (modalInfosIsOpen) {
      setInfosFormData({ ...infosFormData, [name]: value });
    }
  }

  const handleDelete = () => {
    dispatch(actionDeleteAddressFromAccount({ account_id: account.id, address_id: address.id }));
    dispatch(toggleIsOpen('modalAdressIsOpen'));
  }

  const getPrimaryAddressFirst = () => {
    const listAddresses = [...account.listAddress];
    const indexDefault = listAddresses.findIndex((address) => address.default);

    if (indexDefault === -1) {
      return listAddresses;
    }

    const [defaultAddress] = listAddresses.splice(indexDefault, 1);
    listAddresses.unshift(defaultAddress);

    return listAddresses;
  }


  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    if (modalAdressIsOpen) {
      dispatch(toggleIsOpen('modalAdressIsOpen'));
      dispatch(actionResetAddress());
    }
    if (modalInfosIsOpen) {
      dispatch(toggleIsOpen('modalInfosIsOpen'));
      setInfosFormData(initialInfosFormData);
    }

  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (modalInfosIsOpen) {
      const data = { ...infosFormData, account_id: account.id };
      const escapedEmail = DOMPurify.sanitize(data.email);
      const escapedFirstname = DOMPurify.sanitize(data.firstname);
      const escapedLastname = DOMPurify.sanitize(data.lastname);
      const dataEscaped = { email: escapedEmail, firstname: escapedFirstname, lastname: escapedLastname, account_id: data.account_id };
      dispatch(actionUpdateInfosFromAccount(dataEscaped));
      dispatch(toggleIsOpen('modalInfosIsOpen'));
      return;
    }
    if (modalAddressIsEdit) {
      dispatch(actionResetAddress());
      const dataEscaped = {
        ...address,
        firstname: DOMPurify.sanitize(address.firstname),
        lastname: DOMPurify.sanitize(address.lastname),
        entreprise: DOMPurify.sanitize(address.entreprise),
        address: DOMPurify.sanitize(address.address),
        precision: DOMPurify.sanitize(address.precision),
        postal_code: DOMPurify.sanitize(address.postal_code),
        city: DOMPurify.sanitize(address.city),
        phone: DOMPurify.sanitize(address.phone)
      };
      dispatch(actionUpdateAddressFromAccount(dataEscaped));
    } else {
      dispatch(actionResetAddress());
      const dataEscaped = {
        ...address,
        account_id: account.id,
        firstname: DOMPurify.sanitize(address.firstname),
        lastname: DOMPurify.sanitize(address.lastname),
        entreprise: DOMPurify.sanitize(address.entreprise),
        address: DOMPurify.sanitize(address.address),
        precision: DOMPurify.sanitize(address.precision),
        postal_code: DOMPurify.sanitize(address.postal_code),
        city: DOMPurify.sanitize(address.city),
        phone: DOMPurify.sanitize(address.phone)
      };
      dispatch(actionAddAddressFromAccount(dataEscaped));
    }
    dispatch(toggleIsOpen('modalAdressIsOpen'));
    return;
  }

  return (
    <div className="infos">
      <h2 className="infos_title">Profil</h2>
      <div className="infos_infos">
        <span className="infos_infos_name">Nom</span>
        <span className="infos_infos_value">{account.firstname} {account.lastname}</span>
        <span className="infos_infos_name">E-mail</span>
        <span className="infos_infos_value">{account.email}</span>
        <span className="infos_infos_button" onClick={() => handleModify({ infos: infosFormData })}><CiEdit size={20} /></span>
      </div>
      <div className="infos_address">
        <div className="infos_address_header">
          <span className="infos_address_header_name">Adresse</span>
          <button onClick={handleOpen} className="infos_address_header_button"><FaPlus size={12} />Ajouter</button>
        </div>
        {
          getPrimaryAddressFirst().length === 0 ? (
            <div>
              <span className="infos_address_noAddress"><IoInformationCircleOutline size={20} />Aucune adresse ajoutée</span>
              <span className="infos_address_value"></span>
            </div>

          ) : (
            getPrimaryAddressFirst().map((address, index) => (
              <div key={index} className="infos_address_address">
                {address.default && <span className="infos_address_address_default">Adresse par défaut</span>}
                <span className="infos_address_address_value">{address.firstname} {address.lastname}</span>
                <span className="infos_address_address_value">{address.entreprise}</span>
                <span className="infos_address_address_value">{address.address}</span>
                <span className="infos_address_address_value">{address.precision}</span>
                <span>{address.postal_code} {address.city}</span>
                <span className="infos_address_address_value">{address.country.name}</span>
                <span className="infos_address_address_value">{address.phone}</span>
                <span className="infos_address_address_modif" onClick={() => handleModify({ address: address })}><CiEdit size={20} /></span>
              </div>
            ))
          )
        }

      </div>
      <ModalAddAddress isOpen={modalAdressIsOpen} formData={address} modalAddressIsEdit={modalAddressIsEdit} countries={countries}
        handleChange={handleChange} handleDelete={handleDelete} handleReset={handleReset} handleSubmit={handleSubmit} />
      <ModalInfos isOpen={modalInfosIsOpen} formData={infosFormData}
        handleChange={handleChange} handleReset={handleReset} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Infos;
