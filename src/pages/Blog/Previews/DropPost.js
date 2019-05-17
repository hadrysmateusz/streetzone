import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"

import { TextBlock } from "../../../components/StyledComponents"
import route from "../../../utils/route"

import { SmallPostContainer, FluidImage } from "../StyledComponents"

const DropPost = ({ id, mainImageIndex, imageUrls, name, dropsAtApproxTimestamp }) => {
	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={route("BLOG_POST", { id })}>
			<SmallPostContainer>
				<FluidImage url={imageUrl} />
				<div className="post-details">
					<TextBlock serif bold size="m">
						{name}
					</TextBlock>
					<TextBlock serif color="black75">
						{moment().to(moment(dropsAtApproxTimestamp))}
					</TextBlock>
				</div>
			</SmallPostContainer>
		</Link>
	)
}

DropPost.propTypes = {
	id: PropTypes.string.isRequired,
	mainImageIndex: PropTypes.number.isRequired,
	imageUrls: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	dropsAtApproxTimestamp: PropTypes.number.isRequired
}

export default DropPost
