
import './Infos.scss'
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AccountI, CheckProfileAddressI, CheckProfileInfosI, CountryI } from '../../../@types/account';
import ModalAddAddress from './ModalAddAddress/ModalAddAddress';
import { useState } from 'react';
import { actionAddAddressFromAccount, actionDeleteAddressFromAccount, actionUpdateAddressFromAccount, actionUpdateInfosFromAccount } from '../../../store/thunks/checkAccount';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ModalInfos from './ModalInfos/ModalInfos';
import { isNumeric } from '../../../utils/regexValidator';
import DOMPurify from 'dompurify';
import { setIsOpen, toggleIsOpen } from "../../../store/reducer/modal";

function Infos({ account }: AccountI) {
  const dispatch = useAppDispatch();

  // const [modalAdressIsOpen, setModalAdressIsOpen] = useState(false);
  // const [modalInfosIsOpen, setModalInfosIsOpen] = useState(false);
  // const [modalAddressIsEdit, setModalAddressIsEdit] = useState(false);

  const modalAdressIsOpen = useAppSelector((state) => state.ModalMenu.modals.modalAdressIsOpen);
  const modalInfosIsOpen = useAppSelector((state) => state.ModalMenu.modals.modalInfosIsOpen);
  const modalAddressIsEdit = useAppSelector((state) => state.ModalMenu.modals.modalAddressIsEdit);

  const countries = useAppSelector((state) => state.account.listCountries);

  // useModalsWithBackButton([modalAdressIsOpen, modalInfosIsOpen]);

  const initialFormData = {
    id: null as null | number,
    account_id: account.id as number | null,
    default: false,
    firstname: '',
    lastname: '',
    entreprise: '',
    address: '',
    precision: '',
    postal_code: '',
    city: '',
    country: {
      id: 73 as null | number,
      name: 'France',
      code: 'FR',
      dial_code: '+33',
    } as CountryI,
    phone: '',
  }
  const [formData, setFormData] = useState(initialFormData);

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
      setFormData({
        id: address.id,
        account_id: account.id,
        default: address.default,
        firstname: address.firstname,
        lastname: address.lastname,
        entreprise: address.entreprise,
        address: address.address,
        precision: address.precision,
        postal_code: address.postal_code,
        city: address.city,
        country: {
          id: address.country.id,
          name: address.country.name,
          code: address.country.code,
          dial_code: address.country.dial_code,
        },
        phone: address.phone,
      });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (modalAdressIsOpen) {
      switch (name) {
        case 'default':
          setFormData({ ...formData, [name]: !formData.default });
          return;
        case 'country': {
          const country = countries.find(country => country.code === value);
          if (!country) return;
          const newFormData = { ...formData, country_id: country.id, country: country };
          setFormData(newFormData);
          return;
        }
        case 'postal_code':
          if (value.length > 5 || !isNumeric(value)) {
            return;
          } else setFormData({ ...formData, [name]: value });
          break;
        case 'phone':
          if (value.length > 14 || !isNumeric(value)) {
            return;
          } else setFormData({ ...formData, [name]: value });
          break;
        default:
          setFormData({ ...formData, [name]: value });
          break;
      }
    }
    if
      (modalInfosIsOpen) {
      setInfosFormData({ ...infosFormData, [name]: value });
    }
  }

  const handleDelete = () => {
    dispatch(actionDeleteAddressFromAccount({ account_id: account.id, address_id: formData.id }));
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


  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalAdressIsOpen) {
      dispatch(toggleIsOpen('modalAdressIsOpen'));
      setFormData(initialFormData);
    }
    if (modalInfosIsOpen) {
      dispatch(toggleIsOpen('modalInfosIsOpen'));
      setInfosFormData(initialInfosFormData);
    }

  }

  const handleSubmit = (e: React.FormEvent) => {
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
      setFormData(initialFormData);
      const dataEscaped = {
        ...formData,
        firstname: DOMPurify.sanitize(formData.firstname),
        lastname: DOMPurify.sanitize(formData.lastname),
        entreprise: DOMPurify.sanitize(formData.entreprise),
        address: DOMPurify.sanitize(formData.address),
        precision: DOMPurify.sanitize(formData.precision),
        postal_code: DOMPurify.sanitize(formData.postal_code),
        city: DOMPurify.sanitize(formData.city),
        phone: DOMPurify.sanitize(formData.phone)
      };
      dispatch(actionUpdateAddressFromAccount(dataEscaped));
    } else {
      setFormData(initialFormData);
      const dataEscaped = {
        ...formData,
        firstname: DOMPurify.sanitize(formData.firstname),
        lastname: DOMPurify.sanitize(formData.lastname),
        entreprise: DOMPurify.sanitize(formData.entreprise),
        address: DOMPurify.sanitize(formData.address),
        precision: DOMPurify.sanitize(formData.precision),
        postal_code: DOMPurify.sanitize(formData.postal_code),
        city: DOMPurify.sanitize(formData.city),
        phone: DOMPurify.sanitize(formData.phone)
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
      <ModalAddAddress isOpen={modalAdressIsOpen} formData={formData} modalAddressIsEdit={modalAddressIsEdit} countries={countries}
        handleChange={handleChange} handleDelete={handleDelete} handleReset={handleReset} handleSubmit={handleSubmit} />
      <ModalInfos isOpen={modalInfosIsOpen} formData={infosFormData}
        handleChange={handleChange} handleReset={handleReset} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Infos;
