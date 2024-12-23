import './ColorRadio.scss'
import { useLocation } from 'react-router-dom';

function ColorRadio({ selected, setSelected, colors, productName }: { selected: number, setSelected: (ïndex: number) => void, colors: string[], productName: string }) {
  const location = useLocation();

  return (
    <div className="colorRadio">
      {colors.map((color, index) => (
        <input key={index} type="radio" name={productName} className={location.pathname === "/" ? "colorRadio_color" : "colorRadio_color colorRadio_color-productPage"} checked={selected === index} onChange={() => setSelected(index)} style={{ backgroundColor: color }}></input>
      ))}
    </div >
  )
}

export default ColorRadio;
