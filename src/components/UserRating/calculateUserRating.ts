export interface IWithRating {
  rating: number
}

export function calculateRating(opinions: IWithRating[]) {
  if (opinions.length < 1) {
    return 0
  }

  const ratingSum = opinions.reduce((acc, current) => acc + current.rating, 0)
  return ratingSum / opinions.length
}
