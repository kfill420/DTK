import './PriceSelector.scss'
import DoubleRangeSelector from "../DoubleRangeSelector/DoubleRangeSelector";

function PriceSelector({ min, max, direct }: { min: number, max: number, direct?: boolean }) {

  return (
    <div className="card-conteiner">
      <div className="card-content">
        <div data-range="#third" data-value-1="#second" data-value-0="#first" className="slider">
          <label className="label-min-value">{min}</label>
          <label className="label-max-value">{max}</label>
        </div>
        <DoubleRangeSelector direct={direct} />
      </div>
    </div>
  )
}

export default PriceSelector;
