import React from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import { connectRange } from "react-instantsearch-dom"
import { compose } from "recompose"
import { withRouter, Redirect } from "react-router-dom"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { PageContainer } from "../../../components/Containers"
import { BigDropCard } from "../../../components/Cards"
import InfiniteScrollingResults from "../../../components/InfiniteScrollingResults"
import { InfiniteResults, Results } from "../../../components/Algolia/Helpers"
import { VirtualRange } from "../../../components/Algolia/Virtual"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PopularArticles } from "../../../components/SidebarComponents"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { withProps } from "../../../HOCs"
import { nLinesHigh } from "../../../style-utils"

import PromotedDrop from "../PromotedDrop"
// import Filters from "./Filters"

const sidebarElements = [{ title: "Popularne na blogu", component: PopularArticles }]

// class Section {
// 	constructor(id, title, description, indexName, getRange) {
// 		this.id = id
// 		this.title = title
// 		this.description = description
// 		this.indexName = indexName
// 		this.getRange = getRange
// 	}

// 	get() {
// 		const range = getRange()

// 		return {
// 			id: this.id,
// 			title: this.title,
// 			description: this.description,
// 			indexName: this.indexName,
// 			range
// 		}
// 	}
// }

// class PromotingManager {
// 	constructor() {
// 		this.levels = new Map()
// 	}

// 	addLevel(object) {
// 		const level = object.level
// 		if (this.levels.has(level)) {
// 			throw Error("This promoting level already exists")
// 		}
// 		this.levels.set(level, object)
// 	}

// 	getLevel(level) {
// 		return this.levels.get(level)
// 	}

// 	async promoteItem(itemId, level) {
// 		const levelObject = this.getLevel(level)

// 		const oldItemSnap = await db
// 			.collection("items")
// 			.doc(itemId)
// 			.get()
// 		const oldItemData = oldItemSnap.data()

// 		const formattedData = levelObject.formatForDb(oldItemData)

// 		console.log("levelObject", levelObject)
// 		console.log("formattedData", formattedData)

// 		return db
// 			.collection("items")
// 			.doc(itemId)
// 			.update(formattedData)
// 	}
// }

// const promotingManager = new PromotingManager()

// promotingManager.addLevel(new PromotingLevel(0, 499, 7, 0))
// promotingManager.addLevel(new PromotingLevel(1, 999, 10, 4))
// promotingManager.addLevel(new PromotingLevel(2, 2500, 14, 10))

// const constructRangeRefinement = (newMin, newMax, defMin, defMax) => {
// 	return {
// 		min: Math.max(newMin, defMin) || defMin,
// 		max: Math.min(newMax, defMax) || defMax
// 	}
// }

// const getRangeRefinement = (sectionId, { min, max }) => {
// 	const now = Date.now()
// 	let value

// 	switch (sectionId) {
// 		case "newest":
// 			value = constructRangeRefinement(null, null, min, max)
// 			break
// 		case "upcoming":
// 			value = constructRangeRefinement(now, null, min, max)
// 			break
// 		case "archive":
// 			value = constructRangeRefinement(null, now, min, max)
// 			break
// 		default:
// 			value = constructRangeRefinement(null, null, min, max)
// 	}

// 	return { dropsAtApproxTimestamp: value }
// }

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
		sortBy: CONST.BLOG_DROP_ARCHIVE_ALGOLIA_INDEX
	}
])

// const Sidebar = withBreakpoints(({ currentBreakpoint }) => {
// 	const isMobile = currentBreakpoint === 0

// 	return (
// 		<>
// 			 {isMobile && <FiltersToggleButton onClick={toggleFilters} />}
// 			<Filters toggle={toggleFilters} />
// 		</>
// 	)
// })

const PromotedContainer = styled.div`
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing3);
		height: 40vw;
		max-height: 500px;
	}
`

const OuterContainer = styled.div`
	padding-bottom: var(--spacing3);
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
	border: 1px solid ${(p) => (p.selected ? "var(--black0)" : "var(--gray75)")};

	transition: border-color 350ms ease, background-color 200ms ease;

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

const Header = styled.h1`
	text-align: center;
	margin: 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		text-align: left;
	}
`

const DesktopSectionSelectContainer = styled.div`
	margin: var(--spacing3) 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--spacing3);
`

const MobileSectionSelectContainer = styled.div`
	margin: var(--spacing3) calc(-1 * var(--spacing3));
	display: flex;
	justify-content: space-evenly;
	border-top: 1px solid var(--gray75);
	border-bottom: 1px solid var(--gray75);
`

const MobileSectionItem = styled.div`
	text-transform: uppercase;
	font-weight: bold;
	font-size: var(--fs-xs);
	height: 100%;
	padding: var(--spacing3);
	color: ${(p) => (p.selected ? "var(--black0)" : "var(--gray0)")};
`

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
					key={section.id}
					onClick={() => handleChange(section)}
					selected={currentSection.id === section.id}
					{...section}
				/>
			))}
		</DesktopSectionSelectContainer>
	)
}

const MobileSectionSelect = ({ sections, currentSection, handleChange }) => {
	return (
		<MobileSectionSelectContainer>
			{sections.map((section) => (
				<MobileSectionItem
					key={section.id}
					onClick={() => handleChange(section)}
					selected={currentSection.id === section.id}
					{...section}
				>
					{section.title}
				</MobileSectionItem>
			))}
		</MobileSectionSelectContainer>
	)
}

const constructRangeRefinement = (newMin, newMax) => {
	return {
		min: Math.max(newMin, 0) || 0,
		max: Math.min(newMax, Number.MAX_SAFE_INTEGER) || Number.MAX_SAFE_INTEGER
	}
}

const getDropsAtFilter = (sectionId) => {
	const now = Date.now()
	let value

	switch (sectionId) {
		case "newest":
			value = undefined
			break
		case "upcoming":
			value = `dropsAtApproxTimestamp > ${now}`
			break
		case "archive":
			value = `dropsAtApproxTimestamp < ${now}`
			break
		default:
			value = undefined
	}

	return value
}

const SectionSelect = compose(
	withBreakpoints,
	withRouter
)(({ sections, currentSection, currentBreakpoint, history }) => {
	const handleChange = (section) => {
		// set the selected section as param in the url
		history.push(route("DROPS_SECTION", { id: section.id }))
	}

	const isMobile = +currentBreakpoint <= 1
	const commonProps = { sections, handleChange, currentSection }

	return isMobile ? (
		<MobileSectionSelect {...commonProps} />
	) : (
		<DesktopSectionSelect {...commonProps} />
	)
})

const DropsPage = compose(
	withRouter,
	withBreakpoints
)(({ match, currentBreakpoint }) => {
	// get current section id from url
	const sectionId = match.params.id

	// if no section id is found in url redirect to the default section
	if (!sectionId) return <Redirect to={route("DROPS_SECTION", { id: SECTIONS[0].id })} />

	// find the default section based on id from url
	const section = SECTIONS.find((a) => a.id === sectionId)
	const dropsAtFilter = getDropsAtFilter(sectionId)

	const isMobile = currentBreakpoint <= 1

	console.log(section.sortBy, dropsAtFilter)

	return !section ? null : (
		<>
			<StatelessSearchWrapper
				indexName={section.sortBy}
				limit={4}
				filters={dropsAtFilter}
			>
				{/* intentionally hidden visually to prevent resizing bug */}
				<div hidden={isMobile}>
					<PageContainer>
						<PromotedSection component={PromotedDrop} />
					</PageContainer>
				</div>

				{/* Set date range based on current section */}
				{/* <VirtualRange attribute="dropsAtApproxTimestamp" defaultRefinement={range} /> */}

				<PageContainer>
					<LayoutManager>
						<Main>
							<Header>Dropy</Header>
							<SectionSelect sections={SECTIONS} currentSection={section} />
							<Results>
								{(results) => {
									console.log(results)
									return (
										<ResultsContainer>
											{results.map((drop) => (
												<BigDropCard {...drop} key={drop.id} />
											))}
										</ResultsContainer>
									)
								}}
							</Results>
							{/* <InfiniteScrollingResults>
								{({ results, hasMore, loadMore }) => {
									console.log(results)
									return (
										<ResultsContainer>
											{results.map((drop) => (
												<BigDropCard {...drop} key={drop.id} />
											))}
										</ResultsContainer>
									)
								}}
							</InfiniteScrollingResults> */}
						</Main>
						<Sidebar availableElements={sidebarElements} isRandom />
					</LayoutManager>
				</PageContainer>
			</StatelessSearchWrapper>
		</>
	)
})

export default DropsPage
