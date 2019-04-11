import React, { useState, useEffect } from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import { PageContainer } from "../../../components/Containers"
import { TextBlock } from "../../../components/StyledComponents"
import PageNav from "../PageNav"
import useFirebase from "../../../hooks/useFirebase"
import { Image, ShareButtons } from "../StyledComponents"

const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 280px;
	gap: var(--spacing4);
`

const Main = styled.main`
	display: grid;
	grid-template-rows: 520px 1fr;
	gap: var(--spacing4);
`

const InnerContainer = styled.div`
	display: grid;
	grid-template-columns: 150px 1fr;
	gap: var(--spacing4);
`

const Article = styled.article`
	font-size: var(--font-size--m);
`

const Info = styled.div``

const InfoAside = styled.aside`
	display: grid;
	gap: var(--spacing2);
	align-content: start;
`

const TagsContainer = styled.div``

const Aside = styled.aside``

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

export const PureBlogPost = ({ post }) => {
	return (
		<PageContainer maxWidth={5}>
			{post && (
				<>
					{/* Page Nav */}
					<PageNav />

					{/* Title */}
					<TextBlock serif size="xxl">
						{post.title}
					</TextBlock>

					{/* Subtitle */}
					<TextBlock size="m" color="gray25">
						{post.mainContent.slice(0, post.mainContent.indexOf(".")).slice(0, 180)}
					</TextBlock>

					<OuterContainer>
						<Main>
							{/* Header image */}
							<Image url={post.mainImageURL} />

							<InnerContainer>
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
											Dodano <b>{moment(post.createdAt).format("D.M.YY")}</b>
										</div>
										<div>
											przez <b>{post.author}</b>
										</div>
										<div>
											w <b>{post.section}</b>
										</div>
									</Info>
									{/* Tags */}
									<TagsContainer>
										{post.tags.map((tag) => (
											<TextBlock uppercase color="gray25" size="xs">
												{tag}
											</TextBlock>
										))}
									</TagsContainer>
								</InfoAside>
								<Article>
									<ReactMarkdown source={post.mainContent} />
								</Article>
							</InnerContainer>
						</Main>
						<Aside>
							<TextBlock size="l" bold>
								Podobne Artykuły
							</TextBlock>
						</Aside>
					</OuterContainer>
				</>
			)}
		</PageContainer>
	)
}

const BlogPost = withRouter(({ match }) => {
	const post = usePost(match.params.id)

	return <PureBlogPost post={post} />
})

export default BlogPost
