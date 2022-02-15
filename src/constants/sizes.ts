export const clothes = ["XS", "S", "M", "L", "XL", "XL+"] as const
export const accessories = ["OS", "XS", "S", "M", "L", "XL", "XL+"] as const
export const shoes = [
  34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
  41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
  49, 49.5, 50, 50.5, 51, 51.5, 52, 52.5,
] as const

export const sizes = { clothes, shoes, accessories } as const

export default sizes
