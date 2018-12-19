import React, { Component } from "react"
import Loadable from "react-loadable"
import moment from "moment"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import { StyledLink } from "../Basics"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import { Container } from "../Basics"
import { ROUTES } from "../../constants"

const Content = styled.div`
	background: #f4f5f3;
	padding: 20px;
	border-radius: 5px;
	margin: 20px 0;
`

const ReactMarkdown = Loadable({
	loader: () => import("react-markdown"),
	loading: () => <LoadingSpinner />
})

export class BlogPost extends Component {
	state = { post: null }

	getPost = async () => {
		try {
			// Get data from db
			const postId = this.props.match.params.id
			let post = await this.props.firebase.post(postId).get()
			post = { postId: post.id, ...post.data() }

			// Un-escape new-line characters
			post.content = post.content.replace(/\\n/g, "\n")

			this.setState({ isLoading: false, post })
		} catch (e) {
			console.log(e)
		}
	}

	componentDidMount = () => {
		this.getPost()
	}

	render() {
		return (
			<Container width={1100}>
				{this.state.post && (
					<>
						<StyledLink to={ROUTES.BLOG_HOME}>Powrót do strony głównej</StyledLink>
						<h2>{this.state.post.title}</h2>
						<p>
							<FontAwesomeIcon icon="user" /> {this.state.post.author}
						</p>
						<p>
							<FontAwesomeIcon icon="calendar" />{" "}
							{moment(this.state.post.createdAt).format("D.M.YY")}
						</p>
						<Content>
							<ReactMarkdown source={this.state.post.content} />
						</Content>
					</>
				)}
			</Container>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(BlogPost)
