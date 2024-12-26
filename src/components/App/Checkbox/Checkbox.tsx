import './Checkbox.scss'

function Checkbox({ text }: { text: string }) {
  return (
    <div className="checkbox">
      <input type="checkbox" name="default" id="default" className="checkbox_input" />
      <label htmlFor="default" className="checkbox_label">{text}</label>
    </div>
  )
}

export default Checkbox;
