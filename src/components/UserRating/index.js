import React from "react"
import StarRatings from "react-star-ratings"

export default ({ feedback, size = "20px" }) =>
	feedback && feedback.length > 0 ? (
		<span>
			<StarRatings
				rating={
					feedback.reduce((acc, current) => acc + current.rating, 0) / feedback.length
				}
				starRatedColor="gold"
				numberOfStars={5}
				starDimension={size}
				starSpacing="2px"
			/>
		</span>
	) : (
		<em style={{ fontSize: "12px" }}>Brak ocen</em>
	)
