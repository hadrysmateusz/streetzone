import isNonEmptyArray from "../isNonEmptyArray"

export const formatNonEmptyArray = (val) => {
  if (isNonEmptyArray(val)) {
    return val
  } else {
    throw new Error("a property expected a non-empty array")
  }
}

export const formatString = (val) => {
  val += "" // convert to string
  return val.trim()
}

export const formatFloat = (val) => {
  return Number.parseFloat(val)
}

export const formatInt = (val) => {
  return Number.parseInt(val)
}
