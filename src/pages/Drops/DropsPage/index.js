import React from "react"
import { Switch, Route } from "react-router-dom"
import styled from "styled-components/macro"

import { Results } from "../../../components/Algolia/Helpers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { BigDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"

import { route } from "../../../utils"

import sections from "./sections"
import SectionSelect from "./SectionSelect"
import PromotedSection from "./PromotedSection"

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

const NewestDrops = ({ section }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			<PromotedSection />
			<PageContainer>
				<LayoutManager>
					<Main>
						<Header>Dropy</Header>
						<SectionSelect sections={sections.list()} currentSection={{}} />
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
		</StatelessSearchWrapper>
	)
}

const UpcomingDrops = ({ section }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			<PromotedSection />
			<PageContainer>
				<LayoutManager>
					<Main>
						<Header>Dropy</Header>
						<SectionSelect sections={sections.list()} currentSection={{}} />
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
		</StatelessSearchWrapper>
	)
}

const ArchiveDrops = ({ section }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			<PromotedSection />
			<PageContainer>
				<LayoutManager>
					<Main>
						<Header>Dropy</Header>
						<SectionSelect sections={sections.list()} currentSection={{}} />
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
		</StatelessSearchWrapper>
	)
}

const DropsPage = () => {
	console.log(sections.list())

	return (
		<>
			<Switch>
				<Route path={route("DROPS_SECTION", { id: "newest" })}>
					<NewestDrops sections={sections.list()} section={sections.get("newest")} />
				</Route>
				<Route path={route("DROPS_SECTION", { id: "upcoming" })}>
					<UpcomingDrops sections={sections.list()} section={sections.get("upcoming")} />
				</Route>
				<Route path={route("DROPS_SECTION", { id: "archive" })}>
					<ArchiveDrops sections={sections.list()} section={sections.get("archive")} />
				</Route>
			</Switch>
		</>
	)
}

export default DropsPage
