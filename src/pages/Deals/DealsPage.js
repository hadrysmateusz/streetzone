import React from "react"
import styled from "styled-components/macro"

import BlackBox from "../../../components/BlackBox"
import { BigDealCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"

import { useAuthentication } from "../../../hooks"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

const ResultsContainer = styled.div`
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
		<PageContainer>
			<LayoutManager>
				<Main>
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
	)
}

export default DealsPage
