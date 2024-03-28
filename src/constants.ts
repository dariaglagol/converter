type RomanDateType = {
  [key: string]: number
}

export enum ConverterMode {
  decimal = 'decimal',
  binary = 'binary',
}

export enum ConverterFrom {
  decimal = 'decimal',
  binary = 'binary',
}

export enum ConverterTo {
  decimal = 'decimal',
  binary = 'binary',
  roman = 'roman',
}

export const romanDateMap: RomanDateType = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
}
