import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { compose } from "recompose"

import LoadingSpinner from "../../../components/LoadingSpinner"
import { withFirebase } from "../../../components/Firebase"
import { PageContainer } from "../../../components/Containers"
import { TextBlock } from "../../../components/StyledComponents"

import InstantSearchBlogWrapper from "../InstantSearchBlogWrapper"

import {
	PromotedContainer,
	MainGrid,
	ContentArea,
	SectionContainer
} from "../StyledComponents"
import { PromotedPost, DropPost, SmallPost } from "../Previews"
import Sidebar from "./Sidebar"
import route from "../../../utils/route"
import PageNav from "../PageNav"
import InfinitePosts from "../InfinitePostsList"

const NUMBER_OF_PROMOTED_POSTS = 2

const Section = ({ title, hasMore, children, linkTo }) => {
	return (
		<SectionContainer>
			<header>
				<TextBlock bold uppercase size="m">
					{title}
				</TextBlock>
				{hasMore && (
					<Link to={linkTo}>
						<TextBlock color="gray0">
							Więcej <FontAwesomeIcon size="xs" icon="arrow-right" />
						</TextBlock>
					</Link>
				)}
			</header>
			<div className="content">{children}</div>
		</SectionContainer>
	)
}

export class BlogHomePage extends Component {
	state = { drops: [], promotedPosts: [], carePosts: [], isLoading: true }

	getDrops = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.drops()
			// .orderBy("createdAt", "desc")
			.limit(3)
		const snapshot = await query.get()
		let drops = snapshot.docs.map((doc) => doc.data())
		await this.setState({ drops, isLoading: false })
	}

	getCarePosts = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			.where("tags", "array-contains", "Pielęgnacja")
			// .orderBy("createdAt", "desc")
			.limit(3)
		const snapshot = await query.get()
		let carePosts = snapshot.docs.map((doc) => doc.data())
		await this.setState({ carePosts, isLoading: false })
	}

	getPromotedPosts = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			// .orderBy("promotedAt", "desc")
			.limit(NUMBER_OF_PROMOTED_POSTS)
		const snapshot = await query.get()
		let promotedPosts = snapshot.docs.map((doc) => doc.data())
		await this.setState({ promotedPosts, isLoading: false })
	}

	componentDidMount = () => {
		this.getPromotedPosts()
		this.getDrops()
		this.getCarePosts()
	}

	render() {
		const { isLoading, promotedPosts, drops, carePosts } = this.state

		const hasPromotedPosts = promotedPosts && promotedPosts.length > 0
		const hasDrops = drops && drops.length > 0
		const hasCarePosts = carePosts && carePosts.length > 0

		// const selectedSection = decodeURIComponent(match.params.section)

		return (
			<PageContainer maxWidth={5}>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<InstantSearchBlogWrapper>
						{hasPromotedPosts && (
							<PromotedContainer>
								{promotedPosts.map((post) => (
									<PromotedPost {...post} />
								))}
							</PromotedContainer>
						)}
						<PageNav />
						<MainGrid>
							<Sidebar />
							<ContentArea>
								{hasDrops && (
									<Section
										title="Nadchodzące Dropy"
										hasMore
										linkTo={route("BLOG_SECTION", { section: "Dropy" })}
									>
										{drops.map((post) => (
											<DropPost {...post} />
										))}
									</Section>
								)}
								{hasCarePosts && (
									<Section
										title="Czyszczenie i pielęgnacja"
										hasMore
										linkTo={route("BLOG_TAG", { section: "Wiedza", tag: "Pielęgnacja" })}
									>
										{carePosts.map((post) => (
											<SmallPost {...post} />
										))}
									</Section>
								)}
								<InfinitePosts />
							</ContentArea>
						</MainGrid>
					</InstantSearchBlogWrapper>
				)}
			</PageContainer>
		)
	}
}

export default compose(
	withRouter,
	withFirebase
)(BlogHomePage)
