import './App.css';
import {useState} from 'react'
import {convertor, ConverterMode} from './utils/convertorFunctions'

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
    // @ts-ignore
    const calc = convertor[value](userValue)
    setRes(calc)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserValue(e.currentTarget.value)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="set-area">
        <label htmlFor="user_value" className="user-input-label">
          Converter
        </label>
        <div className="action-btn-container">
          <button
            onClick={() => handleFromSelect('decimal')}
            className={`action-btn action-btn--black ${'decimal' === baseCalc ? 'action-btn--active' : ''}`}
          >
            Decimal
          </button>
          <button
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
            className={`action-btn action-btn--white ${'decimal' === to ? 'action-btn--active' : ''}`}
            onClick={() => handleToSelect('decimal')}
          >
            Decimal
          </button>
          <button
            className={`action-btn action-btn--white ${'binary' === to ? 'action-btn--active' : ''}`}
            onClick={() => handleToSelect('binary')}
          >
            Binary
          </button>
          <button
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
