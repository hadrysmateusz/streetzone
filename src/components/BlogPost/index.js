import React, { Component } from "react"
import Loadable from "react-loadable"
import moment from "moment"
import { compose } from "recompose"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import { StyledLink } from "../Basics"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import { ROUTES, CSS } from "../../constants"
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
	img {
		max-width: 100%;
	}
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
	padding: 0 15px;
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
	border-right: 1px solid #ddd;
	cursor: default;
`

const CreatedAt = styled.div`
	margin: 6px 0;
	padding: 0 25px;
	border-right: 1px solid #ddd;
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
	@media (min-width: ${BREAKPOINTS[2]}px) {
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
							<Link to={ROUTES.BLOG_HOME}>
								<FontAwesomeIcon icon="caret-left" />
								Powrót do strony głównej
							</Link>
							<Title>{this.state.post.title}</Title>
						</TopContainer>
						<Content>
							<Image src="https://o.aolcdn.com/images/dims?resize=2000%2C2000%2Cshrink&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2018-11%2F672ea4d0-f330-11e8-bed6-cfe15b0bb8c2&client=a1acac3e1b3290917d92&signature=41dc1916fae050901615a19d11ec0346242472c6" />
							<Info>
								<Author title="Autor">
									<FontAwesomeIcon icon="user" />
									&nbsp;{this.state.post.author}
								</Author>
								<CreatedAt title="Data dodania">
									<FontAwesomeIcon icon="calendar" />
									&nbsp;
									{moment(this.state.post.createdAt).format("D.M.YY")}
								</CreatedAt>
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
