import {romanDateMap} from '../constants'
import {ConverterMode} from '../constants.ts'

export const convertor = {
  [ConverterMode.decimal]: {
    'binary': function (decimal: string):string { return Number(decimal).toString(2) },
    'decimal': function (value: string):string { return value },
    'roman': function (value: string): string {
      let prepareValue = Number(value)
      let roman = ''
      let i = '';
      for ( i in romanDateMap ) {
        while ( prepareValue >= romanDateMap[i] ) {
          roman += i;
          prepareValue -= romanDateMap[i];
        }
      }
      return roman;
    }
  },
  [ConverterMode.binary]: {
    'binary': function (decimal: string):string { return decimal },
    'decimal': function (bin: string):number { return parseInt(bin, 2) },
    'roman': function (value: string): string {
      let prepareValue =  Number(this.decimal(value))
      let roman = ''
      let i = '';
      for ( i in romanDateMap ) {
        while ( prepareValue >= romanDateMap[i] ) {
          roman += i;
          prepareValue -= romanDateMap[i];
        }
      }
      return roman;
    }
  }
}
