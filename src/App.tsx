import './App.css';
import {useEffect, useState} from 'react'
import {convertor, ConverterMode} from './utils/convertorFunctions'

const debounce = (callback: any, wait: number) => {
  let timeoutId: any = null;
  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function App() {
  const [res, setRes] = useState<string | number | null>(null)
  const [userValue, setUserValue] = useState<string>('')
  const [to, setTo] = useState(ConverterMode.decimal) // вот эта штука не менятеся так быстро
  const [baseCalc, setBaseCalc] = useState(ConverterMode.binary)

  const handleFromSelect = (value: string) => {
    // @ts-ignore
    setBaseCalc(value)
  }

  const handleToSelect = (value: string) => {
    // @ts-ignore
    setTo(value)
  }

  const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(e.target.value)
  }, 500)

  useEffect(() => {
    if (userValue) {
      // @ts-ignore
      const calc = convertor[baseCalc][to](userValue)
      setRes(calc)
    }
  }, [to, baseCalc, userValue]);

  return (
    <div className="App">
      <form className="set-area">
        <label htmlFor="user_value" className="user-input-label">
          Converter
        </label>
        <div className="action-btn-container">
          <button
            type="button"
            onClick={() => handleFromSelect('decimal')}
            className={`action-btn action-btn--black ${'decimal' === baseCalc ? 'action-btn--active' : ''}`}
          >
            Decimal
          </button>
          <button
            type="button"
            onClick={() => handleFromSelect('binary')}
            className={`action-btn action-btn--black ${'binary' === baseCalc ? 'action-btn--active' : ''}`}
          >
            Binary
          </button>
        </div>
        <input
          type="number"
          name="user_value"
          className="user-input"
          onChange={handleInputChange}
          placeholder="Waiting for your input..."
        />
      </form>
      <div className="res-area">
        <div className="action-btn-container">
          <button
            type="button"
            className={`action-btn action-btn--white ${'decimal' === to ? 'action-btn--active' : ''}`}
            onClick={() => handleToSelect('decimal')}
          >
            Decimal
          </button>
          <button
            type="button"
            className={`action-btn action-btn--white ${'binary' === to ? 'action-btn--active' : ''}`}
            onClick={() => handleToSelect('binary')}
          >
            Binary
          </button>
          <button
            type="button"
            className={`action-btn action-btn--white ${'roman' === to ? 'action-btn--active' : ''}`}
            onClick={() => handleToSelect('roman')}
          >
            Roman
          </button>
        </div>
        <p className="res">{res}</p>
      </div>
    </div>
  )
}

export default App;
