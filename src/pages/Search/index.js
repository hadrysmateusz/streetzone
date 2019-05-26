import React from "react"
import { connectStateResults } from "react-instantsearch-dom"
import styled from "styled-components/macro"

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

const ItemsGrid = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`

const OuterContainer = styled.div`
	position: relative;
`

const TopContainer = styled.div`
	position: fixed;
	top: var(--page-header-height);
	box-shadow: 0 10px 10px -6px rgba(0, 0, 0, 0.08);
	width: 100%;
	z-index: 80;
	border-bottom: 1px solid var(--gray75);
	padding: var(--spacing3) 0;
	margin-bottom: var(--spacing3);
	background: white;
`

const ContentContainer = styled.div`
	margin-top: 150px;
`

const SearchPage = ({ currentBreakpoint, match }) => {
	return (
		<OuterContainer>
			<StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
				<TopContainer>
					<PageContainer>
						<TextBlock size="xl" bold>
							Szukaj
						</TextBlock>
						<AlgoliaSearchBox
							placeholder="Szukaj"
							placeholderLong="Szukaj na tablicy, blogu i w dropach"
						/>
					</PageContainer>
				</TopContainer>
				<PageContainer>
					<Layout>
						<ContentContainer>
							<SearchState>
								<IndexResults
									indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
									title="Tablica"
									limit={10}
								>
									{(results) => (
										<ItemsGrid>
											{results.map((item) => (
												<SmallItemCard {...item} key={item.id} />
											))}
										</ItemsGrid>
									)}
								</IndexResults>

								<IndexResults
									indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
									title="Dropy"
									component={SmallDropCard}
									limi={4}
								/>

								<IndexResults indexName={CONST.BLOG_POST_ALGOLIA_INDEX} title="Artykuły">
									<InfinitePosts />
								</IndexResults>
							</SearchState>
						</ContentContainer>
					</Layout>
				</PageContainer>
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default SearchPage
