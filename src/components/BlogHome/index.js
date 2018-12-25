import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import { Header } from "../Basics"
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
	background: white;
	border: 1px solid #dcdcdc;
	padding: 18px 32px;
	@media (max-width: ${(p) => p.theme.breakpoints[5]}px) {
		border-left: none;
		border-right: none;
	}
`

const Author = styled.div`
	margin: 12px 0;
`

const CreatedAt = styled.div`
	margin: 12px 0;
`

const Title = styled.h2`
	margin: 10px 0 16px;
`

export class BlogHomePage extends Component {
	state = { posts: [] }

	getPosts = async (sortBy = "createdAt") => {
		let query = this.props.firebase.posts().orderBy(sortBy)
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
				<Header>Blog</Header>
				<PostsContainer>
					{this.state.posts.map((post) => (
						<Post>
							<Link to={ROUTES.BLOG_POST.replace(":id", post.postId)}>
								<Title as="h3">{post.title}</Title>
								<Author>
									<FontAwesomeIcon icon="user" /> {post.author}
								</Author>
								<CreatedAt>
									<FontAwesomeIcon icon="calendar" />{" "}
									{moment(post.createdAt).format("D.M.YY")}
								</CreatedAt>
							</Link>
						</Post>
					))}
				</PostsContainer>
			</Container>
		)
	}
}

export default withFirebase(BlogHomePage)
