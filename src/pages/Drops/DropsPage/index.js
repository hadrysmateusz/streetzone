import React from "react"
import styled from "styled-components/macro"

import BlackBox from "../../../components/BlackBox"
import { BigDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"
import ResultsCount from "../../../components/ResultsCount"
import HelmetBasics from "../../../components/HelmetBasics"

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

const DropsMain = withDropsSearchWrapper(({ currentSection }) => {
	const isArchive = currentSection.id === "archive"
	const [isAuthenticated] = useAuthentication(true)

	console.log(currentSection)

	return (
		<PageContainer>
			<HelmetBasics title={currentSection.pageTitle} />
			<LayoutManager>
				<Main>
					<HeaderContainer>
						<Header>Dropy</Header>
						<ResultsCount />
					</HeaderContainer>

					<SectionSelect sections={sections.list()} currentSection={currentSection} />

					{isArchive && (
						// TODO: better / more accurate copy (with regards to final functionality)
						<BlackBox header="Dropy Archiwalne">
							Tutaj znajdują się dropy które miały już miejsce.{" "}
							{/* Możesz tu też sprawdzić
							czy dostaniesz je u nas tablicy. */}
						</BlackBox>
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
					{/* {isArchive && <Filters toggle={() => null} clear={() => null} />} */}
					{!isAuthenticated && (
						<BlackBox header="Otrzymuj powiadomienia">
							Utwórz konto by dostawać powiadomienia o nowych dropach
						</BlackBox>
					)}
				</Sidebar>
			</LayoutManager>
		</PageContainer>
	)
})

const DropsPage = () => (
	<>
		<PromotedSection />
		<DropsMain />
	</>
)

export default DropsPage
