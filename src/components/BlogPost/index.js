import React, { Component } from "react"
import Loadable from "react-loadable"
import moment from "moment"
import { compose } from "recompose"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import { ROUTES, CSS } from "../../constants"
// import { Separator } from "../Basics"

const Container = styled.div`
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
`

const Content = styled.div`
	position: relative;
	border: 1px solid #dcdcdc;
	background: white;
	padding: 20px;
	box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.14);
	margin-bottom: 20px;
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;

	@media (max-width: ${(p) => p.theme.breakpoints[2]}px) {
		border-left: none;
		border-right: none;
	}
`

const Text = styled.div`
	line-height: 1.55em;
	font-size: calc(1rem + 0.12vw);
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		font-size: 1.15rem;
	}
	padding: 0;
	word-spacing: 2px;
	height: 100%;
	width: 70ch;
	max-width: 100%;
	color: #333;
	margin: 0 auto;
	font-family: serif;
	img {
		max-width: 100%;
	}
`

const Image = styled.img`
	max-width: 100%;
	width: auto;
	height: auto;
	max-height: 45vh;
	display: block;
	margin: 0 auto;
`

const LinkContainer = styled.div`
	display: none;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		display: block;
	}
	color: #2f2f2f;
	font-weight: 500;
	padding: 20px;
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	a {
		:hover {
			color: ${CSS.COLOR_ACCENT};
		}
		text-decoration: none !important;
	}
	svg {
		margin: 0 10px 0 0;
	}
`

const Author = styled.div`
	margin: 6px 0;
	padding: 0 25px;
	cursor: default;
`

const CreatedAt = styled.div`
	margin: 6px 0;
	padding: 0 25px;
	cursor: default;
`

const IconContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 100%;
	gap: 15px;
	margin: 6px 0;
	padding: 0 25px;
	& > div {
		cursor: pointer;
	}
	& > div:hover svg {
		color: #222;
	}
`

const Title = styled.h2`
	font-family: "Playfair Display SC", serif;
	text-align: center;
	margin: 30px 0;
	font-size: 1.6rem;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: 2.6rem;
	}
`

const Info = styled.div`
	white-space: nowrap;
	svg {
		color: #a8a8a8;
		margin-right: 3px;
	}
	color: #6f6f6f;
	font-size: 0.85rem;

	display: flex;
	flex-flow: column;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		flex-flow: row nowrap;
	}
	justify-content: center;
	align-items: center;
	margin: 30px 0;
	border-top: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
	padding: 10px 0;
`

const Separator = styled.div`
	margin: 6px 0;
	background: #d3d3d3;

	height: 1px;
	width: 2.5rem;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		height: 1rem;
		width: 1px;
	}
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
						<Content>
							<LinkContainer>
								<Link to={ROUTES.BLOG_HOME}>
									<FontAwesomeIcon icon="caret-left" />
									Wróć
								</Link>
							</LinkContainer>
							<Image src={this.state.post.photo_url} />
							<Title>{this.state.post.title}</Title>
							<Info>
								<Author title="Autor">
									<FontAwesomeIcon icon="user" />
									&nbsp;{this.state.post.author}
								</Author>
								<Separator />
								<CreatedAt title="Data dodania">
									<FontAwesomeIcon icon="calendar" />
									&nbsp;
									{moment(this.state.post.createdAt).format("D.M.YY")}
								</CreatedAt>
								<Separator />
								<IconContainer>
									<div title="Udostępnij na Twitterze">
										<FontAwesomeIcon icon={["fab", "twitter"]} />
									</div>
									<div title="Udostępnij na Facebooku">
										<FontAwesomeIcon icon={["fab", "facebook-square"]} />
									</div>
									<div title="Udostępnij na Instagramie">
										<FontAwesomeIcon icon={["fab", "instagram"]} />
									</div>
								</IconContainer>
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
