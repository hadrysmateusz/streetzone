import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import removeMarkdown from "remove-markdown"

import LoadingSpinner from "../LoadingSpinner"
import { withFirebase } from "../Firebase"
import { ROUTES } from "../../constants"
import { BlogPageContainer } from "../Containers"

const PostsContainer = styled.div`
	display: grid;
	gap: 10px;
	margin: 10px 0;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: 30px 0;
	}
`

const Post = styled.div`
	a {
		display: grid;
		grid-template-columns: 100px 1fr;
		grid-template-rows: auto;
		gap: 20px;
		overflow: hidden;
		padding: 15px;

		background: white;
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		box-shadow: 0 0px 5px -1px rgba(0, 0, 0, 0.05);

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: 200px 1fr;
			grid-template-rows: 200px;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			grid-template-columns: 300px 1fr;
			grid-template-rows: 300px;
			gap: 30px;
		}
		@media (max-width: ${(p) => p.theme.breakpoints[5] - 1}px) {
			border-left: none;
			border-right: none;
		}
	}
	:not(:last-child) a {
		@media (max-width: ${(p) => p.theme.breakpoints[5] - 1}px) {
			/* border-bottom: none; */
		}
	}
`

const ImageContainer = styled.div`
	max-width: 100%;
	max-height: 100%;

	width: 100%;
	height: 100%;

	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: flex-start;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		align-items: center;
	}
`

const Image = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;

`

const DetailsContainer = styled.div`
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: 10px;
	margin: 10px 0;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-auto-flow: row;
	}
`

const InfoItem = styled.div`
	svg {
		color: ${(p) => p.theme.colors.gray[25]};
		margin-right: 3px;
	}
	color: ${(p) => p.theme.colors.gray[0]};
	font-size: 0.85rem;
`

const Title = styled.h2`
	margin: 0;
	font-size: 1.4rem;
	line-height: 1.6rem;
	max-height: 3.2rem;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #333;
	font-family: ${(p) => p.theme.fonts.display};
`

const Excerpt = styled.p`
	white-space: pre-wrap;
	max-width: 400px;
	margin: 0 0 5px 0;

	line-height: 1.5em;
	font-size: 0.92rem;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		font-size: 1.04rem;
	}

	color: #333;
	font-family: serif;
`

export class BlogHomePage extends Component {
	state = { posts: [], isLoading: true }

	getPosts = async (sortBy = "createdAt", sortDirection = "desc") => {
		this.setState({ isLoading: true })
		let query = this.props.firebase.posts().orderBy(sortBy, sortDirection)
		const snapshot = await query.get()
		let posts = snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
		await this.setState({ posts, isLoading: false })
	}

	componentDidMount = () => {
		this.getPosts()
	}

	render() {
		const { isLoading, posts } = this.state
		return (
			<BlogPageContainer maxWidth={5}>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<PostsContainer>
						{posts.map((post) => {
							let excerpt = removeMarkdown(post.content, { gfm: true })
							excerpt = excerpt.replace(/\\n/g, "\n")
							const length = 85
							excerpt = excerpt.length < length ? excerpt : excerpt.substring(0, length)
							excerpt += "..."

							return (
								<Post>
									<Link to={ROUTES.BLOG_POST.replace(":id", post.postId)}>
										<ImageContainer>
											<Image url={post.photo_url} />
										</ImageContainer>
										<div>
											<Title as="h3">{post.title}</Title>
											<DetailsContainer>
												<InfoItem>
													<FontAwesomeIcon icon="user" /> {post.author}
												</InfoItem>
												<InfoItem>
													<FontAwesomeIcon icon="calendar" />{" "}
													{moment(post.createdAt).format("D.M.YY")}
												</InfoItem>
											</DetailsContainer>
											<Excerpt>{excerpt}</Excerpt>
										</div>
									</Link>
								</Post>
							)
						})}
					</PostsContainer>
				)}
			</BlogPageContainer>
		)
	}
}

export default withFirebase(BlogHomePage)
