/**
 * Create arbitrary number of react elements
 * @param number - number of elements to create
 * @param fn - function that returns react element(s), it receives current index as its only param
 * @returns array of react components
 */
const mapN = (number: number, fn: (val: number) => React.ReactElement) =>
  Array(number)
    .fill(undefined)
    .map((_el, i) => fn(i))

export default mapN
