const debounce = (callback: any, wait: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

export default debounce
