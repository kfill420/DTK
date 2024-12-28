import './Checkbox.scss'

function Checkbox({ text, checked, handleChange }: { text: string, checked: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="checkbox">
      <input type="checkbox" name="default" id="default" className="checkbox_input" checked={checked} onChange={handleChange} />
      <label htmlFor="default" className="checkbox_label">{text}</label>
    </div>
  )
}

export default Checkbox;
