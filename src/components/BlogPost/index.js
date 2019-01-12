import React, { Component } from "react"
import Loadable from "react-loadable"
import moment from "moment"
import { compose } from "recompose"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { Box, Text, Flex } from "rebass"

import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import { ROUTES } from "../../constants"
import { BlogPageContainer } from "../Containers"
import { minWidth, maxWidth } from "../../style-utils"

const Content = styled(Box).attrs({ p: 3, as: "article" })`
	position: relative;
	background: white;
	box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.14);
	border: 1px solid ${(p) => p.theme.colors.gray[75]};

	${maxWidth[2]`
		border-left: none; 
		border-right: none;
	`}
`

const TextContainer = styled(Text).attrs({
	mx: "auto",
	my: 0,
	fontFamily: "serif",
	color: "black.75"
})`
	max-width: 65ch;
	width: 100%;
	font-size: calc(0.95rem + 0.16vw);
	${minWidth[5]`font-size: 1.2rem;`}
	line-height: 1.55em;

	img {
		max-width: 100%;
	}
`

const Image = styled.img`
	display: block;
	max-width: 100%;
	width: auto;
	height: auto;
	max-height: 45vh;
	margin: 0 auto;
`

const LinkContainer = styled(Box).attrs({ p: 3 })`
	${maxWidth[0]`display: none;`}
	color: ${(p) => p.theme.colors.black[25]};
	font-weight: ${(p) => p.theme.fontWeights[1]};
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	a {
		:hover {
			color: ${(p) => p.theme.colors.accent};
		}
		text-decoration: none !important;
	}
	svg {
		margin: 0 10px 0 0;
	}
`

const Info = styled(Box).attrs({ my: 2, px: 4 })`
	cursor: default;
`

const IconContainer = styled(Info)`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 100%;
	gap: 15px;

	& > div {
		cursor: pointer;
	}
	& > div:hover svg {
		color: ${(p) => p.theme.colors.black[25]};
	}
`

const Title = styled(Text).attrs({
	as: "h2",
	fontFamily: "display",
	textAlign: "center",
	fontSize: [5, 6, 7],
	my: 4,
	px: [0, null, 3, 5]
})``

const InfoContainer = styled(Flex).attrs({ fontSize: 0, color: "gray.0", my: 4, py: 2 })`
	display: flex;
	flex-direction: column;
	${minWidth[0]`flex-direction: row`}
	justify-content: center;
	align-items: center;

	white-space: nowrap;
	border-top: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
	svg {
		color: ${(p) => p.theme.colors.gray[25]};
		margin-right: 3px;
	}
`

const Separator = styled.div`
	margin: 6px 0;
	background: #d3d3d3;

	height: 1px;
	width: 2.5rem;
	${minWidth[0]`
		height: 1rem;
		width: 1px;
	`}
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
			<BlogPageContainer maxWidth={5}>
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
							<InfoContainer>
								<Info title="Autor">
									<FontAwesomeIcon icon="user" />
									&nbsp;{this.state.post.author}
								</Info>
								<Separator />
								<Info title="Data dodania">
									<FontAwesomeIcon icon="calendar" />
									&nbsp;
									{moment(this.state.post.createdAt).format("D.M.YY")}
								</Info>
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
							</InfoContainer>
							<TextContainer>
								<ReactMarkdown source={this.state.post.content} />
							</TextContainer>
						</Content>
					</>
				)}
			</BlogPageContainer>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(BlogPost)
