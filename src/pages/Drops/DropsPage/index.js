import React from "react"
import styled, { css } from "styled-components/macro"
import { connectStateResults } from "react-instantsearch-dom"

import { BigDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"

import sections from "./sections"
import SectionSelect from "./SectionSelect"
import PromotedSection from "./PromotedSection"
import Filters from "./Filters"
import withDropsSearchWrapper from "./SearchWrapperSelector"

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

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Header = styled.h1`
	text-align: center;
	margin: 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		text-align: left;
	}
`

const ResultsCountContainer = styled.div`
	color: var(--gray25);
`

const ResultsCount = connectStateResults(({ searchResults }) => {
	const nbHits = searchResults && searchResults.nbHits

	return <ResultsCountContainer>{nbHits} wyników</ResultsCountContainer>
})

const InfoBox = ({ header, children }) => (
	<div
		css={css`
			background: var(--black25);
			color: var(--gray100);
			padding: var(--spacing3);
			margin-bottom: var(--spacing3);
		`}
	>
		<div
			css={css`
				text-transform: upperCase;
				color: white;
				font-weight: bold;
				margin-bottom: 4px;
			`}
		>
			{header}
		</div>
		<div>{children}</div>
	</div>
)

const DropsPage = withDropsSearchWrapper(({ currentSection }) => {
	const isArchive = currentSection.id === "archive"
	const [isAuthenticated] = useAuthentication(true)

	return (
		<>
			<PromotedSection />
			<PageContainer>
				<LayoutManager>
					<Main>
						<HeaderContainer>
							<Header>Dropy</Header>
							<ResultsCount />
						</HeaderContainer>

						<SectionSelect sections={sections.list()} currentSection={currentSection} />

						{isArchive && (
							// TODO: better / more accurate copy (with regards to final functionality)
							<InfoBox header="Dropy Archiwalne">
								Tutaj znajdują się dropy które miały już miejsce. Możesz tu też sprawdzić
								czy dostaniesz je u nas tablicy. Możesz również filtrować wyniki by szybko
								znaleźć interesujące cię przedmioty.
							</InfoBox>
						)}

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
					<Sidebar availableElements={sidebarElements} isRandom>
						{isArchive && <Filters toggle={() => null} clear={() => null} />}
						{!isAuthenticated && (
							<InfoBox header="Otrzymuj powiadomienia">
								Utwórz konto by dostawać powiadomienia o nowych dropach
							</InfoBox>
						)}
					</Sidebar>
				</LayoutManager>
			</PageContainer>
		</>
	)
})

export default DropsPage
