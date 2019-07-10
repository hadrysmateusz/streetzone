import React from "react"
import styled from "styled-components/macro"

import BlackBox from "../../components/BlackBox"
import { BigDealCard } from "../../components/Cards"
import { PageContainer } from "../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../components/LayoutManager"
import { PopularArticles } from "../../components/SidebarComponents"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"

import { useAuthentication } from "../../hooks"
import { CONST } from "../../constants"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

const Heading = styled.h1`
	text-align: center;
	margin: 0 auto;
	font-size: var(--fs-xl);
`

const Info = styled.p`
	margin: var(--spacing3) auto var(--spacing4);
	color: var(--gray0);
	max-width: 240px;
	text-align: center;
`

const ResultsContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}
`

const DealsPage = () => {
	const [isAuthenticated] = useAuthentication(true)

	return (
		<StatelessSearchWrapper
			indexName={CONST.DEALS_ALGOLIA_INDEX}
			limit={3}
			ignoreArchivedStatus
		>
			<PageContainer>
				<Heading>Okazje</Heading>
				<Info>Tu znajdziesz najlepsze deale na ubrania i buty</Info>

				<LayoutManager>
					<Main>
						<AlgoliaSearchBox
							placeholder="Szukaj"
							placeholderLong="Szukaj po nazwie, marce, itd."
						/>

						<InfiniteScrollingResults>
							{({ results, hasMore, loadMore }) => (
								<ResultsContainer>
									{results.map((deal) => (
										<BigDealCard {...deal} key={deal.id} />
									))}
								</ResultsContainer>
							)}
						</InfiniteScrollingResults>
					</Main>
					<Sidebar availableElements={sidebarElements} isRandom>
						{!isAuthenticated && (
							<BlackBox header="Otrzymuj powiadomienia">
								Utwórz konto by dostawać powiadomienia o nowych promocjach
							</BlackBox>
						)}
					</Sidebar>
				</LayoutManager>
			</PageContainer>
		</StatelessSearchWrapper>
	)
}

export default DealsPage
