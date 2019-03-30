import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { Link } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import { BlogPageContainer, PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"

import InstantSearchBlogWrapper from "./InstantSearchBlogWrapper"

import {
	PromotedContainer,
	MainGrid,
	ContentArea,
	SectionContainer
} from "./StyledComponents"
import { InfinitePosts, PromotedPost, DropPost, SmallPost } from "./PostPreviews"
import Sidebar from "./Sidebar"
import { ROUTES } from "../../constants"

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
			.posts()
			.where("section", "==", "Dropy")
			.limit(2)
		const snapshot = await query.get()
		let drops = snapshot.docs.map((doc) => doc.data())
		await this.setState({ drops, isLoading: false })
	}

	getCarePosts = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			.where("tags", "array-contains", "Pielęgnacja")
			.limit(3)
		const snapshot = await query.get()
		let carePosts = snapshot.docs.map((doc) => doc.data())
		await this.setState({ carePosts, isLoading: false })
	}

	getPromotedPosts = async () => {
		this.setState({ isLoading: true })
		let query = this.props.firebase
			.posts()
			.where("isPromoted", "==", true)
			.limit(3)
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

		return (
			<BlogPageContainer maxWidth={5}>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<PageContainer>
						<InstantSearchBlogWrapper>
							<PromotedContainer>
								<PromotedPost {...promotedPosts[0]} />
								<PromotedPost {...promotedPosts[1]} />
								<PromotedPost {...promotedPosts[2]} />
							</PromotedContainer>
							<MainGrid>
								<Sidebar />
								<ContentArea>
									<Section
										title="Nadchodzące Dropy"
										hasMore
										linkTo={ROUTES.BLOG_SECTION.replace(":section", "Dropy")}
									>
										{drops.map((post) => (
											<DropPost {...post} />
										))}
									</Section>
									<Section title="Czyszczenie i pielęgnacja">
										{carePosts.map((post) => (
											<SmallPost {...post} />
										))}
									</Section>
									<InfinitePosts />
								</ContentArea>
							</MainGrid>
						</InstantSearchBlogWrapper>
					</PageContainer>
				)}
			</BlogPageContainer>
		)
	}
}

export default withFirebase(BlogHomePage)
