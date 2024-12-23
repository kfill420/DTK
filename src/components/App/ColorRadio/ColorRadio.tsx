import './ColorRadio.scss'
import { useLocation } from 'react-router-dom';

function ColorRadio({ colors, productName }: { colors: string[], productName: string }) {
  const location = useLocation();

  return (
    <div className="colorRadio">
      {colors.map((color, index) => (
        <input key={index} type="radio" name={productName} className={location.pathname === "/" ? "colorRadio_color" : "colorRadio_color colorRadio_color-productPage"} defaultChecked={index === 0} style={{ backgroundColor: color }}></input>
      ))}
    </div >
  )
}

export default ColorRadio;
