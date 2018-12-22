import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import { Container } from "../Basics"
import { ROUTES } from "../../constants"

const PostContainer = styled.div`
	background: white;
	border: 1px solid #dcdcdc;
	padding: 18px 32px;
	border-radius: 5px;
	margin: 10px 0;
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
			<Container width={1050}>
				{this.state.posts.map((post) => (
					<PostContainer>
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
					</PostContainer>
				))}
			</Container>
		)
	}
}

export default withFirebase(BlogHomePage)
