import React from "react"
import styled from "styled-components/macro"

import { BigDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"

import sections from "./sections"
import SectionSelect from "./SectionSelect"
import PromotedSection from "./PromotedSection"
import withDropsSearchWrapper from "./SearchWrapperSelector"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

const ResultsContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}
`

const Header = styled.h1`
	text-align: center;
	margin: 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		text-align: left;
	}
`

const DropsPage = withDropsSearchWrapper(({ currentSection }) => {
	return (
		<>
			<PromotedSection />
			<PageContainer>
				<LayoutManager>
					<Main>
						<Header>Dropy</Header>
						<SectionSelect sections={sections.list()} currentSection={currentSection} />
						<InfiniteScrollingResults>
							{({ results, hasMore, loadMore }) => (
								<ResultsContainer>
									{results.map((drop) => (
										<BigDropCard {...drop} key={drop.id} />
									))}
								</ResultsContainer>
							)}
						</InfiniteScrollingResults>
					</Main>
					<Sidebar availableElements={sidebarElements} isRandom />
				</LayoutManager>
			</PageContainer>
		</>
	)
})

export default DropsPage
