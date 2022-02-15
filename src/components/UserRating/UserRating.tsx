import React, { useMemo } from "react"
import StarRatings from "react-star-ratings"
import { useFirestoreCollectionNew } from "../../hooks"
import { calculateRating } from "./calculateUserRating"
import { Opinion } from "../../schema"

export const UserRating: React.FC<{ userId: string; size?: string }> = ({
  userId,
  size = "16px",
}) => {
  const { data: opinions, isLoading } = useFirestoreCollectionNew<Opinion>(
    `users/${userId}/opinions`
  )

  const rating = useMemo(() => calculateRating(opinions), [opinions])

  return !isLoading ? (
    <span>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        numberOfStars={5}
        starDimension={size}
        starSpacing="2px"
      />
    </span>
  ) : null
}

export default UserRating
