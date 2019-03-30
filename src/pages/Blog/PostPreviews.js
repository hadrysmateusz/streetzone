import removeMarkdown from "remove-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { connectInfiniteHits } from "react-instantsearch-core"
import InfiniteScroll from "react-infinite-scroller"

import LoadingSpinner from "../../components/LoadingSpinner"
import { TextBlock } from "../../components/StyledComponents"
import Button from "../../components/Button"

import {
	Post as PostContainer,
	Image,
	ImageContainer,
	DetailsContainer,
	PostsContainer,
	PromotedPostContainer,
	SmallPostContainer
} from "./StyledComponents"

import { ROUTES } from "../../constants"

export const PromotedPost = ({ title, author, createdAt, mainImageURL, id }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostContainer image={mainImageURL}>
				<TextBlock serif size="l">
					{title}
				</TextBlock>
				<TextBlock serif>
					{author && author + " - "}
					{moment(createdAt).format("D.M.YY")}
				</TextBlock>
			</PromotedPostContainer>
		</Link>
	)
}

export const SmallPost = ({ id, mainImageURL, title, createdAt }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<SmallPostContainer>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<div>
					<TextBlock serif size="l">
						{title}
					</TextBlock>
					<TextBlock serif color="black75">
						{moment(createdAt).format("D.M.YY")}
					</TextBlock>
					<Button>Czytaj więcej</Button>
				</div>
			</SmallPostContainer>
		</Link>
	)
}

export const DropPost = ({ id, mainImageURL, title, dropsAt }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<SmallPostContainer>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<div>
					<TextBlock serif size="l">
						{title}
					</TextBlock>
					<TextBlock serif color="black75">
						{moment(dropsAt).format("D.M.YY")}
					</TextBlock>
					<Button>Czytaj więcej</Button>
				</div>
			</SmallPostContainer>
		</Link>
	)
}

export const Post = ({
	id,
	mainContent,
	mainImageURL,
	section,
	title,
	author,
	createdAt,
	dropsAt
}) => {
	let excerpt = removeMarkdown(mainContent, { gfm: true })
	excerpt = excerpt.replace(/\\n/g, "\n")
	const length = 85
	excerpt = excerpt.length < length ? excerpt : excerpt.substring(0, length)
	excerpt += "..."

	return (
		<PostContainer>
			<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<div>
					<TextBlock uppercase color="gray0">
						{section}
					</TextBlock>
					<TextBlock size="l" bold as="h3">
						{title}
					</TextBlock>
					<DetailsContainer>
						{author && (
							<TextBlock color="gray0">
								<FontAwesomeIcon icon="user" /> {author}
							</TextBlock>
						)}
						<TextBlock color="gray0">
							<FontAwesomeIcon icon="calendar" />{" "}
							{moment(section === "Dropy" ? dropsAt : createdAt).format("D.M.YY")}
						</TextBlock>
					</DetailsContainer>
					<TextBlock>{excerpt}</TextBlock>
				</div>
			</Link>
		</PostContainer>
	)
}

export const InfinitePosts = connectInfiniteHits(({ hits, hasMore, refine, ...rest }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<LoadingSpinner fixedHeight />}
			initialLoad={false}
			loadMore={refine}
			{...rest}
		>
			<PostsContainer>
				{hits.map((post) => (
					<Post {...post} />
				))}
			</PostsContainer>
		</InfiniteScroll>
	)
})
