import React from "react"
import { connectStateResults } from "react-instantsearch-dom"

import { CONST } from "../../constants"

import { TextBlock } from "../../components/StyledComponents"
import { SmallDropCard, SmallItemCard } from "../../components/Cards"
import { PageContainer } from "../../components/Containers"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import IndexResults from "../../components/Algolia/IndexResults"

import InfinitePosts from "../Blog/InfinitePostsList"
import { Layout } from "../Blog/HomePage/Common"

const SearchState = connectStateResults(({ searchState, children }) => {
	const isQueryEmpty = !searchState || (searchState && !searchState.query)
	return isQueryEmpty ? null : children
})

const SearchPage = ({ currentBreakpoint, match }) => {
	return (
		<StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
			<PageContainer>
				<TextBlock size="xl" bold>
					Szukaj
				</TextBlock>
				<AlgoliaSearchBox
					placeholder="Szukaj"
					placeholderLong="Szukaj na tablicy, blogu i w dropach"
				/>

				<Layout>
					<div>
						<SearchState>
							<IndexResults
								indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
								title="Tablica"
								component={SmallItemCard}
								limit={10}
							/>

							<IndexResults
								indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
								title="Dropy"
								component={SmallDropCard}
								limi={4}
							/>

							<IndexResults
								indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
								title="Artykuły"
								render={<InfinitePosts />}
							/>
						</SearchState>
					</div>
				</Layout>
			</PageContainer>
		</StatelessSearchWrapper>
	)
}

export default SearchPage
