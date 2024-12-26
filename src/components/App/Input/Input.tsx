import { useState } from 'react';
import './Input.scss'

function Input({ name, type, text, backWhite, required }: { name: string, type: string, text: string, backWhite?: boolean, required?: boolean }) {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  }

  const handleBlur = () => {
    setIsFocus(false);
  }
  return (
    <>
      {
        backWhite ? (
          <fieldset className={isFocus ? "inputModifWhite inputModifWhite-focus" : "inputModifWhite"} >
            < input id={name} name={name} className="inputModifWhite_input" type={type} onFocus={handleFocus} onBlur={handleBlur} required={required} placeholder='' />
            <label className="inputModifWhite_label" htmlFor={name}>{text}</label>
          </fieldset >
        ) : (
          <fieldset className={isFocus ? "inputModif inputModif-focus" : "inputModif"}>
            <input id={name} name={name} className="inputModif_input" type={type} onFocus={handleFocus} onBlur={handleBlur} required placeholder='' />
            <label className="inputModif_label" htmlFor={name}>{text}</label>
          </fieldset>
        )
      }
    </>)
}

export default Input;
