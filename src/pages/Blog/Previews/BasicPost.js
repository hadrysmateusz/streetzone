import removeMarkdown from "remove-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

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
	mainContent,
	mainImageURL,
	section,
	title,
	author,
	createdAt,
	dropsAt,
	tags
}) => {
	let excerpt = removeMarkdown(mainContent, { gfm: true })
	excerpt = excerpt.replace(/\\n/g, "\n")
	const length = 90
	excerpt = excerpt.length < length ? excerpt : excerpt.substring(0, length)
	excerpt += "..."

	const date = moment(section === "Dropy" ? dropsAt : createdAt).format("D.M.YY")

	return (
		<PostContainer>
			<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<MainContainer>
					<TextBlock uppercase color="gray0">
						{section}
					</TextBlock>
					<TextBlock size="l" serif bold as="h3">
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

export default BasicPost
