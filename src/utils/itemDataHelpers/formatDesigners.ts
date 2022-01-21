export const formatDesigners = (designers: string[]) =>
  designers && Array.isArray(designers) ? designers.join(" X ") : "--"

export default formatDesigners
