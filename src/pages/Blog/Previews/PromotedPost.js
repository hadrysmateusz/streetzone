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
	section,
	author,
	createdAt,
	dropsAt,
	mainImageURL,
	id
}) => {
	const date = moment(section === "Dropy" ? dropsAt : createdAt).format("D.M.YY")

	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostContainer image={mainImageURL}>
				<TextBlock
					uppercase
					css={css`
						letter-spacing: 0.6px;
					`}
					color="gray100"
				>
					{section}
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
	mainImageURL: PropTypes.string.isRequired,
	section: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	dropsAt: PropTypes.number,
	createdAt: PropTypes.number,
	author: PropTypes.string
}

export default PromotedPost
