export function notIn<T>(arr: T[]) {
  return function (value: T) {
    return !arr.includes(value)
  }
}
