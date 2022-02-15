/**
 * Create an object with value and label to be used as an option for ReactSelect
 * @param value the value for the option, it will also be used as a label if no transform function is provided
 * @param transformFunction function that will be applied to create a label from the value
 */
const makeReactSelectOption = <T>(
  value: T,
  transformFunction: (val: T) => T = (val: T) => val
) => {
  const label = transformFunction(value)
  return { value, label }
}

export default makeReactSelectOption
