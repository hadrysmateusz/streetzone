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

import { ROUTES } from "../../constants"

const PostPreview = ({
	id,
	excerpt,
	mainImageIndex,
	imageUrls,
	category,
	title,
	createdAt,
	tags
}) => {
	const date = moment(createdAt).format("LL")
	const imageUrl = imageUrls[mainImageIndex]

	const hasTags = tags && Array.isArray(tags) && tags.length > 0

	return (
		<PostContainer category={category}>
			<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
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
					<Share />
				</MainContainer>
			</Link>
		</PostContainer>
	)
}

export default PostPreview
