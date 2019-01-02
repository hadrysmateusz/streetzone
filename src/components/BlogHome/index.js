import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import removeMarkdown from "remove-markdown"

import { withFirebase } from "../Firebase"
import { ROUTES } from "../../constants"

const Container = styled.div`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
`

const PostsContainer = styled.div`
	display: grid;
	gap: 10px;
`

const Post = styled.div`
	a {
		display: grid;
		grid-template-columns: 150px 1fr;
		grid-template-rows: 150px;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: 300px 1fr;
			grid-template-rows: 300px;
		}
		gap: 10px;
		background: white;
		border: 1px solid #dcdcdc;
		@media (max-width: ${(p) => p.theme.breakpoints[5]}px) {
			border-left: none;
			border-right: none;
		}
	}
`

const Image = styled.div`
	max-width: 100%;
	max-height: 100%;
	display: block;

	width: 100%;
	height: 100%;

	cursor: pointer;

	/* required for image centering */
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-height: 100%;
		max-width: 100%;
	}
`

const Info = styled.div`
	padding: 25px 15px;
	overflow: hidden;
`

const Author = styled.div`
	margin: 10px 0;
	svg {
		color: #a8a8a8;
		margin-right: 3px;
	}
	color: #6f6f6f;
	font-size: 0.85rem;
`

const CreatedAt = styled.div`
	margin: 10px 0;
	svg {
		color: #a8a8a8;
		margin-right: 3px;
	}
	color: #6f6f6f;
	font-size: 0.85rem;
`

const Title = styled.h2`
	margin: 0 0 10px 0;
	font-size: 1.4rem;
	color: #333;
`

const Excerpt = styled.p`
	white-space: pre-wrap;
	max-width: 400px;

	line-height: 1.5em;
	font-size: 1.04rem;
	color: #333;
	font-family: serif;
`

export class BlogHomePage extends Component {
	state = { posts: [] }

	getPosts = async (sortBy = "createdAt", sortDirection = "desc") => {
		let query = this.props.firebase.posts().orderBy(sortBy, sortDirection)
		const snapshot = await query.get()
		let posts = snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
		await this.setState({ posts })
	}

	componentDidMount = () => {
		this.getPosts()
	}

	render() {
		return (
			<Container>
				{/* <Header>Blog</Header> */}
				<PostsContainer>
					{this.state.posts.map((post) => {
						let excerpt = removeMarkdown(post.content, { gfm: true })
						excerpt = excerpt.replace(/\\n/g, "\n")
						const length = 100
						excerpt = excerpt.length < length ? excerpt : excerpt.substring(0, length)
						excerpt += "..."

						return (
							<Post>
								<Link to={ROUTES.BLOG_POST.replace(":id", post.postId)}>
									<Image>
										<img src={post.photo_url} alt="" />
									</Image>
									<Info>
										<Title as="h3">{post.title}</Title>
										<Author>
											<FontAwesomeIcon icon="user" /> {post.author}
										</Author>
										<CreatedAt>
											<FontAwesomeIcon icon="calendar" />{" "}
											{moment(post.createdAt).format("D.M.YY")}
										</CreatedAt>
										<Excerpt>{excerpt}</Excerpt>
									</Info>
								</Link>
							</Post>
						)
					})}
				</PostsContainer>
			</Container>
		)
	}
}

export default withFirebase(BlogHomePage)
