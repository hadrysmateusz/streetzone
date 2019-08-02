import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import Share from "../Share"

import {
	PostContainer,
	Image,
	ImageContainer,
	MainContainer,
	TagsContainer,
	TopContainer,
	Title,
	Excerpt
} from "./StyledComponents"

import { route } from "../../utils"
import { getImageUrl } from "../../utils/getImageUrl"

const PostPreview = ({
	id,
	excerpt,
	mainImageIndex,
	attachments,
	category,
	title,
	createdAt,
	tags
}) => {
	const date = moment(createdAt).format("LL")
	const imageRef = attachments[mainImageIndex]
	const imageUrl = getImageUrl(imageRef, "M")

	const hasTags = tags && Array.isArray(tags) && tags.length > 0

	const postUrl = route("BLOG_POST", { id })

	return (
		<PostContainer category={category}>
			<Link to={postUrl}>
				<ImageContainer>
					<Image url={imageUrl} />
				</ImageContainer>
				<MainContainer>
					<TopContainer category={category}>
						<div className="category">{category}</div>
						<div className="date">{date}</div>
					</TopContainer>

					<Title>{title}</Title>

					<Excerpt>{excerpt}</Excerpt>
					{hasTags && (
						<TagsContainer>
							{tags.slice(0, 3).map((tag) => (
								<div key={tag}>{"#" + tag}</div>
							))}
						</TagsContainer>
					)}
					<Share url={postUrl} />
				</MainContainer>
			</Link>
		</PostContainer>
	)
}

export default PostPreview
