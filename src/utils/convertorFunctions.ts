import {isArrayChecker} from './isArrayChecker'
import {romanDateMap} from '../constants'

export enum ConverterMode {
  decimal = "decimal",
  binary = "binary",
  roman = "roman",
}

export const convertor = {
  'binary': function (decimal: string):string { return Number(decimal).toString(2) },
  'decimal': function (bin: string):number { return parseInt(bin, 2) },
  'roman': function (value: string): string {
    let prepareValue = isArrayChecker(value) ? this.decimal(value) : Number(value)
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
