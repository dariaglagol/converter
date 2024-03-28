import {useEffect, useState, ChangeEvent} from 'react'
import './App.css';
import {convertor} from './utils/convertorFunctions'
import debounce from './utils/debounce.ts';
import {ConverterFrom, ConverterTo} from './constants.ts';

function App() {
  const [result, setResult] = useState<string | number | null>(null)
  const [userValue, setUserValue] = useState<string>('')
  const [to, setTo] = useState<ConverterTo>(ConverterTo.decimal)
  const [from, setFrom] = useState<ConverterFrom>(ConverterFrom.binary)
  const [error, setError] = useState<null | string>(null)

  const handleFromSelect = (value: ConverterFrom) => {
    setFrom(value)
  }

  const handleToSelect = (value: ConverterTo) => {
    setTo(value)
  }

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setUserValue(e.target.value)
  }, 500)

  useEffect(() => {
    if (userValue) {
      const calc = convertor[from][to](userValue)
      if (calc) {
        setResult(calc)
      } else {
        setError('Something went wrong...')
      }
    }
  }, [to, from, userValue]);

  const renderFromControl = () => Object.keys(ConverterFrom).map((item: string) => {
    const value = item as ConverterFrom
    return (
      <button
        key={item}
        type="button"
        onClick={() => handleFromSelect(value)}
        className={`btn btn--black ${item === from ? 'btn--active' : ''}`}
      >
        {item}
      </button>
    )
  })

  const renderToControl = () => Object.keys(ConverterTo).map((item: string) => {
    const value = item as ConverterTo
    return (
      <button
        key={item}
        type="button"
        className={`btn btn--white ${item === to ? 'btn--active' : ''}`}
        onClick={() => handleToSelect(value)}
      >
        {item}
      </button>
    )
  })

  return (
    <div className="App">
      <div className="from-area">
        <label htmlFor="user_value" className="from-area__input-label">
          Converter
        </label>
        <div className="from-area__btn-container btn-container">
          {renderFromControl()}
        </div>
        <input
          type="number"
          name="user_value"
          className="from-area_input"
          onChange={handleInputChange}
          placeholder="Waiting for your input..."
        />
      </div>
      <div className="to-area">
        <div className="to-area__btn-container btn-container">
          {renderToControl()}
        </div>
        <p className="result">{result}</p>
        <span className="error">{error}</span>
      </div>
    </div>
  )
}

export default App;
