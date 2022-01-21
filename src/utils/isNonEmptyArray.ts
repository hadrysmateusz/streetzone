export const isNonEmptyArray = (val: any) => {
  return val && Array.isArray(val) && val.length !== 0
}

export default isNonEmptyArray
