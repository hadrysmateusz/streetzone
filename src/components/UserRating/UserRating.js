import StarRatings from "react-star-ratings"

export const UserRating = ({ feedback, size = "16px" }) =>
  feedback && feedback.length > 0 ? (
    <span>
      <StarRatings
        rating={feedback.reduce((acc, current) => acc + current.rating, 0) / feedback.length}
        starRatedColor="gold"
        numberOfStars={5}
        starDimension={size}
        starSpacing="2px"
      />
    </span>
  ) : null

export default UserRating
