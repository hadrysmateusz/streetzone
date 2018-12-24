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
import { ROUTES } from "../../constants"
import { BREAKPOINTS } from "../../constants/const"

const Container = styled.div`
	@media (min-width: ${BREAKPOINTS[2]}px) {
		width: ${BREAKPOINTS[2]}px;
		margin: 0 auto;
	}
`

const Content = styled.div`
	border: 1px solid #dcdcdc;
	background: white;
	padding: 20px;
	box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.14);
	margin-bottom: 20px;
	width: 100%;
	max-width: ${BREAKPOINTS[2]}px;

	@media (max-width: ${BREAKPOINTS[2]}px) {
		border-left: none;
		border-right: none;
	}
`

const Text = styled.div`
	line-height: 1.5em;
	font-size: 1.04rem;
	word-spacing: 3px;
	height: 100%;
	width: 75ch;
	max-width: 100%;
	color: #333;
	margin: 0 auto;
	font-family: serif;
`

const Image = styled.img`
	max-width: 100%;
	width: auto;
	height: auto;
	max-height: 40vh;
	display: block;
	margin: 0 auto;
`

const TopContainer = styled.div`
	color: #2f2f2f;
	padding: 0 20px 20px;
	@media (min-width: ${BREAKPOINTS[2]}px) {
		padding: 0 15px 20px;
	}
`

const Author = styled.div`
	margin: 6px 0;
	padding: 0 25px;
	color: #4b4b4b;
	border-right: 1px solid #ddd;
`

const CreatedAt = styled.div`
	margin: 6px 0;
	padding: 0 25px;
	color: #4b4b4b;
`

const Title = styled.h2`
	margin: 0;
	margin-top: 15px;
	font-size: 1.6rem;
	@media (min-width: ${BREAKPOINTS[2]}px) {
		font-size: 2.6rem;
	}
`

const Info = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	margin: 30px 0;
	border-top: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
	padding: 10px 0;
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
			<Container>
				{this.state.post && (
					<>
						<TopContainer>
							<StyledLink to={ROUTES.BLOG_HOME}>Powrót do strony głównej</StyledLink>
							<Title>{this.state.post.title}</Title>
						</TopContainer>
						<Content>
							<Image src="http://cdn.galleries.smcloud.net/t/photos/gf-y6Lt-E86i-g1za_kot-kochany-indywidualista-co-warto-wiedziec-o-kotach.jpg" />
							<Info>
								<Author>
									<FontAwesomeIcon icon="user" /> {this.state.post.author}
								</Author>
								<CreatedAt>
									<FontAwesomeIcon icon="calendar" />{" "}
									{moment(this.state.post.createdAt).format("D.M.YY")}
								</CreatedAt>
							</Info>
							<Text>
								<ReactMarkdown source={this.state.post.content} />
							</Text>
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
