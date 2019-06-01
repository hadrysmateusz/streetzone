import React, { useState, useEffect } from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import { connectSortBy, connectRange } from "react-instantsearch-dom"
import { compose } from "recompose"

import {
	SearchWrapper,
	StatelessSearchWrapper
} from "../../../components/InstantSearchWrapper"
import { PageContainer } from "../../../components/Containers"
import { BigDropCard } from "../../../components/Cards"
import { TextBlock } from "../../../components/StyledComponents"
import { FiltersToggleButton } from "../../../components/Topbar/FiltersToggle"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"
import { VirtualRefinement, InfiniteResults } from "../../../components/Algolia/Helpers"
import { VirtualSortBy } from "../../../components/Algolia/Virtual"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { withProps } from "../../../HOCs"
import { nLinesHigh } from "../../../style-utils"

import PromotedDrop from "../Previews/PromotedDrop"
import { PromotedContainer } from "../StyledComponents"
// import Sidebar from "./Sidebar"
import Filters from "./Filters"
import { Layout } from "./Common"

const Sidebar = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint === 0

	return (
		<>
			{/* {isMobile && <FiltersToggleButton onClick={toggleFilters} />}
			<Filters toggle={toggleFilters} /> */}
		</>
	)
})

const OuterContainer = styled.div`
	padding: var(--spacing3) 0;
`

const ResultsContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}
`

const SectionCardContainer = styled.div`
	padding: var(--spacing3);
	cursor: pointer;
	background: white;
	:hover {
		background: var(--almost-white);
	}
	border: 1px solid ${(p) => (p.selected ? "black" : "var(--gray75)")};

	.title {
		color: var(--black0);
		text-transform: uppercase;
		font-weight: bold;
		margin-bottom: var(--spacing2);
	}

	.description {
		color: var(--black50);
		${nLinesHigh(3)};
	}
`

const DesktopSectionSelectContainer = styled.div`
	margin: var(--spacing3) 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--spacing3);
`

const SORTING_OPTIONS = [
	{
		value: CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX,
		label: "Czas dodania"
	},
	{
		value: CONST.BLOG_DROP_ALGOLIA_INDEX,
		label: "Czas dropu"
	}
]

const SECTIONS = Object.freeze([
	{
		id: "newest",
		title: "Nowe",
		description: "Świeżo dodane dropy. Bądź na bieżąco.",
		sortBy: CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX
	},
	{
		id: "upcoming",
		title: "Nadchodzące",
		description: "3... 2... 1... Drop xd",
		sortBy: CONST.BLOG_DROP_ALGOLIA_INDEX
	},
	{
		id: "archive",
		title: "Archiwum",
		description: `Przeglądaj dropy które miały już miejsce i sprawdź czy dostaniesz je u nas na tablicy.`,
		sortBy: CONST.BLOG_DROP_ALGOLIA_INDEX
	}
])

const PromotedSection = ({ component: C }) => {
	return (
		<OuterContainer>
			<PromotedContainer>
				<InfiniteResults>
					{({ results }) => {
						const selected = results.slice(0, 2)
						return selected.map((hit) => <C {...hit} />)
					}}
				</InfiniteResults>
			</PromotedContainer>
		</OuterContainer>
	)
}

const SectionCard = ({ id, title, description, onClick, selected }) => {
	return (
		<SectionCardContainer selected={selected} onClick={() => onClick(id)}>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
		</SectionCardContainer>
	)
}

const DesktopSectionSelect = ({ sections, currentSection, handleChange }) => {
	return (
		<DesktopSectionSelectContainer>
			{sections.map((section) => (
				<SectionCard
					key={section.title}
					onClick={() => handleChange(section)}
					selected={currentSection.id === section.id}
					{...section}
				/>
			))}
		</DesktopSectionSelectContainer>
	)
}

const MobileSectionSelect = () => {
	return <div />
}

const constructRangeRefinement = (newMin, newMax, defMin, defMax) => {
	return {
		min: Math.max(newMin, defMin) || defMin,
		max: Math.min(newMax, defMax) || defMax
	}
}

const SectionSelect = compose(
	withProps({ attribute: "dropsAtApproxTimestamp" }),
	connectRange,
	withBreakpoints
)(
	({
		sections,
		onClick,
		currentSection,
		forceRefineWithState,
		min,
		max,
		currentBreakpoint
	}) => {
		const handleChange = (section) => {
			onClick(section.id)

			const now = Date.now()
			let value

			switch (section.id) {
				case "newest":
					value = constructRangeRefinement(null, null, min, max)
					break
				case "upcoming":
					value = constructRangeRefinement(now, null, min, max)
					break
				case "archive":
					value = constructRangeRefinement(null, now, min, max)
					break
				default:
					value = constructRangeRefinement(null, null, min, max)
			}

			forceRefineWithState({
				page: 1, // reset current page
				sortBy: section.sortBy,
				range: { dropsAtApproxTimestamp: value }
			})
		}

		const isMobile = +currentBreakpoint <= 1
		const commonProps = { sections, handleChange, currentSection }

		return isMobile ? (
			<MobileSectionSelect {...commonProps} />
		) : (
			<DesktopSectionSelect {...commonProps} />
		)
	}
)

const DropsPage = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint <= 1
	const [section, setSection] = useState(SECTIONS[0])

	const onChangeSection = (id) => {
		setSection(SECTIONS.find((s) => s.id === id))
	}

	return (
		<>
			<SearchWrapper
				indexName={section.sortBy}
				allowedKeys={["category", "designers", "dropsAtApproxTimestamp"]}
				hitsPerPage={4}
			>
				{(forceRefineWithState) => (
					<>
						{/* intentionally hidden visually to prevent resizing bug */}
						<div hidden={isMobile}>
							<PageContainer>
								<PromotedSection component={PromotedDrop} />
							</PageContainer>
						</div>

						<PageContainer>
							<Layout>
								{/* Main Content */}
								<main>
									<TextBlock size="xl" bold>
										Dropy
									</TextBlock>
									<SectionSelect
										sections={SECTIONS}
										items={SORTING_OPTIONS}
										onClick={onChangeSection}
										currentSection={section}
										forceRefineWithState={forceRefineWithState}
									/>
									<InfiniteScrollingResults>
										{({ results, hasMore, loadMore }) => {
											return (
												<ResultsContainer>
													{results.map((drop) => (
														<BigDropCard {...drop} key={drop.id} />
													))}
												</ResultsContainer>
											)
										}}
									</InfiniteScrollingResults>
								</main>
								{/* Sidebar */}
								{!isMobile && <Sidebar />}
							</Layout>
						</PageContainer>
					</>
				)}
			</SearchWrapper>
		</>
	)
})

export default DropsPage
