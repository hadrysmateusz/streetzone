import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"

import { TextBlock, Text } from "../../../components/StyledComponents"

import {
	Post as PostContainer,
	Image,
	ImageContainer,
	DetailsContainer,
	MainContainer,
	ShareButtons,
	TagsContainer
} from "../StyledComponents"

import { ROUTES } from "../../../constants"

const BasicPost = ({
	id,
	excerpt,
	mainImageIndex,
	imageUrls,
	category,
	title,
	author,
	createdAt,
	tags
}) => {

	const date = moment(createdAt).format("D.M.YY")
	const imageUrl = imageUrls[mainImageIndex]

	return (
		<PostContainer>
			<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
				<ImageContainer>
					<Image url={imageUrl} />
				</ImageContainer>
				<MainContainer>
					<TextBlock uppercase color="gray0">
						{category}
					</TextBlock>
					<TextBlock size="l" serif bold>
						{title}
					</TextBlock>
					<DetailsContainer>
						{author && (
							<Text>
								{author}
								{" - "}
							</Text>
						)}
						{date && <Text>{date}</Text>}
					</DetailsContainer>
					<TextBlock>{excerpt}</TextBlock>
					{tags && Array.isArray(tags) && (
						<TagsContainer>
							{tags.slice(0, 3).map((tag) => (
								<div>{"#" + tag}</div>
							))}
						</TagsContainer>
					)}
					<ShareButtons>
						<div title="Udostępnij na Twitterze">
							<FontAwesomeIcon icon={["fab", "twitter"]} />
						</div>
						<div title="Udostępnij na Facebooku">
							<FontAwesomeIcon icon={["fab", "facebook-square"]} />
						</div>
						<div title="Udostępnij na Instagramie">
							<FontAwesomeIcon icon={["fab", "instagram"]} />
						</div>
					</ShareButtons>
				</MainContainer>
			</Link>
		</PostContainer>
	)
}

BasicPost.propTypes = {
	id: PropTypes.string.isRequired,
	mainContent: PropTypes.string.isRequired,
	mainImageIndex: PropTypes.number.isRequired,
	imageUrls: PropTypes.array.isRequired,
	category: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	tags: PropTypes.array.isRequired,
	createdAt: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired
}

export default BasicPost
