/**
 * Create arbitrary number of react elements
 * @param number - number of elements to create
 * @param fn - function that returns react element(s), it receives current index as its only param
 * @returns array of react components
 */
const mapN = (number, fn) =>
  Array(number)
    .fill()
    .map((el, i, arr) => fn(i))

export default mapN
