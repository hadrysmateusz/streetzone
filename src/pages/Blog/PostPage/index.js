import React, { useState, useEffect } from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import { PageContainer } from "../../../components/Containers"
import { TextBlock } from "../../../components/StyledComponents"
import LoadingSpinner from "../../../components/LoadingSpinner"

import { useFirebase } from "../../../hooks"
import { ellipsis, getCategoryColor } from "../../../style-utils"
import { route } from "../../../utils"

import { ShareButtons, FluidImage } from "../StyledComponents"
import { Layout } from "../HomePage/Common"
import PageNav from "../PageNav"
import { withBreakpoints } from "react-breakpoints"

const Main = styled.main`
	display: grid;
	grid-template-rows: 520px 1fr;
	gap: var(--spacing3);
`

const InnerContainer = styled.div`
	display: grid;
	grid-template-columns: 150px 1fr;
	gap: var(--spacing3);
`

const Article = styled.article`
	font-size: var(--font-size--m);
	max-width: 100%;
	img {
		max-width: 100%;
	}
`

const Info = styled.div``

const InfoAside = styled.aside`
	display: grid;
	gap: var(--spacing2);
	align-content: start;
`

const Aside = styled.aside``

const HeaderBox = styled.div`
	background: var(--black25);
	color: white;
	padding: var(--spacing3) 0;
	margin-bottom: var(--spacing3);

	--inner-width: 750px;

	> ${PageContainer} {
		text-align-center;
		display: flex;
		flex-direction: column;
		align-items: center;
		${ellipsis}

		.excerpt {
			color: var(--gray100);
			max-width: var(--inner-width);
			overflow: hidden;
			margin-bottom: var(--spacing3)
		}

		.title {
			font-family: var(--font-family--serif);
			font-size: var(--font-size--xl);
			margin: var(--spacing1) 0 ;
			max-width: var(--inner-width);
		}

		.category {
			padding-left: var(--spacing2);
			text-transform: uppercase;
			border-left: 3px solid ${(p) =>
				p.category ? getCategoryColor(p.category) : "var(--gray50)"};
		}

		.date {
			font-size: var(--font-size--xs);
			color: var(--gray75);
		}
	}
`

const TagsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	> :not(:last-child) {
		margin-right: var(--spacing2);
	}
	> * {
		margin-bottom: var(--spacing2);
	}
	margin-bottom: calc(-1 * var(--spacing2));
	margin-top: var(--spacing2);
`

const TagContainer = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	padding: var(--spacing1) var(--spacing2);
	text-align: center;
	text-transform: uppercase;
	font-size: var(--fs-xs);
	white-space: nowrap;
	overflow: hidden;
`

const Tag = ({ tag }) => {
	return (
		<TagContainer>
			<Link to={route("BLOG_TAG", { tag })}>{tag}</Link>
		</TagContainer>
	)
}

const usePost = (id) => {
	const [post, setPost] = useState(null)
	const firebase = useFirebase()

	const getPost = async () => {
		try {
			// Get data from db
			const snap = await firebase.post(id).get()
			const post = snap.data()

			// Un-escape new-line characters
			post.mainContent = post.mainContent.replace(/\\n/g, "\n")

			setPost(post)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getPost()
	}, [])

	return post
}

export const PureBlogPost = withBreakpoints(
	({
		currentBreakpoint,
		category,
		title,
		excerpt,
		createdAt,
		imageUrls,
		mainImageIndex,
		author,
		tags,
		mainContent
	}) => {
		const imageUrl = imageUrls[mainImageIndex]
		const isMobile = currentBreakpoint <= 1

		return (
			<>
				<HeaderBox category={category}>
					<PageContainer>
						{/* Page Nav */}
						{/* <PageNav /> */}

						{/* Category */}
						<div className="category">{category}</div>

						{/* Title */}
						<div className="title">{title}</div>

						{/* Excerpt */}
						<div className="excerpt">{excerpt}</div>

						{/* Crated Date */}
						<div className="date">{moment(createdAt).format("LL")}</div>
					</PageContainer>
				</HeaderBox>

				<PageContainer>
					<Layout>
						<Main>
							{/* Header image */}
							<FluidImage url={imageUrl} />

							<InnerContainer>
								{!isMobile && (
									<InfoAside>
										{/* Share buttons */}
										<ShareButtons>
											<div title="Udostępnij na Twitterze">
												<FontAwesomeIcon icon={["fab", "twitter"]} />
											</div>
											<div title="Udostępnij na Facebooku">
												<FontAwesomeIcon icon={["fab", "facebook-square"]} />
											</div>
											<div title="Udostępnij na Instagramie">
												<FontAwesomeIcon icon={["fab", "instagram"]} />
											</div>
										</ShareButtons>
										{/* Info */}
										<Info>
											<div>
												Dodano <b>{moment(createdAt).format("DD-MM-YY")}</b>
											</div>
											<div>
												przez <b>{author}</b>
											</div>
											<div>
												w <b>{category}</b>
											</div>
										</Info>
										{/* Tags */}
										<TagsContainer>
											{tags.map((tag) => (
												<Tag tag={tag} />
											))}
										</TagsContainer>
									</InfoAside>
								)}
								<Article>
									<ReactMarkdown source={mainContent} />
								</Article>
							</InnerContainer>
						</Main>
						{!isMobile && (
							<Aside>
								<TextBlock size="l" bold>
									Podobne Artykuły
								</TextBlock>
							</Aside>
						)}
					</Layout>
				</PageContainer>
			</>
		)
	}
)

const BlogPost = withRouter(({ match }) => {
	const post = usePost(match.params.id)

	return post ? <PureBlogPost {...post} /> : <LoadingSpinner />
})

export default BlogPost
