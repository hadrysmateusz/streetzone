import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"

import { TextBlock } from "../../../components/StyledComponents"
import { ROUTES } from "../../../constants"

import { PromotedDropContainer } from "../StyledComponents"

const PromotedPost = ({
	name,
	dropsAtApproxTimestamp,
	mainImageIndex,
	imageUrls,
	id
}) => {
	const date = moment().to(moment(dropsAtApproxTimestamp))
	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedDropContainer image={imageUrl}>
				<TextBlock serif bold size="l">
					{name}
				</TextBlock>
				{date && <TextBlock serif>{date}</TextBlock>}
			</PromotedDropContainer>
		</Link>
	)
}

PromotedPost.propTypes = {
	id: PropTypes.string.isRequired,
	mainImageIndex: PropTypes.number.isRequired,
	imageUrls: PropTypes.array.isRequired,
	category: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createdAt: PropTypes.number.isRequired,
	author: PropTypes.string
}

export default PromotedPost
