import React, { useState, useEffect } from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import { PageContainer } from "../../../components/Containers"
import { TextBlock } from "../../../components/StyledComponents"
import Tags from "../../../components/Tags"
import LoadingSpinner from "../../../components/LoadingSpinner"
import Share from "../../../components/Share"

import { useFirebase } from "../../../hooks"
import { ellipsis, getCategoryColor } from "../../../style-utils"
// import { route } from "../../../utils"

import { FluidImage } from "../StyledComponents"
import { Layout } from "../HomePage/Common"
// import PageNav from "../PageNav"
import { withBreakpoints } from "react-breakpoints"

const Main = styled.main`
	display: grid;
	grid-template-rows: max-content 1fr;
	gap: var(--spacing3);
`

const InnerContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 150px 1fr;
	}
`

const Article = styled.article`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--font-size--m);
	}
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

const CommonContainer = styled.div`
	--header-box-height: 260px;
`

const OuterContainer = styled.div`
	position: relative;
	z-index: 4;
	padding-top: var(--header-box-height);
`

const SecondaryOuterContainer = styled.div`
	background: white;
	padding: var(--spacing3) 0;
`

const HeaderBox = styled.div`
	background: var(--black25);
	color: white;

	height: var(--header-box-height);

	position: fixed;
	width: 100%;
	z-index: 3;

	--inner-width: 750px;

	> ${PageContainer} {
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
		${ellipsis}

		.excerpt {
			color: var(--gray100);
			max-width: var(--inner-width);
			overflow: hidden;
			margin-bottom: var(--spacing3);
			white-space: normal;
		}

		.title {
			font-family: var(--ff-serif);
			font-size: var(--fs-l);
			font-weight: bold;
			@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
				font-size: var(--fs-xl);
			}
			margin: var(--spacing1) 0;
			max-width: var(--inner-width);
			white-space: normal;
		}

		.category {
			padding-left: var(--spacing2);
			text-transform: uppercase;
			border-left: 3px solid
				${(p) => (p.category ? getCategoryColor(p.category) : "var(--gray50)")};
		}

		.date {
			font-size: var(--font-size--xs);
			color: var(--gray75);
		}
	}
`

const MainImageContainer = styled.div`
	position: relative;
	> * {
		height: 0;
		padding-top: 56%;
	}
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: calc(-1 * var(--spacing3));
		margin-bottom: 0;
	}
`

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
			<CommonContainer>
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

				<OuterContainer>
					<SecondaryOuterContainer>
						<PageContainer>
							<Layout>
								<Main>
									{/* Header image */}
									<MainImageContainer>
										<FluidImage url={imageUrl} />
									</MainImageContainer>

									<InnerContainer>
										{!isMobile && (
											<InfoAside>
												{/* Share buttons */}
												<Share />
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
												<Tags tags={tags} />
											</InfoAside>
										)}
										<Article>
											{isMobile && <Share withHeader />}
											<ReactMarkdown source={mainContent} />
											{isMobile && [
												<TextBlock size="m" bold uppercase>
													Tagi
												</TextBlock>,
												<Tags tags={tags} />
											]}
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
					</SecondaryOuterContainer>
				</OuterContainer>
			</CommonContainer>
		)
	}
)

const BlogPost = withRouter(({ match }) => {
	const post = usePost(match.params.id)

	return post ? <PureBlogPost {...post} /> : <LoadingSpinner />
})

export default BlogPost
