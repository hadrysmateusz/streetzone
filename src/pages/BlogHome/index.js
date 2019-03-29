import removeMarkdown from "remove-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import { BlogPageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import AlgoliaSearchContainer from "../../components/Topbar"

import {
	PromotedContainer,
	PromotedPostContainer,
	MainGrid,
	Sidebar,
	ContentArea,
	SectionContainer,
	Post,
	Image,
	ImageContainer,
	DetailsContainer,
	PostsContainer
} from "./StyledComponents"

import { ROUTES, CONST } from "../../constants"

const DEFAULT_HITS_PER_PAGE = 12
const DEFAULT_SEARCH_STATE = Object.freeze({
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	refinementList: {},
	query: "",
	page: 1
})

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

	urlToState = (parsedSearch) => {
		let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
		// format the searchState according to Algolia's spec
		const { tags, section, query, page } = parsedSearch

		searchState.refinementList.section = section || []
		searchState.refinementList.tags = tags || []
		searchState.query = query || ""
		searchState.page = page || 1

		return searchState
	}

	onSearchStateChange = async (newSearchState) => {
		// format the state to keep the url relatively short
		const { refinementList, query, page } = newSearchState
		let formattedState = {}
		if (refinementList !== undefined) {
			if (refinementList.tags !== undefined) formattedState.tags = refinementList.tags
			if (refinementList.section !== undefined)
				formattedState.section = refinementList.section
		}
		if (page !== undefined) formattedState.page = page
		if (query !== undefined) formattedState.query = query

		return formattedState
	}

	render() {
		const { isLoading, posts } = this.state

		return (
			<BlogPageContainer maxWidth={5}>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<AlgoliaSearchContainer
							indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
							onSearchStateChange={this.onSearchStateChange}
							urlToState={this.urlToState}
							defaultSearchState={DEFAULT_SEARCH_STATE}
						>
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
						</AlgoliaSearchContainer>
					</>
				)}
			</BlogPageContainer>
		)
	}
}

export default withFirebase(BlogHomePage)
