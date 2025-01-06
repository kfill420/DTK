import { ChangeEvent } from "react";
import './PriceSelector.scss'

function PriceSelector({ min, max, change, minValue, maxValue }: { min: number, max: number, change: (e: ChangeEvent<HTMLInputElement>) => void, minValue: number, maxValue: number }) {

  return (
    <div className="card-conteiner">
      <div className="card-content">
        <div data-range="#third" data-value-1="#second" data-value-0="#first" className="slider">
          <label className="label-min-value">{min}</label>
          <label className="label-max-value">{max}</label>
        </div>
        <div className="rangeslider">
          <input id="min" className="min input-ranges" name="range_1" type="range" min={min} max={max} value={minValue} onChange={change} />
          <input id="max" className="max input-ranges" name="range_1" type="range" min={min} max={max} value={maxValue} onChange={change} />
        </div>

        <div className="rangesinput">
          <div className="rangesinput_min">
            <label className="rangesinput_min_label" htmlFor="">€</label>
            <input className="rangesinput_min_input" name="range_1" type="number" min={min} max={max} placeholder={minValue.toString()} />
          </div>
          <span className="rangesinput_joint">à</span>
          <div className="rangesinput_max">
            <label className="rangesinput_max_label" htmlFor="">€</label>
            <input className="rangesinput_max_input" name="range_1" type="number" min={min} max={max} placeholder={maxValue.toString()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceSelector;
