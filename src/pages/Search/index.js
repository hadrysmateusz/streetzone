import React from "react"
import { connectStateResults } from "react-instantsearch-dom"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../constants"

import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"
import { SmallDropCard, SmallItemCard } from "../../components/Cards"
import { DumbThematicGroup } from "../../components/ThematicGroup"
import IndexResults from "../../components/Algolia/IndexResults"
import { TextBlock } from "../../components/StyledComponents"
import { PageContainer } from "../../components/Containers"
import { ItemsGrid } from "../../components/ItemsView"
import HelmetBasics from "../../components/HelmetBasics"

import InfinitePosts from "../Blog/InfinitePostsList"

const SearchState = connectStateResults(({ searchState, children }) => {
	const isQueryEmpty = !searchState || (searchState && !searchState.query)
	return isQueryEmpty ? null : children
})

const OuterContainer = styled.div`
	position: relative;
`

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
		grid-template-columns: 1fr minmax(220px, 25%);
		gap: var(--spacing3);
	}
`

const TopContainer = styled.div`
	position: fixed;
	top: var(--page-header-height);
	box-shadow: 0 10px 10px -6px rgba(0, 0, 0, 0.08);
	width: 100%;
	/* TODO: make this higher than pageheader after making submenus use portals */
	z-index: 79;
	border-bottom: 1px solid var(--gray75);
	padding: var(--spacing3) 0;
	margin-bottom: var(--spacing3);
	background: white;
`

const ContentContainer = styled.div`
	margin-top: 150px;
`

const Section = styled.div`
	:not(:last-child) {
		margin-bottom: var(--spacing4);
	}
`

const SearchPage = ({ currentBreakpoint, match }) => {
	const isMobile = +currentBreakpoint === 0

	return (
		<OuterContainer>
			<HelmetBasics title="Szukaj na stronie" />
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
								<Section>
									<IndexResults
										indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
										title="Tablica"
										limit={9}
									>
										{(results) =>
											isMobile ? (
												<DumbThematicGroup results={results} component={SmallItemCard} />
											) : (
												<ItemsGrid>
													{results.map((item) => (
														<SmallItemCard {...item} key={item.id} />
													))}
												</ItemsGrid>
											)
										}
									</IndexResults>
								</Section>

								<Section>
									<IndexResults
										indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
										title="Dropy"
										limit={6}
									>
										{(results) =>
											isMobile ? (
												<DumbThematicGroup results={results} component={SmallItemCard} />
											) : (
												<ItemsGrid>
													{results.map((drop) => (
														<SmallDropCard {...drop} key={drop.id} />
													))}
												</ItemsGrid>
											)
										}
									</IndexResults>
								</Section>

								<Section>
									<IndexResults
										indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
										title="Artykuły"
									>
										<InfinitePosts />
									</IndexResults>
								</Section>
							</SearchState>
						</ContentContainer>
					</Layout>
				</PageContainer>
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default withBreakpoints(SearchPage)
