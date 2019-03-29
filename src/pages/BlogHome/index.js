import removeMarkdown from "remove-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import moment from "moment"

import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import { BlogPageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"

import { ROUTES } from "../../constants"

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
`

const Title = styled.h2`
	margin: 0;
	line-height: 1.6rem;
	max-height: 3.2rem;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #333;
`

const Excerpt = styled.p`
	white-space: pre-wrap;
	max-width: 400px;
	margin: 0 0 5px 0;

	line-height: 1.5em;

	color: #333;
	font-family: serif;
`

const PromotedContainer = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;
	height: 440px;
	gap: var(--spacing3);
	> *:first-child {
		grid-row: span 2;
	}
`

const PromotedPostContainer = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
		url(${(p) => p.image});
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	color: white;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	padding-bottom: var(--spacing4);
`

const MainGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: var(--spacing4);
	margin-top: var(--spacing4);
`

const Sidebar = styled.aside``

const ContentArea = styled.main``

const SectionContainer = styled.section`
	margin-bottom: var(--spacing4);

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing3);
	}

	.content {
		display: grid;
		grid-auto-flow: column;
		gap: var(--spacing3);
	}
`

const Section = ({ title, hasMore, children }) => {
	return (
		<SectionContainer>
			<header>
				<TextBlock bold uppercase size="m">
					{title}
				</TextBlock>
				{hasMore && (
					<TextBlock color="gray0">
						Więcej <FontAwesomeIcon size="xs" icon="arrow-right" />
					</TextBlock>
				)}
			</header>
			<div className="content">{children}</div>
		</SectionContainer>
	)
}

const PromotedPost = ({ title, author, createdAt, mainImageURL }) => {
	return (
		<PromotedPostContainer image={mainImageURL}>
			<TextBlock serif size="l">
				{title}
			</TextBlock>
			<TextBlock serif>
				{author && author + " - "}
				{moment(createdAt).format("D.M.YY")}
			</TextBlock>
		</PromotedPostContainer>
	)
}

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
					<>
						<PromotedContainer>
							<PromotedPost {...posts[0]} />
							<PromotedPost {...posts[1]} />
							<PromotedPost {...posts[2]} />
						</PromotedContainer>
						<MainGrid>
							<Sidebar />
							<ContentArea>
								<Section title="Nadchodzące Dropy" hasMore />
								<Section title="Czyszczenie i pielęgnacja" />
								<PostsContainer>
									{posts.map((post) => {
										let excerpt = removeMarkdown(post.mainContent, { gfm: true })
										excerpt = excerpt.replace(/\\n/g, "\n")
										const length = 85
										excerpt =
											excerpt.length < length ? excerpt : excerpt.substring(0, length)
										excerpt += "..."

										console.log(post)

										return (
											<Post>
												<Link to={ROUTES.BLOG_POST.replace(":id", post.id)}>
													<ImageContainer>
														<Image url={post.mainImageURL} />
													</ImageContainer>
													<div>
														<TextBlock uppercase color="gray0">
															{post.section}
														</TextBlock>
														<TextBlock size="l" bold as="h3">
															{post.title}
														</TextBlock>
														<DetailsContainer>
															<TextBlock color="gray0">
																<FontAwesomeIcon icon="user" /> {post.author}
															</TextBlock>
															<TextBlock color="gray0">
																<FontAwesomeIcon icon="calendar" />{" "}
																{moment(post.createdAt).format("D.M.YY")}
															</TextBlock>
														</DetailsContainer>
														<TextBlock>{excerpt}</TextBlock>
													</div>
												</Link>
											</Post>
										)
									})}
								</PostsContainer>
							</ContentArea>
						</MainGrid>
					</>
				)}
			</BlogPageContainer>
		)
	}
}

export default withFirebase(BlogHomePage)
