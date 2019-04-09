import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"

import { TextBlock } from "../../../components/StyledComponents"
import Button, { ButtonContainer } from "../../../components/Button"
import { ROUTES } from "../../../constants"

import { Image, ImageContainer, SmallPostContainer } from "../StyledComponents"

const SmallPost = ({ id, mainImageURL, title, createdAt }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<SmallPostContainer>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<div className="post-details">
					<TextBlock serif size="l">
						{title}
					</TextBlock>
					<TextBlock serif color="black75">
						{moment(createdAt).format("D.M.YY")}
					</TextBlock>
					<ButtonContainer>
						<Button>Czytaj więcej</Button>
					</ButtonContainer>
				</div>
			</SmallPostContainer>
		</Link>
	)
}

SmallPost.propTypes = {
	id: PropTypes.string.isRequired,
	mainImageURL: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createdAt: PropTypes.number.isRequired
}

export default SmallPost
