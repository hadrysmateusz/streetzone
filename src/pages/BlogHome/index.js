import removeMarkdown from "remove-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import cloneDeep from "clone-deep"
import { connectInfiniteHits } from "react-instantsearch-core"
import InfiniteScroll from "react-infinite-scroller"

import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import { BlogPageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import InstantSearchWrapper from "../../components/InstantSearchWrapper"

import {
	PromotedContainer,
	PromotedPostContainer,
	MainGrid,
	Sidebar,
	ContentArea,
	SectionContainer,
	Post as PostContainer,
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

const Post = ({ id, mainContent, mainImageURL, section, title, author, createdAt }) => {
	let excerpt = removeMarkdown(mainContent, { gfm: true })
	excerpt = excerpt.replace(/\\n/g, "\n")
	const length = 85
	excerpt = excerpt.length < length ? excerpt : excerpt.substring(0, length)
	excerpt += "..."

	return (
		<PostContainer>
			<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
				<ImageContainer>
					<Image url={mainImageURL} />
				</ImageContainer>
				<div>
					<TextBlock uppercase color="gray0">
						{section}
					</TextBlock>
					<TextBlock size="l" bold as="h3">
						{title}
					</TextBlock>
					<DetailsContainer>
						<TextBlock color="gray0">
							<FontAwesomeIcon icon="user" /> {author}
						</TextBlock>
						<TextBlock color="gray0">
							<FontAwesomeIcon icon="calendar" /> {moment(createdAt).format("D.M.YY")}
						</TextBlock>
					</DetailsContainer>
					<TextBlock>{excerpt}</TextBlock>
				</div>
			</Link>
		</PostContainer>
	)
}

const InfinitePosts = connectInfiniteHits(({ hits, hasMore, refine, ...rest }) => {
	return (
		<InfiniteScroll
			hasMore={hasMore}
			loader={<LoadingSpinner fixedHeight />}
			initialLoad={false}
			loadMore={refine}
			{...rest}
		>
			<PostsContainer>
				{hits.map((post) => (
					<Post {...post} />
				))}
			</PostsContainer>
		</InfiniteScroll>
	)
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

const PromotedPost = ({ title, author, createdAt, mainImageURL, id }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostContainer image={mainImageURL}>
				<TextBlock serif size="l">
					{title}
				</TextBlock>
				<TextBlock serif>
					{author && author + " - "}
					{moment(createdAt).format("D.M.YY")}
				</TextBlock>
			</PromotedPostContainer>
		</Link>
	)
}

export class BlogHomePage extends Component {
	state = { drops: [], promotedPosts: [], isLoading: true }

	getDrops = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			.where("section", "==", "Dropy")
			.limit(2)
		const snapshot = await query.get()
		let posts = snapshot.docs.map((doc) => doc.data())
		await this.setState({ posts, isLoading: false })
	}

	getPromotedPosts = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			.where("isPromoted", "==", true)
			.limit(3)
		const snapshot = await query.get()
		let posts = snapshot.docs.map((doc) => doc.data())
		await this.setState({ posts, isLoading: false })
	}

	componentDidMount = () => {
		this.getPromotedPosts()
		this.getDrops()
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
		const { isLoading, promotedPosts, drops } = this.state

		return (
			<BlogPageContainer maxWidth={5}>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<InstantSearchWrapper
							indexName={CONST.DEV_BLOG_ALGOLIA_INDEX}
							onSearchStateChange={this.onSearchStateChange}
							urlToState={this.urlToState}
							defaultSearchState={DEFAULT_SEARCH_STATE}
						>
							<PromotedContainer>
								<PromotedPost {...promotedPosts[0]} />
								<PromotedPost {...promotedPosts[1]} />
								<PromotedPost {...promotedPosts[2]} />
							</PromotedContainer>
							<MainGrid>
								<Sidebar />
								<ContentArea>
									<Section title="Nadchodzące Dropy" hasMore>
										{drops.map((post) => (
											<Post {...post} />
										))}
									</Section>
									<Section title="Czyszczenie i pielęgnacja" />
									<InfinitePosts />
								</ContentArea>
							</MainGrid>
						</InstantSearchWrapper>
					</>
				)}
			</BlogPageContainer>
		)
	}
}

export default withFirebase(BlogHomePage)
