import { romanDateMap, ConverterMode } from '../constants.ts'

const isBinary = (str: string) => {
  const num = parseInt(str, 2)
  return num.toString(2) === str
}

const convertToRoman = (value: number) => {
  let processedValue = value
  let roman = ''
  Object.keys(romanDateMap).forEach((i: string) => {
    while (processedValue >= romanDateMap[i]) {
      roman += i
      processedValue -= romanDateMap[i]
    }
  })
  return roman
}

const convertor = {
  [ConverterMode.decimal]: {
    binary(value: string):string { return Number(value).toString(2) },
    decimal(value: string):string { return value },
    roman(value: string): string {
      const preparedValue = Number(value)
      return convertToRoman(preparedValue)
    },
  },
  [ConverterMode.binary]: {
    binary(value: string):string {
      return isBinary(value) ? value : ''
    },
    decimal(value: string):number {
      return isBinary(value) ? parseInt(value, 2) : 0
    },
    roman(value: string): string {
      if (isBinary(value)) {
        const preparedValue = this.decimal(value)
        return convertToRoman(preparedValue)
      }
      return ''
    },
  },
}

export default convertor
