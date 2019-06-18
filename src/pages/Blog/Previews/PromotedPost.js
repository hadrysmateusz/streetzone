import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ROUTES } from "../../../constants"

import { PromotedPostMobileContainer } from "./Common"

const PromotedPost = ({
	title,
	author,
	category,
	createdAt,
	mainImageIndex,
	imageUrls,
	id
}) => {
	const date = moment(createdAt).format("LL")

	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostMobileContainer image={imageUrl} category={category}>
				<div className="info-container">
					<div className="title">{title}</div>
					<div className="info">{category}</div>
					<div className="additional-info">
						<FontAwesomeIcon icon="user" size="sm" />
						&nbsp;&nbsp;{author}&nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon icon="calendar" size="sm" />
						&nbsp;&nbsp;{date}
					</div>
				</div>
			</PromotedPostMobileContainer>
		</Link>
	)
}

export default PromotedPost
