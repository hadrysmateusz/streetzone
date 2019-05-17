import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"
import { css } from "styled-components/macro"

import { Text, TextBlock } from "../../../components/StyledComponents"
import { ROUTES } from "../../../constants"

import { PromotedPostContainer } from "../StyledComponents"

const PromotedPost = ({
	title,
	category,
	author,
	createdAt,
	mainImageIndex,
	imageUrls,
	id
}) => {
	const date = moment(createdAt).format("D.M.YY")

	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostContainer image={imageUrl}>
				<TextBlock
					uppercase
					css={css`
						letter-spacing: 0.6px;
					`}
					color="gray100"
				>
					{category}
				</TextBlock>
				<TextBlock serif size="l">
					{title}
				</TextBlock>
				<TextBlock serif>
					{author && (
						<Text>
							{author}
							{" - "}
						</Text>
					)}
					{date && <Text>{date}</Text>}
				</TextBlock>
			</PromotedPostContainer>
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
