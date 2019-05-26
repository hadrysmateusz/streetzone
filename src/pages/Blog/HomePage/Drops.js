import React, { useState, useEffect, useRef } from "react"
import { withBreakpoints } from "react-breakpoints"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import styled from "styled-components/macro"

import { PageContainer } from "../../../components/Containers"
import {
	SearchWrapper,
	StatelessSearchWrapper
} from "../../../components/InstantSearchWrapper"

import { PromotedContainer } from "../StyledComponents"
import { PromotedPost } from "../Previews"

import { CONST } from "../../../constants"
import { route } from "../../../utils"

import { SmallDropCard, PostCard } from "../../../components/Cards"
import { ThematicGroup } from "../../../components/ThematicGroup"

// import Sidebar from "./Sidebar"
import CategoryNav from "./CategoryNav"
import InfinitePosts from "../InfinitePostsList"

import { TextBlock } from "../../../components/StyledComponents"
import { FiltersToggleButton } from "../../../components/Topbar/FiltersToggle"

import PromotedDrop from "../Previews/PromotedDrop"
import Filters from "./Filters"
import { Layout } from "./Common"

const Sidebar = withBreakpoints(({ currentBreakpoint }) => {
	const [areFiltersOpen, setAreFiltersOpen] = useState(currentBreakpoint > 1)
	const [searchState, setSearchState] = useState(null)

	const isMobile = currentBreakpoint === 0

	const toggleFilters = () => {
		// const wasOpen = areFiltersOpen
		// if (wasOpen) {
		// 	enableBodyScroll(this.targetElement)
		// } else {
		// 	disableBodyScroll(this.targetElement)
		// }

		setAreFiltersOpen((state) => !state)
	}

	// if (!isMobile) {
	// 	enableBodyScroll(this.targetElement)
	// }

	return (
		<>
			{isMobile && <FiltersToggleButton onClick={toggleFilters} />}
			<Filters toggle={toggleFilters} />
		</>
	)
})

const OuterContainer = styled.div`
	padding: var(--spacing3) 0;
`

const PromotedSection = ({ indexName, limit, component: C = PromotedPost }) => {
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
				allowedKeys={["tags"]}
				hitsPerPage={3}
			>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<TextBlock size="xl" bold>
								Dropy
							</TextBlock>
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
