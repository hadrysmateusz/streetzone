import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { ROUTES } from "../../../constants"

import { PromotedPostMobileContainer } from "./Common"

const PromotedPost = ({ title, category, createdAt, mainImageIndex, imageUrls, id }) => {
	const date = moment(createdAt).format("D.M.YY")

	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostMobileContainer image={imageUrl} category={category}>
				<div className="title">{title}</div>
				<div className="info">
					{category}
					{" / "}
					{date}
				</div>
			</PromotedPostMobileContainer>
		</Link>
	)
}

export default PromotedPost
