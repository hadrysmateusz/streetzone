import React from "react"
import { Index } from "react-instantsearch-dom"

import { CONST } from "../../constants"

import { TextBlock } from "../../components/StyledComponents"
import { SmallDropCard, SmallItemCard } from "../../components/Cards"
import { PageContainer } from "../../components/Containers"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import { Results } from "../../components/Algolia/Helpers"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import { DumbThematicGroup } from "../../components/ThematicGroup"

import InfinitePosts from "../Blog/InfinitePostsList"

const SearchPage = ({ currentBreakpoint, match }) => {
	return (
		<StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX} hitsPerPage={6}>
			<PageContainer>
				<TextBlock size="xl" bold>
					Szukaj
				</TextBlock>
				<AlgoliaSearchBox />

				<Index indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}>
					<TextBlock size="xl" bold>
						Tablica
					</TextBlock>
					<Results>
						{(results) => (
							<DumbThematicGroup
								results={results}
								hasMore={false}
								component={SmallItemCard}
							/>
						)}
					</Results>
				</Index>

				<Index indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}>
					<TextBlock size="xl" bold>
						Dropy
					</TextBlock>
					<Results>
						{(results) => (
							<DumbThematicGroup
								results={results}
								hasMore={false}
								component={SmallDropCard}
							/>
						)}
					</Results>
				</Index>

				<Index indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
					<TextBlock size="xl" bold>
						Artykuły
					</TextBlock>

					<InfinitePosts />
				</Index>
			</PageContainer>
		</StatelessSearchWrapper>
	)
}

export default SearchPage
