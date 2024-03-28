export const isArrayChecker = (array: string): boolean => {
  let arrayPrep = array.split('')
  for (let i of arrayPrep) {
    const charPrep = Number(i)
    if (charPrep !== 0 && charPrep !== 1) return false;
  }
  return true;
}
