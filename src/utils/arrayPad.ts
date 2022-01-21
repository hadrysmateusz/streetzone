const arrayPad = <T>(array: T[], length: number, fillWith: T) => {
  const secondArrLen = Math.max(0, length - array.length)
  const newArray = [...array].concat(Array(secondArrLen).fill(fillWith))
  return newArray
}

export default arrayPad
