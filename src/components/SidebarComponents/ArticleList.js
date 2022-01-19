import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import FirebaseImage from "../FirebaseImage"

import { route } from "../../utils"

const ArticleContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	width: 100%;
	margin-bottom: var(--spacing3);

	> a {
		overflow: hidden;
		display: grid;
		grid-template-columns: 4fr 10fr;
		grid-template-rows: 66px;
	}
`

const Title = styled.div`
	margin-left: var(--spacing2);
	height: 100%;
	display: flex;
	align-items: center;
`

const Article = React.memo(({ id, title, attachments, mainImageIndex }) => (
	<ArticleContainer>
		<Link to={route("BLOG_POST", { id })}>
			<FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
			<Title>{title}</Title>
		</Link>
	</ArticleContainer>
))

const ArticleList = React.memo(({ articles }) =>
	articles.map((article) => <Article key={article.id} {...article} />)
)

export default ArticleList
