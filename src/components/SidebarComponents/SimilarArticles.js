import React from "react"

import ArticleList from "./ArticleList"

import { StatelessSearchWrapper } from "../InstantSearchWrapper"

import { CONST } from "../../constants"

const SimilarArticles = () => {
	return (
		<StatelessSearchWrapper
			indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
			limit={3}
			refinements={{}}
		>
			{(results) => <ArticleList articles={results} />}
		</StatelessSearchWrapper>
	)
}

export default SimilarArticles
