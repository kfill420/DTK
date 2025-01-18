import './ColorRadio.scss'

function ColorRadio({ selected, setSelected, colors, product, productName }: { selected: number, setSelected: (ïndex: number) => void, colors: string[], product?: boolean, productName: string }) {

  return (
    <div className="colorRadio">
      {colors.map((color, index) => (
        <div>
          <input key={index} type="radio" name={productName} className={product ? "colorRadio_color colorRadio_color-productPage" : "colorRadio_color"} checked={selected === index} onChange={() => setSelected(index)} style={{ backgroundColor: color }}></input>
          <label htmlFor={productName} className="sr-only">{color}</label>
        </div>

      ))}
    </div >
  )
}

export default ColorRadio;
