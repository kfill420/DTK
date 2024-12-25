
import './Infos.scss'
import { CiEdit } from "react-icons/ci";

function Infos() {
  return (
    <div className="infos">
      <h2 className="infos_title">Profil</h2>
      <div className="infos_infos">
        <span className="infos_infos_name">Nom <CiEdit size={20} /></span>
        <span className="infos_infos_value"></span>
      </div>
      <div className="infos_infos">
        <span className="infos_infos_name">E-mail <CiEdit size={20} /></span>
        <span className="infos_infos_value"></span>
      </div>
      <div className="infos_infos">
        <span className="infos_infos_name">Adresse <CiEdit size={20} /></span>
        <span className="infos_infos_value"></span>
      </div>
    </div>
  )
}

export default Infos;
