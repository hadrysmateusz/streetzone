import React, { useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"

import {
	SearchWrapper,
	StatelessSearchWrapper
} from "../../../components/InstantSearchWrapper"
import { PageContainer } from "../../../components/Containers"
import { SmallDropCard } from "../../../components/Cards"
import { TextBlock } from "../../../components/StyledComponents"
import { FiltersToggleButton } from "../../../components/Topbar/FiltersToggle"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
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

const SectionCardContainer = styled.div`
	padding: var(--spacing3);
	background: white;
	border: 1px solid var(--gray75);
`

const PromotedSection = ({ indexName, limit, component: C }) => {
	return (
		<OuterContainer>
			<StatelessSearchWrapper indexName={indexName} limit={limit}>
				{(results) => (
					<PromotedContainer>
						{results.map((post) => (
							<C {...post} />
						))}
					</PromotedContainer>
				)}
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

const SectionCard = ({ title, description }) => {
	return (
		<SectionCardContainer>
			<div className="title">{title}</div>
			<div className="desc">{description}</div>
		</SectionCardContainer>
	)
}

const MobileSectionSelect = () => {
	return <div />
}

const DesktopSectionSelect = () => {
	return (
		<div
			css={`
				display: grid;
				grid-auto-columns: repeat(3, 1fr);
				gap: var(--spacing3);
			`}
		/>
	)
}

const DropsPage = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint <= 1

	return (
		<>
			{!isMobile && (
				<PageContainer>
					<PromotedSection
						indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
						limit={2}
						component={PromotedDrop}
					/>
				</PageContainer>
			)}

			<SearchWrapper
				indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
				allowedKeys={["category", "designers"]}
				hitsPerPage={4}
			>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<TextBlock size="xl" bold>
								Dropy
							</TextBlock>
							{isMobile ? <MobileSectionSelect /> : <DesktopSectionSelect />}
						</main>
						{/* Sidebar */}
						{!isMobile && <Sidebar />}
					</Layout>
				</PageContainer>
			</SearchWrapper>
		</>
	)
})

export default DropsPage
