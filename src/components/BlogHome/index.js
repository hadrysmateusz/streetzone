import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"
import { Container } from "../Basics"
import { ROUTES } from "../../constants"

export class BlogHomePage extends Component {
	state = { posts: [] }

	getPosts = async () => {
		let query = this.props.firebase.posts()
		const snapshot = await query.get()
		let posts = snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
		await this.setState({ posts })
	}

	componentDidMount = () => {
		this.getPosts()
	}

	render() {
		return (
			<Container width={1100}>
				<h1>Blog</h1>
				{this.state.posts.map((post) => (
					<div>
						<Link to={ROUTES.BLOG_POST.replace(":id", post.postId)}>
							<h3>{post.title}</h3>
							<p>
								<FontAwesomeIcon icon="user" /> {post.author}
							</p>
							<p>
								<FontAwesomeIcon icon="calendar" />{" "}
								{moment(post.createdAt).format("D.M.YY")}
							</p>
						</Link>
					</div>
				))}
			</Container>
		)
	}
}

export default withFirebase(BlogHomePage)
